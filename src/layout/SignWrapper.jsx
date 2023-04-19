import { useContext } from "react";
import AuthContext from "../Context/Auth-context";
import Spinner from "../components/Spinner";

const SignWrapper = ({ children }) => {
  const { isLoading } = useContext(AuthContext);
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-slate-600 ">
      {isLoading ? (
        <div className="absolute z-10 h-screen w-screen bg-black/50 flex justify-center items-center text-4xl">
          <Spinner />
        </div>
      ) : null}
      {children}
    </div>
  );
};

export default SignWrapper;
