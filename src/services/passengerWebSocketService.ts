import { WebSocketOptions } from "../utils/WebSocketOptions";
import getEnvVariables from "../etc/loadVariables";
import { ILocation } from "../utils/Location";
import PassengerWSMessage from "../dto/websocket/PassengerWSMessage";
import { SerializableRoute } from "../states/reducer";

/**
 * WebSocket service for passenger communication with the backend server.
 * Handles establishing WebSocket connections, sending requests for ordering or canceling a bus,
 * maintaining keep-alive ping messages, and handling reconnection logic.
 */
const passengerWebSocketService = {
  websocket: null as WebSocket | null, // Holds the WebSocket instance
  webSocketOrderBusServiceURL: getEnvVariables().webSocketOrderBusServiceURL, // WebSocket server URL
  reconnectInterval: 5000, // Reconnection interval in milliseconds
  pingInterval: 10000, // Ping interval in milliseconds
  pingTimeoutId: null as NodeJS.Timeout | null, // Timeout ID for the ping messages
  reconnectTimeoutId: null as NodeJS.Timeout | null, // Timeout ID for reconnections
  shouldReconnect: true, // Flag to control reconnection behavior

  /**
   * Establishes a WebSocket connection to the server.
   * Ensures that multiple simultaneous connections are avoided.
   * Sets up event listeners for `onopen`, `onmessage`, `onclose`, and `onerror` WebSocket events.
   */
  connect() {
    if (
      this.websocket &&
      (this.websocket.readyState === WebSocket.OPEN ||
        this.websocket.readyState === WebSocket.CONNECTING)
    ) {
      console.log("slipped connection");
      return;
    }
    console.log(
      `Connecting to WebSocket -> ${this.webSocketOrderBusServiceURL}`
    );
    this.websocket = new WebSocket(this.webSocketOrderBusServiceURL);

    this.shouldReconnect = true; // Allow reconnection by default

    this.websocket.onopen = () => {
      console.log("WebSocket connected to server");
    };

    this.websocket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log(
        `session with id ${event.data.sessionId} got message from server:${message}`,
        message
      );

      if (message.option === WebSocketOptions.ACCEPTING_RIDE) {
        this.onBusAccepted(); // Trigger when bus is accepted
      } else if (message.option === WebSocketOptions.CANCELING_RIDE) {
        this.onRideCanceled(); // Trigger when ride is canceled
      }
    };

    this.websocket.onclose = (event) => {
      console.log(`WebSocket connection closed ${event.reason}`);
      if (!event.wasClean && this.shouldReconnect) {
        this.scheduleReconnect();
      }
    };

    this.websocket.onerror = (error) => {
      console.error("WebSocket error occurred:", error);

      if (this.websocket?.readyState === WebSocket.CLOSED) {
        console.error(
          "WebSocket connection was closed before it could be established."
        );
      } else if (this.websocket?.readyState === WebSocket.CLOSING) {
        console.error("WebSocket is in the process of closing.");
      } else if (this.websocket?.readyState === WebSocket.CONNECTING) {
        console.error("WebSocket is still connecting.");
      }
    };
  },

  /**
   * Disconnects the WebSocket connection.
   * Prevents reconnection after intentional disconnection.
   */
  disconnect() {
    if (this.websocket) {
      if (this.websocket.readyState === WebSocket.CONNECTING) return;

      this.shouldReconnect = false; // Prevent reconnection on intentional disconnect
      if (
        this.websocket?.readyState === WebSocket.CONNECTING ||
        this.websocket?.readyState === WebSocket.OPEN
      )
        this.websocket?.close(); // Close and reconnect
      this.websocket = null;
      this.stopPing();
      if (this.reconnectTimeoutId) {
        clearTimeout(this.reconnectTimeoutId);
      }
    }
  },

  /**
   * Sends a message through the WebSocket connection.
   * If the WebSocket is not open, it logs an error.
   *
   * @param {PassengerWSMessage} message - The message to send via WebSocket.
   */
  sendMessage(message: PassengerWSMessage) {
    if (!this.websocket || this.websocket.readyState !== WebSocket.OPEN) {
      console.error("WebSocket is not open. Cannot send message");
      return;
    }
    this.websocket.send(JSON.stringify(message));
    console.log("Message sent:", message);
  },

  /**
   * Sends an order bus request via WebSocket.
   *
   * @param {ILocation} startLocation - The starting location of the passenger.
   * @param {ILocation} endLocation - The destination location of the passenger.
   */
  orderBus(startLocation: ILocation, endLocation: ILocation) {
    const message: PassengerWSMessage = {
      startLocation,
      endLocation,
      option: WebSocketOptions.REQUEST_BUS,
      payload: "Passenger requesting bus",
    };
    this.sendMessage(message);
  },

  /**
   * Sends a cancel bus request via WebSocket.
   *
   * @param {ILocation} startLocation - The starting location of the passenger.
   * @param {ILocation} endLocation - The destination location of the passenger.
   */
  cancelBus(startLocation: ILocation, endLocation: ILocation) {
    const message: PassengerWSMessage = {
      startLocation,
      endLocation,
      option: WebSocketOptions.CANCELING_RIDE,
      payload: "Passenger canceling bus",
    };
    this.sendMessage(message);
  },

  /**
   * Schedules a reconnection attempt if the WebSocket connection is closed.
   */
  scheduleReconnect() {
    console.log(
      `Attempting to reconnect in ${this.reconnectInterval / 1000} seconds...`
    );
    this.reconnectTimeoutId = setTimeout(() => {
      this.connect();
    }, this.reconnectInterval);
  },

  /**
   * Starts sending ping messages at regular intervals to keep the connection alive.
   *
   * @param {SerializableRoute} routeData - The route data to send in ping messages.
   */
  startPing(routeData: SerializableRoute) {
    const message: PassengerWSMessage = {
      startLocation: routeData.legs[0].start_coord,
      endLocation: routeData.legs[0].end_coord,
      option: WebSocketOptions.KEEP_ALIVE,
      payload: "Keep me alive",
    };

    this.pingTimeoutId = setInterval(() => {
      if (this.websocket?.readyState === WebSocket.OPEN) {
        this.websocket.send(JSON.stringify(message));
        console.log("Ping sent to server");
      }
    }, this.pingInterval);
  },

  /**
   * Stops sending ping messages.
   */
  stopPing() {
    if (this.pingTimeoutId) {
      clearInterval(this.pingTimeoutId);
      this.pingTimeoutId = null;
    }
  },

  // Custom event handlers to be implemented by consuming components
  onBusAccepted() {},
  onRideCanceled() {},
};

export default passengerWebSocketService;
