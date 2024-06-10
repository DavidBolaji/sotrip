import { Axios } from "@/axois/axios";
import ButtonComponent from "@/components/button/button-component";
import StyledInput from "@/components/form/styled-input";
import { StepperChildProps } from "@/components/stepper/stepper";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";

const emailSchema = Yup.object().shape({
  email: Yup.string().matches(
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
    "Please enter a valid email address"
  ),
});

const StepTwo: React.FC<{ SW: StepperChildProps }> = ({ SW }) => {
  const queryClient = useQueryClient()
  const {mutate, isPending} = useMutation({
    mutationFn: async(email: string) => await Axios.post('/auth/register', {email}),
    onSuccess: (_: AxiosResponse, variable: string) => {
      queryClient.setQueryData(['email'], () => {
        return variable
      })
      SW.next()
    }
  })
  const onSubmit = (values: {email: string}) => {
    mutate(values.email)
  };

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <h2 className="text-center text-4xl font-bold text-black">
        What&apos;s your Email Address
      </h2>
      <p className="mt-2 font-medium text-center text-md text-gray-600">
        We will send a code to Verify your Email
      </p>
      <div className="mt-5 w-full">
        <Formik
          initialValues={{
            email: "",
          }}
          onSubmit={onSubmit}
          validationSchema={emailSchema}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit} className="space-y-3">
              <Field
                as={StyledInput}
                name="email"
                placeholder={"Enter Email"}
              />
              <ButtonComponent
                loading={isPending}
                // onClick={() =>}
                text="Continue"
                type="submit"
                className="text-white w-full text-lg font-bold shadow-xl flex items-center justify-center gap-3 mb-4"
              />
              <div className="text-center text-md cursor-pointer translate-y-4">
                <span
                  onClick={() => SW.prev()}
                  className="font-semibold text-s_blue"
                >
                  Return to Log in
                </span>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default StepTwo;
