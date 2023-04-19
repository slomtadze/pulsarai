import { ErrorMessage, Field } from "formik";

const Input = ({ type, id, label }) => {
  return (
    <div className="font-mono text-white flex flex-col justify-center align-start relative sm:w-full">
      <label className="font-mono mb-0.5" htmlFor={id}>
        {label}
      </label>
      <Field
        className="text-gray-200 outline-none rounded px-4 py-[4px] mb-7 bg-gray-600 italic sm:w-full"
        type={type}
        name={id}
        id={id}
        placeholder={label}
      ></Field>
      <ErrorMessage
        name={id}
        render={(errorMsg) => (
          <span className="absolute text-sm sm:text-[10px] text-red-500 bottom-2 font-mono italic">
            {errorMsg.toLowerCase()}
          </span>
        )}
      />
    </div>
  );
};

export default Input;
