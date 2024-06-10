"use client";
import { Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import StyledInput from "../styled-input";
import { FiMail } from "react-icons/fi";
import ButtonComponent from "@/components/button/button-component";

import LoginComponentFooter from "@/components/login-component";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Axios } from "@/axois/axios";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface IsignIn {email: string, password: string}

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
      "Please enter a valid email address"
    )
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const SigninComponent = () => {
  const queryClient = useQueryClient()
  const router = useRouter();
  const {mutate: login, isPending} = useMutation({
    mutationFn: async (data: IsignIn) => await Axios.post('/auth/login', data),
    onSuccess: (res: AxiosResponse<{status: "success" | "error" | "online", message: string}>) => {
      if(res.data.status === "online") {
        toast.success("success")

        queryClient.setQueryData(['user'], () => {
          const  {message, ...rest} = res.data
          return {
            ...rest
          }
        })

        router.push('/dashboard')
      }
    },
    onError: (error: AxiosError) => {
      console.log(isAxiosError(error))
      toast.error((error.response?.data as any)?.message || (error as unknown as Error).message)
    }
  })

  const onSubmit = async (values: IsignIn) => {
    login(values)
  }
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={onSubmit}
      validationSchema={loginSchema}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit} className="mt-8">
          <div className="space-y-4">
            <Field
              name="email"
              as={StyledInput}
              placeholder={"Enter Email"}
              text={"EMAIL ADDRESS"}
              htmlFor="email-address"
              icon={<FiMail />}
            />
            <Field
              name="password"
              as={StyledInput}
              placeholder={"Enter Password"}
              text={"PASSWORD"}
              htmlFor="password"
              password={true}
              type="password"
            />
          </div>

          <div className="mt-4">
            <ButtonComponent
             loading={isPending}
             disabled={isPending}
              className="w-full mt-6 text-lg font-bold text-white shadow-xl"
              text={`Log in`}
              type="submit"
            
            />
          </div>
          <div className="text-center text-sm mt-8 mb-4">Or</div>
          <div className="mb-10">
            <LoginComponentFooter
              gText="Continue With Google"
              fText="Continue with Facebook"
            />
          </div>
          <div className="text-center text-md pb-10">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-semibold text-s_blue">
              Sign Up
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SigninComponent;
