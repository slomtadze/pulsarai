import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../layout/Button";
import SignWrapper from "../layout/SignWrapper";
import { useContext, useState } from "react";
import AuthContext from "../Context/Auth-context";

const initialValues = {
  email: "",
  password: "",
};
const validationSchema = Yup.object({
  email: Yup.string().required("Requierd").matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, "Please enter a valid Email"),
  password: Yup.string().required("Required"),
});

const SignIn = () => {
  const [error, setError] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const onSubmit = (values) => {
    login(values.email, values.password, navigate, setError);
  };

  return (
    <SignWrapper>
      <div className=" bg-black/50 p-4 rounded-lg sm:w-full sm:h-full ">
        <h2 className="text-center text-white mt-6 text-2xl font-bold">
          Sign In
        </h2>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form className="w-[350px] mb-6 px-4 pt-4 relative items-center sm:w-full">
            <Input label="Email" type="email" id="email" />
            <Input label="Password" type="password" id="password" />
            {error && (
              <div className=" bg-red-900/50 text-white italic bottom-20 max-w-full w-fit p-2 overflow-wrap: break-word">
                {error}
              </div>
            )}
            <div>
              <Button title="Login" type="submit" />
              <Button
                title="Cancel"
                type="reset"
                onClick={() => setError(false)}
              />
            </div>
            <p className="mt-2 text-white">
              Have not account yet?&nbsp;Register&nbsp;
              <Link
                to="../signUp"
                className="text-blue-300 italic hover:text-white"
              >
                Here
              </Link>
            </p>
          </Form>
        </Formik>
      </div>
    </SignWrapper>
  );
};

export default SignIn;
