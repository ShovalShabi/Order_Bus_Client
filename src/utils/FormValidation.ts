import { ObjectShape } from "yup";
import * as yup from "yup";

const createValidationSchema = (fields: string[]): ObjectShape => {
  const validationSchema: ObjectShape = {};

  fields.forEach((field) => {
    switch (field) {
      case "Email":
        validationSchema[field] = yup
          .string()
          .email("Invalid email")
          .required("Required");
        break;
      case "Confirm Password":
        validationSchema[field] = yup
          .string()
          .oneOf([yup.ref("Password")], "Passwords must match")
          .required("Required");
        break;
      default:
        validationSchema[field] = yup.string().required("Required");
        break;
    }
  });

  return validationSchema;
};

export default createValidationSchema;
