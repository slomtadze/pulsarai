import React, { useEffect, useState } from "react";

import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext({
  user: {},
  isLoading: false,
  signUp: () => {},
  login: () => {},
  logout: () => {},
});

const CHECK_USER = gql`
  mutation CheckUser($input: CheckUserInput!) {
    checkUser(input: $input) {
      user {
        name
        _id
        email
        password
        count
      }
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        name
        _id
        email
        password
        count
      }
    }
  }
`;
const SIGNUP_MUTATION = gql`
  mutation Signup($input: SignupInput!) {
    signup(input: $input) {
      token
      user {
        name
        _id
        email
        password
        count
      }
    }
  }
`;

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
          setUser({isFirstLogin: false, ...existUser})
          setIsLoading(false)
          navigate(`../user/${existUser._id}`)
        } catch (error) {
          console.log(error.message);
        }
      }
    };
    checkForLoggedInUser();
  }, [checkUserMutation, navigate]);

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
