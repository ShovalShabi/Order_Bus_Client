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
   * @param {string} lineNumber - The line number for which the feedback is provided.
   * @param {string} agency - The name of the agency operating the line.
   * @param {number} rating - The rating provided in the feedback (e.g., 1 to 5).
   * @param {string} additionalDetails - A detailed text of the feedback.
   * @param {string} [userEmail] - (Optional) The email address of the person providing the feedback.
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
   * Gets the line number for which the feedback is provided.
   * @returns {string} - The line number.
   */
  getLineNumber(): string {
    return this.lineNumber;
  }

  /**
   * Sets the line number for which the feedback is provided.
   * @param {string} lineNumber - The new line number.
   */
  setLineNumber(lineNumber: string): void {
    this.lineNumber = lineNumber;
  }

  /**
   * Gets the name of the agency operating the line.
   * @returns {string} - The agency name.
   */
  getAgency(): string {
    return this.agency;
  }

  /**
   * Sets the name of the agency operating the line.
   * @param {string} agency - The new agency name.
   */
  setAgency(agency: string): void {
    this.agency = agency;
  }

  /**
   * Gets the rating provided in the feedback.
   * @returns {number} - The rating value.
   */
  getRating(): number {
    return this.rating;
  }

  /**
   * Sets the rating provided in the feedback.
   * @param {number} rating - The new rating value.
   */
  setRating(rating: number): void {
    this.rating = rating;
  }

  /**
   * Gets the email of the person providing the feedback, if available.
   * @returns {string | undefined} - The email address or undefined if not provided.
   */
  getUserEmail(): string | undefined {
    return this.userEmail;
  }

  /**
   * Sets the email of the person providing the feedback.
   * @param {string} userEmail - The email address.
   */
  setUserEmail(userEmail: string): void {
    this.userEmail = userEmail;
  }

  /**
   * Gets the additional feedback details provided by the user.
   * @returns {string} - The additional feedback details.
   */
  getAdditionalDetails(): string {
    return this.additionalDetails;
  }

  /**
   * Sets the additional feedback details provided by the user.
   * @param {string} additionalDetails - The new feedback details.
   */
  setAdditionalDetails(additionalDetails: string): void {
    this.additionalDetails = additionalDetails;
  }
}

export default Feedback;
