import Feedback from "../bounderies/feedback/Feedback";

/**
 * Interface for the Feedback Service.
 */
export interface IFeedbackService {
  /**
   * Posts the feedback to the server.
   * @param feedback - The feedback object to be posted.
   * @returns A promise that resolves when the feedback is successfully posted.
   */
  postFeedback(feedback: Feedback): Promise<void>;
}
