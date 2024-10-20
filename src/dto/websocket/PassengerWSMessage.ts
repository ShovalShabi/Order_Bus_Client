import { ILocation } from "../../utils/Location";
import { WebSocketOptions } from "../../utils/WebSocketOptions";

/**
 * Interface representing a message sent by a driver via WebSocket.
 * This message contains information about the start and end locations,
 * as well as additional options and a payload.
 */
export default interface DriverWSMessage {
  /**
   * The starting location for the driver's WebSocket message.
   * Represented by the ILocation interface, which could include latitude, longitude, etc.
   */
  startLocation: ILocation;

  /**
   * The destination or end location for the driver's WebSocket message.
   * Represented by the ILocation interface.
   */
  endLocation: ILocation;

  /**
   * WebSocket connection options for the message.
   * This provides specific WebSocket options and configurations represented by the WebSocketOptions interface.
   */
  option: WebSocketOptions;

  /**
   * The actual payload of the WebSocket message.
   * This could represent any additional data needed for the message in string format.
   */
  payload: string;
}
