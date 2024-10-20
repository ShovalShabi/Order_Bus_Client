/**
 * Enum representing the different types of WebSocket message options.
 * These options are used to define the type of messages sent and received
 * during WebSocket communication between the client and the server.
 */
export enum WebSocketOptions {
  /**
   * WebSocket option for canceling a ride.
   * This message type is sent when a passenger or driver cancels a ride.
   */
  CANCELING_RIDE = "CANCELING_RIDE",

  /**
   * WebSocket option for accepting a ride.
   * This message type is sent when a driver accepts a ride request.
   */
  ACCEPTING_RIDE = "ACCEPTING_RIDE",

  /**
   * WebSocket option for requesting a bus.
   * This message type is sent when a passenger requests a bus ride.
   */
  REQUEST_BUS = "REQUEST_BUS",

  /**
   * WebSocket option for keeping the connection alive.
   * This message type is periodically sent to maintain the WebSocket connection.
   */
  KEEP_ALIVE = "KEEP_ALIVE",
}
