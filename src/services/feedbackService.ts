import axios, { AxiosInstance } from "axios";
import Feedback from "../bounderies/feedback/Feedback";
import getEnvVariables from "../etc/loadVariables";
import { IFeedbackService } from "./IFeedback";

/**
 * Service class for interacting with the Feedback API.
 */
class FeedbackService implements IFeedbackService {
  private axiosInstance: AxiosInstance;
  private readonly baseUrl: string;

  /**
   * Creates an instance of FeedbackService.
   * @param axiosInstance - An optional Axios instance to be used for requests.
   */
  constructor(axiosInstance?: AxiosInstance) {
    // Load environment variables from .env files
    const envVariables = getEnvVariables();
    const { feedbackURL } = envVariables;

    // Define base URL for the feedback API endpoint
    this.baseUrl = `${feedbackURL}/feedback`;
    this.axiosInstance = axiosInstance || axios.create();
  }

  /**
   * Posts the feedback to the server.
   * @param feedback - The feedback object to be posted.
   * @returns A promise that resolves when the feedback is successfully posted.
   */
  async postFeedback(feedback: Feedback): Promise<void> {
    try {
      await this.axiosInstance.post(`${this.baseUrl}`, feedback);
    } catch (error) {
      throw new Error(`Failed to post feedback: ${error}`);
    }
  }
}

export default FeedbackService;
