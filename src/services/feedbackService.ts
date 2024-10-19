import axios, { AxiosInstance } from "axios";
import Feedback from "../dto/feedback/Feedback";
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
    this.baseUrl = `${feedbackURL}`;
    this.axiosInstance =
      axiosInstance ||
      axios.create({
        baseURL: this.baseUrl,
        withCredentials: true, // To send cookies or authentication tokens
        headers: {
          "Content-Type": "application/json", // Important for sending JSON
        },
      });
  }

  /**
   * Posts the feedback to the server.
   * @param feedback - The feedback object to be posted.
   * @param company - The comapny name that the feedback is related to.
   * @returns A promise that resolves when the feedback is successfully posted.
   */
  async postFeedback(feedback: Feedback, comapny: string): Promise<void> {
    try {
      await this.axiosInstance.post(`${this.baseUrl}/${comapny}`, feedback);
    } catch (error) {
      throw new Error(`Failed to post feedback: ${error}`);
    }
  }
}

export default FeedbackService;
