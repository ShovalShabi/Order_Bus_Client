import React from "react";
import UserTypes from "../../utils/UserTypes";
import * as yup from "yup";
import { FormikValues } from "formik";
import createValidationSchema from "../../utils/FormValidation";
import SignupPage from "../../pages/SignupPage";
import axios from "axios";
import UserRoles from "../../utils/UserRoles";
import { useNavigate } from "react-router-dom";

const SignupPrep: React.FC = () => {
  const role = UserRoles.Researcher;
  const platform = "Builder";
  const navigate = useNavigate();
  let fields: string[] = [];
  let validation: yup.ObjectShape = {};
  let onSubmit: (values: FormikValues) => void | Promise<void> = () => {
    throw new Error("Function not implemented.");
  };

  const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_DEV_URL;

  fields = ["Email", "Username", "Password", "Confirm Password"]; // Example fields for Researcher

  onSubmit = async (values: FormikValues) => {
    const myObj: { [key: string]: unknown } = {}; //Defining the the of the object

    for (const value in values) {
      if (value.toLowerCase().includes("password")) {
        continue; // The backend API needs the pass word within userDetails property
      }
      myObj[value.toLowerCase()] = values[value];
    }

    //Additional properties of the Researcher
    myObj["role"] = role;
    myObj["platform"] = platform;
    myObj["userDetails"] = { password: values.Password };

    try {
      const savedUserResponse = await axios.post(
        `${backendUrl}/entry/register`,
        myObj
      );

      const savedUser = await savedUserResponse.data;

      if (savedUser) {
        console.log(
          `The user ${savedUser.email} has been registered successfully!`
        );
      }
      navigate("/login/Researcher");
    } catch (error) {
      console.error("Encountered error for Registering Researcher:", error);
    }
  };

  // Defining a validation schema based on the list of fields
  validation = createValidationSchema(fields);

  return (
    <>
      {/* This module will be the responsible for redirecting each user to its specific tailored login page that will be reused as well */}
      <SignupPage
        fields={fields}
        validation={yup.object().shape(validation)}
        onSubmit={onSubmit}
        typeOfUser={UserTypes.Prolific}
      />
    </>
  );
};

export default SignupPrep;
