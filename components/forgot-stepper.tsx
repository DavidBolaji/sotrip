"use client";
import React, { useState } from "react";
import Stepper, { StepperChildProps } from "./stepper/stepper";
import ForgotComponent from "./form/screens/forgot-component";
import ResetComponent from "./form/screens/reset-component";


const ForgotStepper = () => {
  const [SW, setSW] = useState<StepperChildProps | null>(null);

  return (
    <>
      <Stepper
        init={setSW}
        animationType="fade"
      >
        <div className="w-full mx-auto">
          <ForgotComponent SW={SW!} />
        </div>
      </Stepper>
    </>
  );
};

export default ForgotStepper;
