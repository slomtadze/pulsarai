import SignWrapper from "../layout/SignWrapper";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";

import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useContext, useState } from "react";
import AuthContext from "../Context/Auth-context";
import Button from "../layout/Button";

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirm: "",
};

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Required")
    .matches(/^[a-zA-Z0-9_-]{3,16}$/, "Min 3 / Max 16 charachters"),
  email: Yup.string().required("Required").email("Please enter a valid Email"),
  password: Yup.string()
    .required("Required")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "Min 8 charachters (number/letter)"
    ),
  confirm: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
});

const SignUp = () => {
  const { signUp } = useContext(AuthContext);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const onSubmit = (values) => {
    signUp(values.email, values.password, values.name, navigate, setError);
  };

  return (
    <SignWrapper>
      <div className="bg-black/80 p-4 rounded-lg sm:w-full">
        <h2 className="text-center text-white mt-6 text-2xl font-bold">
          Sign Up
        </h2>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form className="w-[450px] sm:w-full px-8 py-4 relative">
            <Input type="text" id="name" label="Name" />
            <Input type="email" id="email" label="Email" />
            <Input type="password" id="password" label="Password" />
            <Input type="password" id="confirm" label="Confirm Password" />
            {error && (
              <div className="absolute text-red-800 italic bottom-28 w-1/2">
                {error}
              </div>
            )}
            <div className="pb-2">
              <Button title="Confirm" type="submit" />
              <Button
                title="Cancel"
                type="button"
                onClick={() => navigate("/")}
              />
            </div>

            <p className="mt-2 text-white">
              Already Registered?&nbsp;
              <Link to="../" className="text-blue-300 italic hover:text-white">
                Sign In
              </Link>
            </p>
          </Form>
        </Formik>
      </div>
    </SignWrapper>
  );
};

export default SignUp;
