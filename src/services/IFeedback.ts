import Feedback from "../dto/feedback/Feedback";

/**
 * Interface representing the contract for the Feedback Service.
 * This interface defines the structure for interacting with the feedback system,
 * including the methods for posting user feedback to the server.
 */
export interface IFeedbackService {
  /**
   * Posts the feedback to the server.
   * Sends feedback data related to the user's bus experience to the feedback API.
   *
   * @param {Feedback} feedback - The feedback object that contains the user's feedback data.
   * @param {string} company - The name of the company that the feedback is related to.
   * @returns {Promise<void>} - A promise that resolves when the feedback is successfully posted.
   *
   * @throws {Error} - Throws an error if the feedback post request fails.
   *
   * @example
   * const feedbackService: IFeedbackService = new FeedbackService();
   * feedbackService.postFeedback(feedbackObj, "busCompany")
   *   .then(() => console.log("Feedback posted successfully"))
   *   .catch((error) => console.error("Failed to post feedback:", error));
   */
  postFeedback(feedback: Feedback, company: string): Promise<void>;
}
