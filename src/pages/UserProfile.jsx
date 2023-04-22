import React, { useContext, useEffect } from "react";
import { useSubscription } from "@apollo/client";
import AuthContext from "../Context/Auth-context";
import Button from "../layout/Button";
import { USER_COUNT_SUBSCRIPTION } from "../graphql/mutations";






const UserProfile = () => {
  const { user, logout } = useContext(AuthContext);
  console.log(user)
  const { data, loading } = useSubscription(
    USER_COUNT_SUBSCRIPTION);

    useEffect(() => {
      if(data){
        if(data.userCountUpdated > 3){
          alert(`Number Of Active Users: ${data?.userCountUpdated}`)
        }        
      }      
    }, [data])  

    useEffect(() => {
      if(user?.usersCount > 3){
        console.log(user)
        alert(`You are lucky person`)
      }
    },[user])
  
  
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
