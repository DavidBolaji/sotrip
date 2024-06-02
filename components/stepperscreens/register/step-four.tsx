import ButtonComponent from "@/components/button/button-component";
import { Field, Form, Formik } from "formik";
import React from "react";
import OtpInput, { InputProps } from "react-otp-input";
import { Grid } from "antd";
import Image from "next/image";
import { IMAGES } from "@/constants";
import { StepperChildProps } from "@/components/stepper/stepper";

const { useBreakpoint } = Grid;

const StepFour: React.FC<{ SW: StepperChildProps }> = ({ SW }) => {
  const screen = useBreakpoint();
  const onSubmit = async () => {};
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <div className="flex items-center w-full justify-center ">
        <Image
          alt="mail"
          className="scale-75"
          priority
          height={IMAGES.MailVerified.height}
          src={IMAGES.MailVerified.src}
          width={IMAGES.MailVerified.width}
        />
      </div>
      <h2 className="text-center text-4xl font-bold text-black mb-2">
        Email Verified
      </h2>

      <div className="mt-4 w-full">
        <ButtonComponent
         onClick={() => SW.next()}
          text="Proceed"
          className="text-white w-full text-lg font-bold shadow-xl flex items-center justify-center gap-3 mb-4"
        />
      </div>
    </div>
  );
};

export default StepFour;
