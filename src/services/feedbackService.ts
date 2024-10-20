import axios, { AxiosInstance } from "axios";
import Feedback from "../dto/feedback/Feedback";
import getEnvVariables from "../etc/loadVariables";
import { IFeedbackService } from "./IFeedback";

/**
 * Service class for interacting with the Feedback API.
 * Provides methods to post user feedback related to a specific bus company.
 *
 * @class
 * @implements {IFeedbackService}
 */
class FeedbackService implements IFeedbackService {
  private axiosInstance: AxiosInstance; // Axios instance for making HTTP requests
  private readonly baseUrl: string; // Base URL for the feedback API

  /**
   * Creates an instance of FeedbackService.
   * Initializes the service with an Axios instance and sets up the API base URL from environment variables.
   *
   * @param {AxiosInstance} [axiosInstance] - An optional Axios instance to be used for requests.
   */
  constructor(axiosInstance?: AxiosInstance) {
    // Load environment variables from the .env files
    const envVariables = getEnvVariables();
    const { feedbackURL } = envVariables;

    // Define base URL for the feedback API endpoint
    this.baseUrl = `${feedbackURL}`;

    // If an Axios instance is provided, use it; otherwise, create a new instance with defaults
    this.axiosInstance =
      axiosInstance ||
      axios.create({
        baseURL: this.baseUrl,
        withCredentials: true, // Ensures cookies or authentication tokens are sent with requests
        headers: {
          "Content-Type": "application/json", // Required header for sending JSON data
        },
      });
  }

  /**
   * Posts the feedback to the server for a specified company.
   * Sends the feedback data related to the bus service experience to the feedback API.
   *
   * @param {Feedback} feedback - The feedback object to be posted to the server.
   * @param {string} company - The company name that the feedback is related to.
   * @returns {Promise<void>} - A promise that resolves when the feedback is successfully posted.
   * @throws {Error} - Throws an error if the feedback post request fails.
   *
   * @example
   * const feedbackService = new FeedbackService();
   * feedbackService.postFeedback(feedbackObj, "busCompany")
   *   .then(() => console.log("Feedback posted successfully"))
   *   .catch((error) => console.error("Failed to post feedback:", error));
   */
  async postFeedback(feedback: Feedback, company: string): Promise<void> {
    try {
      // Make the POST request to the feedback endpoint for the specified company
      await this.axiosInstance.post(`${this.baseUrl}/${company}`, feedback);
    } catch (error) {
      // Throw an error if the POST request fails
      throw new Error(`Failed to post feedback: ${error}`);
    }
  }
}

export default FeedbackService;
