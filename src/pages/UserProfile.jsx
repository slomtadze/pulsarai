import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../Context/Auth-context";
import Button from "../layout/Button";

const UserProfile = () => {
  const { id } = useParams();
  const { user, logout } = useContext(AuthContext);
  console.log(user);
  return (
    <div className="h-screen w-screen bg-herro-img flex-col justify-center  bg-cover bg-center">
      <div className="flex-col justify-center p-8">
        {user.isFirstLogin ? (
          <p className="text-center text-6xl italic">Welcome {user.name}</p>
        ) : (
          <div className="text-center">
            <h1 className="text-6xl">Hey, nice to see you back {user.name}</h1>
            <p className="mt-4 text-4xl ">
              It's your{" "}
              <span className="text-orange-800 font-bold ">{user.count}</span>{" "}
              th login
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
