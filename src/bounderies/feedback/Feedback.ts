/**
 * Class representing a feedback entry for a transit line.
 * This class encapsulates the feedback details including the line number, agency name, rating, and more.
 */
class Feedback {
  private lineNumber: string;
  private agencyName: string;
  private rating: number;
  private email?: string; // Optional parameter
  private description: string;

  /**
   * Creates an instance of Feedback.
   * @param lineNumber - The line number for which the feedback is provided.
   * @param agencyName - The name of the agency operating the line.
   * @param rating - The rating provided in the feedback (e.g., 1 to 5).
   * @param description - A detailed description of the feedback.
   * @param email - (Optional) The email address of the person providing the feedback.
   */
  constructor(
    lineNumber: string,
    agencyName: string,
    rating: number,
    description: string,
    email?: string
  ) {
    this.lineNumber = lineNumber;
    this.agencyName = agencyName;
    this.rating = rating;
    this.description = description;
    this.email = email;
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
  getAgencyName(): string {
    return this.agencyName;
  }

  /**
   * Sets the agency name.
   * @param agencyName - The new agency name.
   */
  setAgencyName(agencyName: string): void {
    this.agencyName = agencyName;
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
   * Gets the email (if provided).
   * @returns The email as a string, or undefined if not provided.
   */
  getEmail(): string | undefined {
    return this.email;
  }

  /**
   * Sets the email.
   * @param email - The new email address.
   */
  setEmail(email: string): void {
    this.email = email;
  }

  /**
   * Gets the feedback description.
   * @returns The feedback description as a string.
   */
  getDescription(): string {
    return this.description;
  }

  /**
   * Sets the feedback description.
   * @param description - The new feedback description.
   */
  setDescription(description: string): void {
    this.description = description;
  }
}

export default Feedback;
