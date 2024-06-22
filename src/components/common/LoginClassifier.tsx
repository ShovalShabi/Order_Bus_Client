// import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoginPage from "../../pages/LoginPage";
import UserTypes from "../../utils/UserTypes";
import * as yup from "yup";
import { FormikValues } from "formik";
import createValidationSchema from "../../utils/FormValidation";
import {
  UserBoundary,
  UserBoundaryImpl,
} from "../../bounderies/user/UserBoundary";
import {
  UserIdBoundary,
  UserIdBoundaryImpl,
} from "../../bounderies/user/UserIdBoundary";
import UserRoles from "../../utils/UserRoles";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logedIn } from "../../states/reducer";
import Cookies from "universal-cookie";

const LoginClassifier: React.FC = () => {
  const { userType } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const myCookies = new Cookies();
  axios.defaults.withCredentials = true;

  let fields: string[] = [];
  let validation: yup.ObjectShape = {};
  let onSubmit: (values: FormikValues) => void | Promise<void> = () => {
    throw new Error("Function not implemented.");
  };
  let enumValUser: UserTypes = UserTypes.Researcher;

  // Match userType using switch statement
  switch (userType) {
    case UserTypes.Prolific:
      fields = ["Prolific ID"]; // fields for Prolific user
      onSubmit = () => {
        console.log("I've registerd a Prolific user");
      }; // Define onSubmit function for Prolific user
      enumValUser = UserTypes.Prolific;
      break;
    case UserTypes.Student:
      fields = ["University", "Faculty", "Email", "Password"]; // fields for Student user

      onSubmit = (values) => {
        console.log("onSubmit has been activated with these values: ", values);
        console.log("I've registerd a student");
      }; // Define onSubmit function for Student user
      enumValUser = UserTypes.Student;
      break;
    case UserTypes.Researcher:
      fields = ["Email", "Password"]; // Example fields for Student user
      onSubmit = async (values) => {
        const beforeUserId: UserIdBoundaryImpl = new UserIdBoundary(
          "Builder",
          values.Email
        );
        const beforeLoginUser: UserBoundaryImpl = new UserBoundary(
          beforeUserId,
          UserRoles.Researcher,
          {}
        );

        beforeLoginUser.userDetails.password = values.Password;

        try {
          const response = await axios.post(
            `${import.meta.env.VITE_REACT_APP_BACKEND_DEV_URL}/entry/login`,
            {
              email: beforeUserId.email,
              platform: beforeUserId.platform,
              ...beforeLoginUser,
            }
          );

          const token = myCookies.get("jwt");

          // Assuming your response data contains user and token fields
          const user: UserBoundary = response.data;

          // Ensure expiryStr is a string before assigning it - expiry str formatted as ISOString
          const expiry = user.userDetails.expiryStr;

          if (typeof expiry !== "string") {
            throw new Error("Expiry is not a string");
          } // expiryStr is defined within usersService within the login method from the backend

          // Dispatch the logedIn action with user and token data
          dispatch(logedIn({ user, token, expiry }));

          navigate("/"); // Navigating to the dashboad page
        } catch (error) {
          console.log(error);
        }
      };
      break;
    default:
      // Handle default case if userType doesn't match any enum value, Need to implement 404 page
      break;
  }
  // Defining a validation schema based on the list of fields
  validation = createValidationSchema(fields);

  return (
    <>
      {/* This module will be the responsible for redirecting each user to its specific tailored login page that will be reused as well */}
      <LoginPage
        typeOfUser={enumValUser}
        fields={fields}
        validation={yup.object().shape(validation)}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default LoginClassifier;
