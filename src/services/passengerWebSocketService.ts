import { WebSocketOptions } from "../utils/WebSocketOptions";
import getEnvVariables from "../etc/loadVariables";
import { ILocation } from "../utils/Location";
import PassengerWSMessage from "../dto/websocket/PassengerWSMessage";
import { SerializableRoute } from "../states/reducer";

// WebSocket service object
const passengerWebSocketService = {
  websocket: null as WebSocket | null,
  webSocketOrderBusServiceURL: getEnvVariables().webSocketOrderBusServiceURL,
  reconnectInterval: 5000,
  pingInterval: 10000,
  pingTimeoutId: null as NodeJS.Timeout | null,
  reconnectTimeoutId: null as NodeJS.Timeout | null,
  shouldReconnect: true, // Flag to control reconnection behavior

  connect() {
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
      console.log("Message received from server:", message);

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
      console.error("WebSocket error:", error);
      this.websocket?.close(); // Close and reconnect
    };
  },

  disconnect() {
    if (this.websocket) {
      this.shouldReconnect = false; // Prevent reconnection on intentional disconnect
      this.websocket.close();
      this.websocket = null;
      this.stopPing();
      if (this.reconnectTimeoutId) {
        clearTimeout(this.reconnectTimeoutId);
      }
    }
  },

  sendMessage(message: PassengerWSMessage) {
    if (!this.websocket || this.websocket.readyState !== WebSocket.OPEN) {
      console.error("WebSocket is not open. Cannot send message");
      return;
    }
    this.websocket.send(JSON.stringify(message));
    console.log("Message sent:", message);
  },

  orderBus(startLocation: ILocation, endLocation: ILocation) {
    const message: PassengerWSMessage = {
      startLocation,
      endLocation,
      option: WebSocketOptions.REQUEST_BUS,
      payload: "Passenger requesting bus",
    };
    this.sendMessage(message);
  },

  cancelBus(startLocation: ILocation, endLocation: ILocation) {
    const message: PassengerWSMessage = {
      startLocation,
      endLocation,
      option: WebSocketOptions.CANCELING_RIDE,
      payload: "Passenger canceling bus",
    };
    this.sendMessage(message);
  },

  scheduleReconnect() {
    console.log(
      `Attempting to reconnect in ${this.reconnectInterval / 1000} seconds...`
    );
    this.reconnectTimeoutId = setTimeout(() => {
      this.connect();
    }, this.reconnectInterval);
  },

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

  stopPing() {
    if (this.pingTimeoutId) {
      clearInterval(this.pingTimeoutId);
      this.pingTimeoutId = null;
    }
  },

  // Custom event handlers
  onBusAccepted() {},
  onRideCanceled() {},
};

export default passengerWebSocketService;
