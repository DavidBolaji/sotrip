import AuthComponent from "@/components/auth-component";
import ResetComponent from "@/components/form/screens/reset-component";
import { IMAGES } from "@/constants";
import React from "react";

const ResendPage = () => {
  return (
    <div className="grid grid-cols-12 h-screen overflow-hidden">
      <div className="md:col-span-6 md:block hidden h-screen overflow-hidden">
        <AuthComponent src={IMAGES.Rafiki} text={""} />
      </div>
      <div className="md:col-span-6 col-span-12 px-5 md:pb-0 pb-20 md:px-0 mt-14">
        <div className="flex items-center justify-center w-full h-[80vh] max-w-md mx-auto">
          <ResetComponent />
        </div>
      </div>
    </div>
  );
};

export default ResendPage;
