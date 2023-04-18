import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../Context/Auth-context";
import Button from "../layout/Button";

const UserProfile = () => {
  const [firstSignUp, setFirstSignUp] = useState(true);
  const { id } = useParams();
  const { logout } = useContext(AuthContext);
  return (
    <div className="h-screen w-screen bg-stone-50 flex justify-center pt-8">
      <div>
        {firstSignUp ? (
          <p>Welcome {id}</p>
        ) : (
          <div className="text-center">
            <h1 className="text-6xl">Counter</h1>
            <p className="mt-4 text-4xl ">
              It's your <span className="text-lime-500 font-bold ">4</span> th
              login
            </p>
          </div>
        )}
        <Button title="Sign Out" onClick={logout}>
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default UserProfile;
