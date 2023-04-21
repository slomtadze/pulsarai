import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./Context/Auth-context";
import "./index.css";
import client from "./graphql/apolloClient";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <AuthContextProvider>      
        <App />      
      </AuthContextProvider>
    </BrowserRouter>
  </ApolloProvider>
);
