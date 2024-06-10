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
  password: string;
  confirm_password: string;
}

const resetSchema = Yup.object().shape({
  password: Yup.string().required("Password is required"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm Password is required"),
});

const ChangePasswordComponent: React.FC<{ otpCode: string }> = ({ otpCode }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate: resetPassword, isPending } = useMutation({
    mutationFn: async (data: {email: string, password: string, otpCode: string}) =>
      await Axios.post("/auth/reset-password", data),
    onSuccess: (
      res: AxiosResponse<{
        status: "success" | "error" | "online";
        message: string;
      }>,
    ) => {
      if (res.data.status === "success") {
        toast.success(res.data.message)
        router.push("/login");
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
    const email = queryClient.getQueryData(['email']) as string
    resetPassword({password: values.password, email, otpCode});
  };
  return (
    <Formik
      initialValues={{
        password: "",
        confirm_password: "",
      }}
      onSubmit={onSubmit}
      validationSchema={resetSchema}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit} className="mt-8 w-full">
          <div className="space-y-2">
            <Field
               name="password"
               as={StyledInput}
               type={'password'}
               placeholder={'Password'}
               text={'Password'}
               password={true}
            />
             <Field
               name="confirm_password"
               as={StyledInput}
               type={'password'}
               placeholder={'Confirm Password'}
               text={'Confirm Password'}
               password={true}
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

export default ChangePasswordComponent;
