"use client"
import React from "react";
import ButtonComponent from "./button/button-component";

const LoginComponentFooter:React.FC<{gText: string; fText: string}> = ({gText, fText}) => {
  // Google Handler function
  const handleGoogleSignin = async () => {
    // signIn('google', { callbackUrl : "http://localhost:3000"})
  };

  // Github Login
  const handleFacebookSignin = async () => {
    // signIn('github', { callbackUrl : "http://localhost:3000"})
  };

  return (
    <div className="w-full">
      <ButtonComponent
        bType="GOOGLE"
        type="button"
        text={gText}
        onClick={handleGoogleSignin}
        className="bg-transparent text-black border-[#818181] border w-full flex items-center justify-center gap-3 mb-4"
      />
      <ButtonComponent
        bType="FACEBOOK"
        type="button"
        className="bg-transparent text-black border-[#818181] border w-full flex items-center justify-center gap-3 mb-4"
        text={fText}
        onClick={handleFacebookSignin}
      />
    </div>
  );
};

export default LoginComponentFooter;
