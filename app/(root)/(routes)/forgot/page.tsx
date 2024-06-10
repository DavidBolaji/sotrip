import AuthComponent from "@/components/auth-component";
import ForgotStepper from "@/components/forgot-stepper";
import { IMAGES } from "@/constants";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "SoTrip - Log In",
  description: "Login to sotrip",
};

const ForgotPage = () => {
  return (
    <div className="grid grid-cols-12 h-screen overflow-hidden">
      <div className="md:col-span-6 md:block hidden h-screen overflow-hidden">
        <AuthComponent src={IMAGES.Rafiki} text={""} />
      </div>
      <div className="md:col-span-6 col-span-12 px-5 md:pb-0 pb-20 md:px-0 mt-14">
        <div className="h-screen w-full flex items-center justify-center">
          <div className="w-full md:pb-20 max-w-md mx-auto">
            <h2 className="text-center text-4xl font-bold text-gray-900">
              Forgot Your Password
            </h2>
            <p className="mt-2 font-medium text-center text-md text-gray-600">
              We&apos;ll send a link to reset your password
            </p>
            <ForgotStepper />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPage;
