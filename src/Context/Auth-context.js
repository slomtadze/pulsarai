import React, { useState } from "react";
import uniqid from "uniqid";
import { ApolloClient, ApolloProvider, InMemoryCache, gql } from '@apollo/client';





const AuthContext = React.createContext({
  user: {},
  signUp: () => {},
  login: () => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);

  const apoloClient = new ApolloClient({
    uri: props.client.uri,
    cache: new InMemoryCache(),
  });

  const signUpHandler = async (email, password, name, navigate, setError) => {
    const id = uniqid();
    setUser({ email, password, name, id, loginCount: 1, isFirstLogin: true });
    console.log({ email, password, name, id, loginCount: 0 });
    navigate(`../user/${id}`, {state: {firstLogin:true}});
  };

  const loginHandler = async (email, password, navigate, setError) => {

    const id = uniqid(); 
    setUser({ email, password, loginCount: 1, isFirstLogin: true });
    navigate(`../user/${id}`, {state: {firstLogin:false}});  
    console.log({email, password});

  };

  const logoutHandler = () => {
    console.log("logout");    
    setUser(null);
  };

  const contextValue = {
    user: user,
    signUp: signUpHandler,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <ApolloProvider client={apoloClient}>    
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
    </ApolloProvider>
  );
};

export default AuthContext;
