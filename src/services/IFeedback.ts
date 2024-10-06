import Feedback from "../bounderies/feedback/Feedback";

/**
 * Interface for the Feedback Service.
 */
export interface IFeedbackService {
  /**
   * Posts the feedback to the server.
   * @param feedback - The feedback object to be posted.
   * @param company - The comapny name that the feedback is related to.
   * @returns A promise that resolves when the feedback is successfully posted.
   */
  postFeedback(feedback: Feedback, company: string): Promise<void>;
}
