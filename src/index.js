import React from "react";
import ReactDOM from "react-dom/client";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./Context/Auth-context";
import "./index.css";

const httpLink = new HttpLink({ uri: "http://localhost:4000/graphql" }); // Replace with the URI of your Apollo Server
const cache = new InMemoryCache();

const client = new ApolloClient({
  link: httpLink,
  cache: cache,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <AuthContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthContextProvider>
  </ApolloProvider>
);
