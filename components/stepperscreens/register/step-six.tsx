import ButtonComponent from "@/components/button/button-component";
import { Field, Form, Formik } from "formik";
import React from "react";
import { StepperChildProps } from "@/components/stepper/stepper";
import * as Yup from "yup";
import { isValidPhoneNumber } from "react-phone-number-input";
import StyledInput from "@/components/form/styled-input";
import CustomPhoneInput from "@/components/form/custom-phone-input";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { Axios } from "@/axois/axios";
import { useRouter } from "next/navigation";

const formSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  password: Yup.string().required("Password is required"),
  phone: Yup.string()
    .test("is-valid-phone-number", "Invalid phone number", function (value) {
      return isValidPhoneNumber(value || "");
    })
    .required("Phone number is required"),
});

const StepSix: React.FC<{ SW: StepperChildProps }> = ({ SW }) => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const {mutate, isPending} = useMutation({
    mutationFn: async (data: {email: string; name: string; phoneNumber: string; password: string}) => await Axios.post('/auth/add-details', {...data}),
    onSuccess: (_: AxiosResponse) => {
      router.push('/')
    }
  })
  const onSubmit = async (values: {name: string; phone: string; password: string}) => {
    const email = queryClient.getQueryData(['email']) as string
    mutate({
      email,
      phoneNumber: values.phone,
      name: values.name,
      password: values.password
    })
 
  };
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <h2 className="text-center text-4xl font-bold text-black">Sign Up</h2>
      <p className="mt-2 font-medium text-center text-md text-gray-600">
        Sign up to enjoy the
      </p>
      <div className="mt-5 w-full">
        <Formik
          initialValues={{
            name: "",
            phone: "",
            password: "",
          }}
          onSubmit={onSubmit}
          validationSchema={formSchema}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <div className="space-y-3">
                <Field
                  as={StyledInput}
                  name="name"
                  text="Name"
                  placeholder={"Enter Name"}
                />
               

                <Field
                  as={CustomPhoneInput}
                  name="phone"
                  text="Phone Number"
                  placeholder={"Enter Phone no"}
                />
                
                <Field
                  as={StyledInput}
                  name="password"
                  text="Password"
                  placeholder={"Enter Password"}
                  password={true}
                  type="password"
                />
              </div>
              <div className="mt-12">
                <ButtonComponent
                  type="submit"
                  loading={isPending}
                  text="Sign Up"
                  className="text-white w-full text-lg font-bold shadow-xl flex items-center justify-center gap-3 mb-4"
                />
              </div>
              <div className="text-center text-md mt-6">
                Already have an account?{" "}
                <Link href="/" className="font-semibold text-s_blue">
                  Log in
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default StepSix;
