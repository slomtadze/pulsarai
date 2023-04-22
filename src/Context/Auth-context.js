import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { CHECK_USER, LOGIN_MUTATION, REFRESH_TOKEN, SIGNUP_MUTATION } from "../graphql/mutations";

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
  const [refreshTokenMutation] = useMutation(REFRESH_TOKEN);

  const [cookies, setCookie, removeCookie] = useCookies(["refreshToken"]);
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
            if(error.message === "TokenExpired"){             
              try {              
                const refreshToken = cookies.refreshToken

                if(!refreshToken){
                  navigate("/")
                  setIsLoading(false)
                }

                const response = await refreshTokenMutation({
                  variables: {
                    input: {
                      refreshToken: refreshToken,
                    },
                  },
                });

                const { token, user } = response.data.refreshToken
                
                localStorage.removeItem("user");              
                localStorage.setItem("user", token);

                setUser({...user})
                setIsLoading(false)

                navigate(`../user/${user._id}`)
              } catch (error) {
                localStorage.removeItem("user");    
                setIsLoading(false)
                navigate("/")
              }
          }  
          setIsLoading(false)
          if(error.message !== "TokenExpired"){
            navigate("/")
          }
          
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

        const { token, refreshToken, usersCount, user: newUser } = response.data.signup;        
        setUser({ isFirstLogin: true, usersCount, ...newUser });

        localStorage.setItem("user", token);
        setCookie("refreshToken", refreshToken)         
        navigate(`../user/${newUser._id}`);
        setIsLoading(false);   
      } catch (error) {
        setIsLoading(false)
        setError(error.message);        
      }
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

      const { token, refreshToken, user: newUser } = response.data.login;
      setUser({ isFirstLogin: false, ...newUser });
      localStorage.setItem("user", token);

      setCookie("refreshToken", refreshToken)
      setIsLoading(false);
      navigate(`../user/${newUser._id}`)
    } catch (error) {
        setError(error.message);
        setIsLoading(false)
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("user");
    removeCookie("refreshToken")
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
