import React, { useEffect, useState } from "react";
import uniqid from "uniqid";

const AuthContext = React.createContext({
  user: {},
  signUp: () => {},
  login: () => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);

  const signUpHandler = async (email, password, name, navigate, setError) => {
    const id = uniqid();
    setUser({ email, password, name, id, loginCount: 0 });
    console.log({ email, password, name, id, loginCount: 0 });
    navigate(`../user/${id}`);
  };

  const loginHandler = async (email, password, navigate, setError) => {
    console.log("login");
  };

  const logoutHandler = () => {
    console.log("logout");
    /* signOut(auth); */
    setUser(null);
  };

  const contextValue = {
    user: user,
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
