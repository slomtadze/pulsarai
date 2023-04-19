import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../Context/Auth-context";
import Button from "../layout/Button";

const UserProfile = () => {

    
  const { id } = useParams();
  const { user, logout } = useContext(AuthContext);
  return (
    <div className="h-screen w-screen bg-herro-img flex-col justify-center  bg-cover bg-center">
      <div className="flex-col justify-center p-8">
        {user.isFirstLogin ? (
          <p>Welcome {id}</p>
        ) : (
          <div className="text-center">
            <h1 className="text-6xl">Counter</h1>
            <p className="mt-4 text-4xl ">
              It's your <span className="text-orange-800 font-bold ">4</span> th
              login
            </p>
          </div>
        )}
        </div>
        <div className="flex justify-center items-center">
        <Button title="Sign Out" onClick={logout}>
          Sign Out
        </Button>
        </div>
    </div>
  );
};

export default UserProfile;
