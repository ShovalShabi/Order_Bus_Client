import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormControlLabel,
  Switch,
} from "@mui/material";
import WrapperForm from "../components/common/WrapperForm";
import * as Yup from "yup";
// import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FormikValues } from "formik";

const ExperimentFormPage = () => {
  const [experimentDirs, setExperimentDirs] = useState<string[]>([]);
  const [alterExperiment, setAlterExperiment] = useState(false);
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  //   const navigate = useNavigate();

  // Mock fetching the directories from /src/components/experiments
  useEffect(() => {
    // Replace this with actual API call or file system read logic
    const fetchExperiments = async () => {
      const dirs = ["PRM", "XRay", "SLG"]; // Replace with actual logic
      setExperimentDirs(dirs);
    };

    fetchExperiments();
  }, []);

  const initialValues = {
    alterExperiment: false,
    experimentName: "",
    newExperimentName: "",
  };

  const validationSchema = Yup.object().shape({
    alterExperiment: Yup.boolean().required(),
    experimentName: Yup.string().when(
      "alterExperiment",
      (alterExperiment, schema) =>
        alterExperiment
          ? schema.required("Select an experiment to alter")
          : schema
    ),
    newExperimentName: Yup.string().when(
      "alterExperiment",
      (alterExperiment, schema) =>
        !alterExperiment
          ? schema.required("Provide a name for the new experiment")
          : schema
    ),
  });

  const handleSubmit = async (values: FormikValues) => {
    // Handle form submission
    console.log(values);
    // You can navigate or handle other logic here
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Box
        width={isNonMobileScreens ? "80%" : "93%"}
        p="2rem"
        borderRadius="1.5rem"
        bgcolor="#f0f0f0"
        boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
        textAlign="center"
      >
        <Box>
          <Typography fontWeight="bold" fontSize="32px" color="primary">
            Experiment Editor
          </Typography>
          <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
            Create or Alter an Experiment
          </Typography>
          <WrapperForm
            initialValues={initialValues}
            validation={validationSchema}
            targetFunction={handleSubmit}
          >
            {(formikProps) => {
              const { values, errors, touched, handleBlur, handleChange } =
                formikProps;
              return (
                <>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={alterExperiment}
                        onChange={(e) => {
                          setAlterExperiment(e.target.checked);
                          formikProps.setFieldValue(
                            "alterExperiment",
                            e.target.checked
                          );
                        }}
                      />
                    }
                    label="Would you like to alter an experiment?"
                  />
                  {alterExperiment ? (
                    <FormControl fullWidth sx={{ mb: "1rem", width: "100%" }}>
                      <InputLabel id="experiment-select-label">
                        Select Experiment
                      </InputLabel>
                      <Select
                        labelId="experiment-select-label"
                        id="experiment-select"
                        value={values.experimentName}
                        label="Select Experiment"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="experimentName"
                        error={
                          touched.experimentName &&
                          Boolean(errors.experimentName)
                        }
                        sx={{ width: "100%" }}
                      >
                        {experimentDirs.map((dir, index) => (
                          <MenuItem key={index} value={dir}>
                            {dir}
                          </MenuItem>
                        ))}
                      </Select>
                      {touched.experimentName && errors.experimentName && (
                        <Typography color="error">
                          {typeof errors.experimentName === "string"
                            ? errors.experimentName
                            : ""}
                        </Typography>
                      )}
                    </FormControl>
                  ) : (
                    <TextField
                      fullWidth
                      label="New Experiment Name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.newExperimentName}
                      name="newExperimentName"
                      error={
                        touched.newExperimentName &&
                        Boolean(errors.newExperimentName)
                      }
                      helperText={
                        touched.newExperimentName && errors.newExperimentName
                          ? String(errors.newExperimentName)
                          : ""
                      }
                      sx={{ mb: "1rem", width: "100%" }}
                    />
                  )}
                  <Button
                    fullWidth
                    type="submit"
                    sx={{
                      m: "2rem 0",
                      p: "1rem",
                      bgcolor: theme.palette.primary.main,
                      color: theme.palette.background.paper,
                      "&:hover": { color: theme.palette.primary.main },
                    }}
                  >
                    Submit
                  </Button>
                </>
              );
            }}
          </WrapperForm>
        </Box>
      </Box>
    </Box>
  );
};

export default ExperimentFormPage;
