const SignWrapper = ({ children }) => {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-slate-600 ">
      {children}
    </div>
  );
};

export default SignWrapper;
