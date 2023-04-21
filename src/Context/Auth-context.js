import React, { useEffect, useState } from "react";

import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { CHECK_USER, LOGIN_MUTATION, SIGNUP_MUTATION } from "../graphql/mutations";

const AuthContext = React.createContext({
  user: {},
  isLoading: false,
  signUp: () => {},
  login: () => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loginMutation] = useMutation(LOGIN_MUTATION);
  const [signupMutation] = useMutation(SIGNUP_MUTATION);
  const [checkUserMutation] = useMutation(CHECK_USER);

  const navigate = useNavigate()

  useEffect(() => {
    const checkForLoggedInUser = async () => {
      const existingToken = localStorage.getItem("user");
      if (existingToken) {
        setIsLoading(true)
        try {
          const response = await checkUserMutation({
            variables: {
              input: {
                token: existingToken,
              },
            },
          });
          const {user: existUser} = response.data.checkUser
          setUser({...existUser})
          setIsLoading(false)
          navigate(`../user/${existUser._id}`)
        } catch (error) {
          console.log(error.message);
        }
      }
    };
    checkForLoggedInUser();
  }, [checkUserMutation]);

  const signUpHandler = async (email, password, name, navigate, setError) => {
    setIsLoading(true);
    try {
      const response = await signupMutation({
        variables: {
          input: {
            name,
            email,
            password,
          },
        },
      });
      const { token, user: newUser } = response.data.signup;
      setUser({ isFirstLogin: true, ...newUser });
      localStorage.setItem("user", token);
      setIsLoading(false);
      
      navigate(`../user/${newUser._id}`);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
    /* const id = uniqid();
    setUser({ email, password, name, id, loginCount: 1, isFirstLogin: true });
    console.log({ email, password, name, id, loginCount: 0 });
    navigate(`../user/${id}`, { state: { firstLogin: true } }); */
  };

  const loginHandler = async (email, password, navigate, setError) => {
    setIsLoading(true);
    try {
      const response = await loginMutation({
        variables: {
          input: {
            email,
            password,
          },
        },
      });

      const { token, user: newUser } = response.data.login;
      setUser({ isFirstLogin: false, ...newUser });
      localStorage.setItem("user", token);
      setIsLoading(false);
      navigate(`../user/${newUser._id}`)
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const contextValue = {
    user: user,
    isLoading,
    signUp: signUpHandler,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
