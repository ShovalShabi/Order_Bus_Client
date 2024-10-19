import { ILocation } from "../../utils/Location";
import { WebSocketOptions } from "../../utils/WebSocketOptions";

export default interface DriverWSMessage {
  startLocation: ILocation;
  endLocation: ILocation;
  option: WebSocketOptions;
  payload: string;
}
