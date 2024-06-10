import ButtonComponent from "@/components/button/button-component";
import { Field, Form, Formik } from "formik";
import React from "react";
import OtpInput, { InputProps } from "react-otp-input";
import { Grid } from "antd";
import Image from "next/image";
import { IMAGES } from "@/constants";
import { StepperChildProps } from "@/components/stepper/stepper";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Axios } from "@/axois/axios";
import { AxiosResponse } from "axios";
import toast from "react-hot-toast";

const { useBreakpoint } = Grid;

const StepThree: React.FC<{ SW: StepperChildProps }> = ({ SW }) => {
  const screen = useBreakpoint();
  const queryClient = useQueryClient();

  const {mutate: resendOTP } = useMutation({
    mutationFn: async(email: string) => await Axios.post('/auth/request-otp', {email}),
    onSuccess: (res: AxiosResponse) => {
      toast.success(res.data.message)
    }
  })

  const {mutate, isPending} = useMutation({
    mutationFn: async (data: {email: string, otpCode: string}) => await Axios.post('/auth/verify-email', {...data}),
    onSuccess: (_: AxiosResponse) => {
      SW.next()
    }
  })

  const onSubmit = async (values: {otp: string}) => {
    const email = queryClient.getQueryData(['email']) as string
    mutate({email, otpCode: values.otp})
  };

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <div className="flex items-center w-full justify-center">
        <Image
          alt="mail"
          className="scale-75"
          priority
          height={IMAGES.Mail.height}
          src={IMAGES.Mail.src}
          width={IMAGES.Mail.width}
        />
      </div>
      <h2 className="text-center text-4xl font-bold text-black">
        Check Your Mail
      </h2>
      <p className="mt-2 font-medium text-center text-md text-gray-600">
        We sent a code to Verify your Email
      </p>
      <div className="mt-5 w-full">
        <Formik
          initialValues={{
            otp: "",
          }}
          onSubmit={onSubmit}
        >
          {({ handleSubmit, handleChange, values }) => (
            <Form
              onSubmit={handleSubmit}
              className="space-y-5 flex flex-col items-center"
            >
              <Field
                as={OtpInput}
                name="otp"
                numInputs={6}
                onChange={handleChange("otp")}
                value={values.otp}
                inputStyle={{
                  border: "none",
                  width: screen.md ? 45 : 40,
                  height: screen.md ? 45 : 40,
                  borderRadius: 10,
                  outline: "none",
                }}
                containerStyle={{
                  gap: screen.md ? 10 : 8,
                  border: "0px",
                }}
                shouldAutoFocus
                renderInput={(props: InputProps) => (
                  <div className="border border-[#666666] rounded-[10px] focus-within:border-orange">
                    <input {...props} />
                  </div>
                )}
              />
              <ButtonComponent
                loading={isPending}
                type="submit"
                text="Verify"
                className="text-white w-full text-lg font-bold shadow-xl flex items-center justify-center gap-3 mb-4"
              />
              <div
                className="text-center text-md mt-6"
                onClick={() =>{ 
                  const email = queryClient.getQueryData(['email']) as string
                  resendOTP(email)
                }}
              >
                If you didn&apos;t receive a code{" "}
                <span className="font-semibold text-s_blue">Resend</span>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default StepThree;
