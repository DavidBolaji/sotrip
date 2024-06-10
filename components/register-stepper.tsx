"use client";
import React, { useState } from "react";
import Stepper, { StepperChildProps } from "./stepper/stepper";
import StepOne from "./stepperscreens/register/step-one";
import StepTwo from "./stepperscreens/register/step-two";
import StepThree from "./stepperscreens/register/step-three";
import StepFour from "./stepperscreens/register/step-four";
import StepFive from "./stepperscreens/register/step-five";
import StepSix from "./stepperscreens/register/step-six";

const RegisterStepper = () => {
  const [SW, setSW] = useState<StepperChildProps | null>(null);

  return (
    <>
      <Stepper
        init={setSW}
        animationType="fade"
      >
        <div className="flex items-center justify-center min-h-[70vh] w-full">
          <StepOne SW={SW!} />
        </div>
        <div className="flex items-center justify-center min-h-[70vh]">
          <StepTwo SW={SW!} />
        </div>
        <div className="flex flex-col items-center justify-center min-h-[70vh]">
          <StepThree SW={SW!} />
        </div>
        <div className="flex flex-col items-center justify-center min-h-[70vh]">
          <StepFour SW={SW!} />
        </div>
        <div className="flex flex-col min-h-[90vh] px-3 items-center justify-center">
          <StepFive SW={SW!} />
        </div>
        <div className="flex flex-col px-3 items-center justify-center no-scrollbar">
          <StepSix SW={SW!} />
        </div>
      </Stepper>
    </>
  );
};

export default RegisterStepper;
