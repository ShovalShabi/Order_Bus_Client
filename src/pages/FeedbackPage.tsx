/**
 * FeedbackPage component
 *
 * The `FeedbackPage` component allows users to provide feedback on their ride,
 * including entering details like the line number, agency name, rating, and additional comments.
 * It integrates with the Redux store to prefill certain fields based on the selected route and transit information.
 * The feedback submission is managed by calling the `FeedbackService` and provides real-time feedback to the user via alerts.
 *
 * @component
 * @returns {JSX.Element} The rendered JSX element for the FeedbackPage component.
 *
 * @example
 * <FeedbackPage />
 */

// React, Redux, Material-UI, and service imports
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FeedbackService from "../services/feedbackService";
import Feedback from "../dto/feedback/Feedback";
import useAlert from "../hooks/useAlert"; // Custom alert hook
import { State } from "../states/reducer";
import extractFirstStepAsTransit from "../utils/extractFirstStepAsTransit";
import AppRoutes from "../utils/AppRoutes";

/**
 * FeedbackPage component allows users to submit feedback about their ride,
 * including line number, agency name, rating, and additional details.
 * The component fetches route details from the Redux store to pre-fill line number and agency name.
 *
 * @returns {JSX.Element} The rendered JSX element for the FeedbackPage component.
 */
const FeedbackPage: React.FC = () => {
  // Local state to manage form input values
  const [lineNumber, setLineNumber] = useState<string>(""); // Line number field
  const [agencyName, setAgencyName] = useState<string>(""); // Agency name field
  const [rating, setRating] = useState<number | null>(null); // Rating value
  const [userEmail, setUserEmail] = useState<string>(""); // Optional user email
  const [additionalDetails, setAdditionalDetails] = useState<string>(""); // Additional feedback details

  const navigate = useNavigate(); // Navigation hook to redirect the user
  const theme = useTheme(); // Material-UI theme hook for styling
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)"); // Check screen size for responsive design

  // Use custom alert hook to display feedback notifications
  const { setAlert } = useAlert();

  // Create an instance of the feedback service to handle feedback submission
  const feedbackService = new FeedbackService();

  // Get the current route from the Redux store
  const route = useSelector((state: State) => state.route);

  // Set the document title when the component mounts
  useEffect(() => {
    document.title = "Fill Feedback";
  }, []);

  // UseEffect to pre-fill the line number and agency name based on the first transit step in the route
  useEffect(() => {
    if (route) {
      const transitStep = extractFirstStepAsTransit(route); // Get first transit step
      if (transitStep) {
        setLineNumber(transitStep.lineNumber || ""); // Set line number
        setAgencyName(transitStep.agencyName || ""); // Set agency name
      }
    }
  }, [route]);

  /**
   * Handles form submission to submit feedback. Validates the form and calls the feedback service.
   * Displays success or error messages using the alert system.
   */
  const handleSubmit = async () => {
    // Validate form inputs before submission
    if (!lineNumber) {
      setAlert({ severity: "error", message: "Line Number is required" });
      return;
    }

    if (!agencyName) {
      setAlert({ severity: "error", message: "Agency Name is required" });
      return;
    }

    if (!rating || rating < 1) {
      setAlert({
        severity: "error",
        message: "Please provide a rating of at least 1",
      });
      return;
    }

    // Create a new feedback object
    const feedback = new Feedback(
      lineNumber,
      agencyName,
      rating,
      additionalDetails,
      userEmail
    );

    try {
      // Submit feedback through the feedback service
      await feedbackService.postFeedback(feedback, agencyName);

      // Show success alert
      setAlert({
        severity: "success",
        message: "Feedback submitted successfully",
      });

      // Reset form fields after successful submission
      setLineNumber("");
      setAgencyName("");
      setRating(null);
      setUserEmail("");
      setAdditionalDetails("");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // Show error alert if feedback submission fails
      setAlert({
        severity: "error",
        message: `Error submitting feedback: ${error.message}`,
      });
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh" // Ensure the page takes up the full height of the viewport
      bgcolor="rgba(0, 0, 0, 0.1)" // Light background color
    >
      <Box
        width={isNonMobileScreens ? "50%" : "93%"} // Responsive width based on screen size
        p="2rem"
        borderRadius="1.5rem"
        bgcolor={theme.palette.background.paper} // Card-like background
        boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)" // Light shadow for visual depth
        textAlign="center"
      >
        <Typography
          fontWeight="bold"
          variant="h2"
          color={theme.palette.primary.main}
          mb="1rem"
        >
          Tell Us More About Your Ride!
        </Typography>

        <Typography
          fontWeight="500"
          variant="h5"
          mb="1.5rem"
          color={theme.palette.text.secondary}
        >
          We value your feedback. Please fill out the form below.
        </Typography>

        {/* Form fields for feedback submission */}
        <Box>
          <TextField
            label="Line Number"
            value={lineNumber}
            onChange={(e) => setLineNumber(e.target.value)}
            fullWidth
            margin="normal"
            inputProps={{ dir: "auto" }} // Automatically adjust text direction
            required
          />
          <TextField
            label="Agency Name"
            value={agencyName}
            onChange={(e) => setAgencyName(e.target.value)}
            fullWidth
            inputProps={{ dir: "auto" }} // Automatically adjust text direction
            margin="normal"
            required
          />

          {/* Rating field */}
          <Box display="flex" alignItems="center" my="1rem">
            <Typography sx={{ textAlign: "left", marginRight: "1rem" }}>
              Rate Your Ride:
            </Typography>
            <Rating
              name="rating"
              value={rating}
              onChange={(_event, newValue) => setRating(newValue)}
            />
          </Box>

          <TextField
            label="Your Email (Optional)"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Additional Details"
            value={additionalDetails}
            onChange={(e) => setAdditionalDetails(e.target.value)}
            fullWidth
            inputProps={{ dir: "auto" }} // Automatically adjust text direction
            margin="normal"
            multiline
            rows={4}
            required
          />

          {/* Submit Feedback button */}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{
              m: "2rem 0",
              p: "1rem",
              bgcolor: theme.palette.primary.main,
              color: theme.palette.background.paper,
              "&:hover": { color: theme.palette.primary.main },
            }}
          >
            Submit Feedback
          </Button>

          {/* Button to navigate back to plan a new route */}
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            onClick={() => navigate(AppRoutes.PLAN_RIDE_PAGE)}
            sx={{ p: "1rem" }}
          >
            Plan Another Route
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default FeedbackPage;
