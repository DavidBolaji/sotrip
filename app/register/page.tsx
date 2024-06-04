import AuthComponent from "@/components/auth-component";

import RegisterStepper from "@/components/register-stepper";
import { IMAGES } from "@/constants";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";

export const metadata: Metadata = {
  title: "SoTrip - Register",
  description: "Open an account with sotrip",
};

const RegisterPage = () => {
  return (
    <div className="grid grid-cols-12 h-screen overflow-hidden">
      <div className="col-span-6 md:block hidden h-screen overflow-hidden">
        <AuthComponent
          src={IMAGES.River}
          text={`Explore Your Dream Destination! I'm Going With You`}
        />
      </div>
      <div className="md:col-span-6 col-span-12 md:px-0 px-5 mt-14 min-h-screen overflow-scroll">
        <div className="max-w-md w-full mx-auto space-y-10 md:pb-20">
          <div className="w-full">
            <Image
              className="w-20 object-fit"
              src={IMAGES.SotripLogo.src}
              alt="SoTrip"
              width={50}
              height={50}
            />
          </div>
          <RegisterStepper />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
