import AuthComponent from "@/components/auth-component";
import SigninComponent from "@/components/form/screens/sign-in";
import { IMAGES } from "@/constants";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";

export const metadata: Metadata = {
  title: "SoTrip - Log In",
  description: "Login to sotrip",
};

const LoginPage = () => {
  return (
    <div className="grid grid-cols-12 h-screen overflow-hidden">
      <div className="md:col-span-6 md:block hidden h-screen overflow-hidden">
        <AuthComponent
          src={IMAGES.RoadMap}
          text={"Discover New Places In Your New City!"}
        />
      </div>
      <div className="md:col-span-6 col-span-12 px-5 md:pb-0 pb-20 md:px-0 mt-14 min-h-screen overflow-scroll">
        <div className="max-w-md w-full mx-auto space-y-10 md:pb-20">
          <div className="w-full">
            <Image
              className="w-20 object-fit"
              src={IMAGES.SotripLogo.src}
              alt="SoTrip"
              width={50}
              height={50}
            />
            <h2 className="mt-6 text-center text-4xl font-bold text-gray-900">
              Log In
            </h2>
            <p className="mt-2 font-medium text-center text-md text-gray-600">
              Enter your credentials to access your account
            </p>
          </div>
          <SigninComponent />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
