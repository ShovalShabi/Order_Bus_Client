import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import FeedbackService from "../services/feedbackService";
import Feedback from "../dto/feedback/Feedback";
import useAlert from "../hooks/useAlert"; // Import the custom alert hook

// FeedbackPage component
const FeedbackPage: React.FC = () => {
  // State to hold form values
  const [lineNumber, setLineNumber] = useState<string>("");
  const [agencyName, setAgencyName] = useState<string>("");
  const [rating, setRating] = useState<number | null>(null);
  const [userEmail, setUserEmail] = useState<string>("");
  const [additionalDetails, setAdditionalDetails] = useState<string>("");

  // Get theme and media query from Material-UI
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  // Use the custom alert hook
  const { setAlert } = useAlert();

  // Create an instance of FeedbackService
  const feedbackService = new FeedbackService();

  // Function to handle form submission
  const handleSubmit = async () => {
    // Perform validations
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

    // Construct Feedback DTO
    const feedback = new Feedback(
      lineNumber,
      agencyName,
      rating,
      additionalDetails,
      userEmail
    );

    try {
      await feedbackService.postFeedback(feedback, agencyName);

      // Trigger success alert
      setAlert({
        severity: "success",
        message: "Feedback submitted successfully",
      });

      // Reset form after submission
      setLineNumber("");
      setAgencyName("");
      setRating(null);
      setUserEmail("");
      setAdditionalDetails("");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // Trigger error alert
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
      minHeight="100vh" // Set minimum height to cover the entire viewport
      bgcolor="rgba(0, 0, 0, 0.1)" // Light background color for the full page
    >
      <Box
        width={isNonMobileScreens ? "50%" : "93%"} // Width adjustment based on screen size
        p="2rem"
        borderRadius="1.5rem"
        bgcolor={theme.palette.background.paper} // Card background color
        boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)" // Card shadow
        textAlign="center"
      >
        <Typography
          fontWeight="bold"
          fontSize="32px"
          color={theme.palette.primary.main}
          mb="1rem"
        >
          Feedback Form
        </Typography>

        <Typography
          fontWeight="500"
          variant="h5"
          mb="1.5rem"
          color={theme.palette.text.secondary}
        >
          We value your feedback. Please fill out the form below.
        </Typography>

        {/* Form Fields */}
        <Box>
          <TextField
            label="Line Number"
            value={lineNumber}
            onChange={(e) => setLineNumber(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Agency Name"
            value={agencyName}
            onChange={(e) => setAgencyName(e.target.value)}
            fullWidth
            margin="normal"
            required
          />

          {/* Align the rating field like the other input fields */}
          <Box display="flex">
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
            margin="normal"
            multiline
            rows={4}
            required
          />

          {/* Submit Button */}
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
        </Box>
      </Box>
    </Box>
  );
};

export default FeedbackPage;
