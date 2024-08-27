import Stop from "./stop";

/**
 * Class representing the details of a stop, including arrival and departure times.
 */
class StopDetail {
  arrivalStop: Stop;
  departureStop: Stop;
  arrivalTime: string;
  departureTime: string;

  /**
   * Creates an instance of StopDetail.
   * @param arrivalStop - The stop where the route arrives.
   * @param departureStop - The stop where the route departs.
   * @param arrivalTime - The arrival time at the stop.
   * @param departureTime - The departure time from the stop.
   */
  constructor(
    arrivalStop: Stop,
    departureStop: Stop,
    arrivalTime: string,
    departureTime: string
  ) {
    this.arrivalStop = arrivalStop;
    this.departureStop = departureStop;
    this.arrivalTime = arrivalTime;
    this.departureTime = departureTime;
  }
}

export default StopDetail;
