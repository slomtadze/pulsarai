import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./Context/Auth-context";
import "./index.css";

const client = new ApolloClient({
  uri: 'https://flyby-router-demo.herokuapp.com/',
  cache: new InMemoryCache(),
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
