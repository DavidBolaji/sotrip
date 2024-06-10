import { cn } from "@/utils/helpers";
import React, { ButtonHTMLAttributes } from "react";
import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import Spinner from "../spinner";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string | React.ReactNode;
  className?: string;
  bType?: 'GOOGLE' | 'FACEBOOK'
  loading?: boolean
}

const ButtonComponent: React.FC<IButton> = ({ text, className, bType, loading = false, ...rest }) => {
  return (
    <button
      {...rest}
      className={cn("bg-s_blue h-[62px] rounded-[10px] px-[10px]", className)}
    >
      {bType === "FACEBOOK" && <BsFacebook color={"blue"} />}
      {bType === "GOOGLE" && <FcGoogle />}
      {loading ? <Spinner /> :text  }
    </button>
  );
};

export default ButtonComponent;
