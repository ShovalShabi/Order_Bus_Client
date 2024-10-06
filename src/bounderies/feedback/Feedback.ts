/**
 * Class representing a feedback entry for a transit line.
 * This class encapsulates the feedback details including the line number, agency name, rating, and more.
 */
class Feedback {
  private lineNumber: string;
  private agency: string;
  private rating: number;
  private userEmail?: string; // Optional parameter
  private additionalDetails: string;

  /**
   * Creates an instance of Feedback.
   * @param lineNumber - The line number for which the feedback is provided.
   * @param agency - The name of the agency operating the line.
   * @param rating - The rating provided in the feedback (e.g., 1 to 5).
   * @param additionalDetails - A detailed text of the feedback.
   * @param userEmail - (Optional) The email address of the person providing the feedback.
   */
  constructor(
    lineNumber: string,
    agency: string,
    rating: number,
    additionalDetails: string,
    userEmail?: string
  ) {
    this.lineNumber = lineNumber;
    this.agency = agency;
    this.rating = rating;
    this.additionalDetails = additionalDetails;
    this.userEmail = userEmail;
  }

  /**
   * Gets the line number.
   * @returns The line number as a string.
   */
  getLineNumber(): string {
    return this.lineNumber;
  }

  /**
   * Sets the line number.
   * @param lineNumber - The new line number.
   */
  setLineNumber(lineNumber: string): void {
    this.lineNumber = lineNumber;
  }

  /**
   * Gets the agency name.
   * @returns The agency name as a string.
   */
  getAgency(): string {
    return this.agency;
  }

  /**
   * Sets the agency name.
   * @param agency - The new agency name.
   */
  setAgency(agency: string): void {
    this.agency = agency;
  }

  /**
   * Gets the rating.
   * @returns The rating as a number.
   */
  getRating(): number {
    return this.rating;
  }

  /**
   * Sets the rating.
   * @param rating - The new rating value.
   */
  setRating(rating: number): void {
    this.rating = rating;
  }

  /**
   * Gets the userEmail (if provided).
   * @returns The userEmail as a string, or undefined if not provided.
   */
  getUserEmail(): string | undefined {
    return this.userEmail;
  }

  /**
   * Sets the userEmail.
   * @param userEmail - The new userEmail address.
   */
  setUserEmail(userEmail: string): void {
    this.userEmail = userEmail;
  }

  /**
   * Gets the feedback additionalDetails.
   * @returns The feedback additionalDetails as a string.
   */
  getAdditionalDetails(): string {
    return this.additionalDetails;
  }

  /**
   * Sets the feedback additionalDetails.
   * @param additionalDetails - The new feedback additionalDetails.
   */
  setAdditionalDetails(additionalDetails: string): void {
    this.additionalDetails = additionalDetails;
  }
}

export default Feedback;
