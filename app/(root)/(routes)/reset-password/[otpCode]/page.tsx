import AuthComponent from "@/components/auth-component";
import ChangePasswordComponent from "@/components/form/screens/change-password-component";
import { IMAGES } from "@/constants";
import React from "react";

const ResetPasswordPage = ({ params }: { params: { otpCode: string } }) => {
  return (
    <div className="grid grid-cols-12 h-screen overflow-hidden">
      <div className="md:col-span-6 md:block hidden h-screen overflow-hidden">
        <AuthComponent src={IMAGES.Rafiki} text={""} />
      </div>
      <div className="md:col-span-6 col-span-12 px-5 md:pb-0 pb-20 md:px-0 mt-14">
        <div className="flex flex-col items-center justify-center w-full h-[80vh] max-w-md mx-auto">
          
          <h2 className="text-center text-4xl font-bold text-gray-900">
            Reset Your Password
          </h2>
          {/* <p className="mt-2 font-medium text-center text-md text-gray-600">
            We&apos;ll send a link to reset your password
          </p> */}
          <ChangePasswordComponent otpCode={params.otpCode} />
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
