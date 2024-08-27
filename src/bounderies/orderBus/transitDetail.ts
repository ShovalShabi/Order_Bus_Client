import StopDetail from "./stopDetail";

/**
 * Class representing details of a transit segment, including the line and agency information.
 */
class TransitDetail {
  arrivalTime: string;
  departureTime: string;
  agency: string;
  lineNumber: string;
  stopCounts: number;
  stopDetails: StopDetail;

  /**
   * Creates an instance of TransitDetail.
   * @param arrivalTime - The arrival time at the transit segment.
   * @param departureTime - The departure time from the transit segment.
   * @param agency - The transit agency responsible for this segment.
   * @param lineNumber - The line number of the transit segment.
   * @param stopCounts - The number of stops in this segment.
   * @param stopDetails - The details of the stops in this segment.
   */
  constructor(
    arrivalTime: string,
    departureTime: string,
    agency: string,
    lineNumber: string,
    stopCounts: number,
    stopDetails: StopDetail
  ) {
    this.arrivalTime = arrivalTime;
    this.departureTime = departureTime;
    this.agency = agency;
    this.lineNumber = lineNumber;
    this.stopCounts = stopCounts;
    this.stopDetails = stopDetails;
  }
}

export default TransitDetail;
