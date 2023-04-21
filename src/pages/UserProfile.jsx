import React, { useContext } from "react";
import { gql, useSubscription } from "@apollo/client";
import AuthContext from "../Context/Auth-context";
import Button from "../layout/Button";


const USER_COUNT_SUBSCRIPTION = gql`
  subscription  {
    userCountUpdated {
      updatedUserCount
    }
  }
`;



const UserProfile = () => {
  const { user, logout } = useContext(AuthContext);
  const { data, loading } = useSubscription(
    USER_COUNT_SUBSCRIPTION, 
    {onData: (data) =>  console.log("data")}
    );
  
  
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
