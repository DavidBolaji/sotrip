"use client";
import React, { InputHTMLAttributes, useEffect, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  showIcon?: boolean;
  valid?: boolean;
  text?: string;
  border?: boolean;
  focus?: boolean;
  loading?: boolean;
  password?: boolean;
  htmlFor?: string;
  icon?: React.ReactNode;
};

const InputComponent: React.FC<InputProps> = ({
  showIcon,
  icon,
  valid,
  text,
  border,
  focus,
  loading,
  name,
  password,
  htmlFor,
  ...rest
}) => {
  const [pass, setPass] = useState(rest.type);

  useEffect(() => {
    if (password) {
      setPass(rest.type);
    }
  }, [rest.type, password]);

  return (
    <div className="flex flex-col w-full">
      {text && text.trim().length > 0 && (
        <label
          htmlFor={htmlFor}
          className="ml-1 font-semibold text-lg mb-0.5 text-black"
        >
          {text}
        </label>
      )}
      <div
        className={`relative flex rounded-[10px] text-black_200 h-[64px] w-full border border-[#818181] focus-within:border focus-within:border-s_blue`}
      >
        <input
          name={name}
          {...rest}
          type={pass}
          autoComplete="false"
          placeholder={rest.placeholder}
          className="md:placeholder:text-lg placeholder:text-[12px] relative text-[14px] z-30 bg-transparent rounded-[0.625rem] pl-[12px] w-full border-none outline-none focus:ring-0"
        />
        {icon && !password && (
          <span className="text-[18px] opacity-50 absolute right-4 top-1/2 transition-transform duration-300 ease-in-out group-focus:-translate-y-6 transform translate-y-[-50%] flex items-center">
            {icon}
          </span>
        )}
        {password && (
          <span
            className={`absolute right-4 top-1/2 -translate-y-1/2 flex items-center text-[16px] cursor-pointer z-30`}
            onClick={() =>
              pass === "text" ? setPass("password") : setPass("text")
            }
          >
            {pass === "password" && (
              <FiEyeOff size={20} color="#9f9f9f" />
            ) }
            {pass === "text" &&  (
              <FiEye size={20} color="#9f9f9f" />
            )}
          </span>
        )}
      </div>
    </div>
  );
};

export default InputComponent;
