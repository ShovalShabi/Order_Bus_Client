import React from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FormikValues } from "formik";
import WrapperForm from "../components/common/WrapperForm";
import { AnyObject, ObjectSchema } from "yup";
import UserTypes from "../utils/UserTypes";
import { useNavigate } from "react-router-dom";

interface SignupProps {
  typeOfUser: UserTypes;
  fields: string[];
  validation: ObjectSchema<AnyObject>;
  onSubmit: (values: FormikValues) => void | Promise<void>;
}
const initialValues: { [key: string]: string } = {}; // Provide type for initialValues

const SignupPage: React.FC<SignupProps> = ({
  fields,
  validation,
  onSubmit,
}: SignupProps) => {
  const { palette } = useTheme();

  fields.map((field) => {
    initialValues[field] = "";
  });
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const navigate = useNavigate(); // Access the navigation object

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh" // Set minimum height to cover the entire viewport
    >
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        borderRadius="1.5rem"
        bgcolor="#f0f0f0"
        boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)" // Add shadow for a card-like appearance
        textAlign="center" // Center-align the content horizontally
      >
        <Box>
          <Box gridColumn="span 4">
            <Typography fontWeight="bold" fontSize="32px" color="primary">
              Experiment Collector
            </Typography>
          </Box>
          <Box gridColumn="span 4" mb="1.5rem">
            <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
              Welcome to Experiment Collector, a Platform to Analyze Metadata!
            </Typography>
          </Box>
          <WrapperForm
            targetFunction={onSubmit}
            initialValues={initialValues}
            validation={validation}
          >
            {/* Map through the fields array and render TextField for each field */}
            {(formikProps) => {
              const {
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                resetForm,
              } = formikProps;
              return (
                <>
                  <Box
                    justifyContent="flex"
                    alignItems="stretch"
                    gridColumn="span 4"
                  >
                    {fields.map((field, index) => (
                      <TextField
                        key={index}
                        type={
                          field.toLowerCase().includes("password")
                            ? "password"
                            : "text"
                        } // Conditional type based on field name
                        label={field}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values[field]} //Binding the actual referance of the value
                        name={field}
                        error={
                          touched[field as keyof typeof errors] &&
                          Boolean(errors[field as keyof typeof errors])
                        }
                        helperText={
                          touched[field as keyof typeof errors] &&
                          errors[field as keyof typeof errors]
                            ? String(errors[field as keyof typeof errors]) // Convert error to string
                            : "" // Provide an empty string when there's no error
                        }
                        fullWidth
                        sx={{ mb: index === fields.length - 1 ? "0" : "1rem" }} // Apply margin bottom except for the last field
                      />
                    ))}
                  </Box>
                  <Box gridColumn="span 4">
                    <Button
                      fullWidth
                      type="submit"
                      sx={{
                        m: "2rem 0",
                        p: "1rem",
                        bgcolor: palette.primary.main,
                        color: palette.background.paper,
                        "&:hover": { color: palette.primary.main },
                      }}
                    >
                      {"SIGNUP"}
                    </Button>
                    {/* Conditionally render the signup link based on typeOfUser */}
                    {
                      <Typography
                        textAlign="left"
                        onClick={() => {
                          resetForm(); // Reset the form
                          navigate("/login/Researcher"); // Navigate to "/login"
                        }}
                        sx={{
                          textDecoration: "underline",
                          color: palette.primary.main,
                          "&:hover": {
                            cursor: "pointer",
                            color: palette.primary.light,
                          },
                        }}
                      >
                        {"Have an account? Sign in here."}
                      </Typography>
                    }
                  </Box>
                </>
              );
            }}
          </WrapperForm>
        </Box>
      </Box>
    </Box>
  );
};

export default SignupPage;
