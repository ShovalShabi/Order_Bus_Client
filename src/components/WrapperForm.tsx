import { ReactNode } from "react";
import { Formik, FormikHelpers, FormikProps, FormikValues } from "formik";
import { AnyObject, ObjectSchema } from "yup";

interface FormWrapperProps {
  initialValues: FormikValues;
  validation: ObjectSchema<AnyObject>;
  targetFunction: (values: FormikValues) => void | Promise<void>;
  children: (formikProps: FormikProps<FormikValues>) => ReactNode;
}

function FormWrapper({
  initialValues,
  validation,
  targetFunction,
  children,
}: FormWrapperProps) {
  const handleFormSubmit = async (
    values: FormikValues,
    submissionProps: FormikHelpers<FormikValues>
  ) => {
    await targetFunction(values);
    submissionProps.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleFormSubmit}
      validationSchema={validation}
    >
      {(formikProps) => {
        return (
          <form onSubmit={formikProps.handleSubmit}>
            {children(formikProps)}
          </form>
        );
      }}
    </Formik>
  );
}

export default FormWrapper;
