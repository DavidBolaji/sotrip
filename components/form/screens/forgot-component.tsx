"use client";
import { Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import StyledInput from "../styled-input";
import { FiMail } from "react-icons/fi";
import ButtonComponent from "@/components/button/button-component";

import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Axios } from "@/axois/axios";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import toast from "react-hot-toast";

import { StepperChildProps } from "@/components/stepper/stepper";
import { useRouter } from "next/navigation";

interface IForgot {
  email: string;
}

const forgotSchema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
      "Please enter a valid email address"
    )
    .required("Email is required"),
});

const ForgotComponent: React.FC<{ SW: StepperChildProps }> = ({ SW }) => {
  const queryClient = useQueryClient();
  const router = useRouter()
  const { mutate: resetPassword, isPending } = useMutation({
    mutationFn: async (data: IForgot) =>
      await Axios.post("/auth/reset-password", data),
    onSuccess: (
      res: AxiosResponse<{
        status: "success" | "error" | "online";
        message: string;
      }>,
      variables: IForgot
    ) => {
      if (res.data.status === "success") {
        queryClient.setQueryData(["email"], () => variables.email);
        router.push('/resend')
      }
    },
    onError: (error: AxiosError) => {
      console.log(isAxiosError(error));
      toast.error(
        (error.response?.data as any)?.message ||
          (error as unknown as Error).message
      );
    },
  });

  const onSubmit = async (values: IForgot) => {
    resetPassword(values);
  };
  return (
    <Formik
      initialValues={{
        email: "",
      }}
      onSubmit={onSubmit}
      validationSchema={forgotSchema}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit} className="mt-8">
          <div className="space-y-2">
            <Field
              name="email"
              as={StyledInput}
              placeholder={"Enter Email"}
              text={"EMAIL ADDRESS"}
              htmlFor="email-address"
              icon={<FiMail />}
            />
          </div>

          <div className="mt-2">
            <ButtonComponent
              loading={isPending}
              disabled={isPending}
              className="w-full mt-6 text-lg font-bold text-white shadow-xl"
              text={`Send link`}
              type="submit"
            />
          </div>

          <div className="text-center text-md pt-10">
            <Link href="/" className="font-semibold text-s_blue">
              Return to Log In
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ForgotComponent;
