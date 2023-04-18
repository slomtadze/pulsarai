import React from "react";
import { Route, Routes } from "react-router-dom";
/* import Header from "../src/components/Header";
import Home from "../src/Pages/Home"; */
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import UserProfile from "./pages/UserProfile";
import ProtectedRoute from "./components/ProtectedRoute";

/* import ProtectedRoute from "./components/ProtectedRoute"; */

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route
        path="/user/:id"
        element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
