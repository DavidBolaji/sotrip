import ButtonComponent from "@/components/button/button-component";
import { Field, Form, Formik } from "formik";
import React from "react";
import Image from "next/image";
import { IMAGES } from "@/constants";
import { StepperChildProps } from "@/components/stepper/stepper";
import { SelectInput } from "@/components/form/select-input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Axios } from "@/axois/axios";
import { AxiosResponse } from "axios";

const StepFive: React.FC<{ SW: StepperChildProps }> = ({ SW }) => {
  const queryClient = useQueryClient();
  const {mutate, isPending} = useMutation({
    mutationFn: async (data: {email: string, location: string}) => await Axios.post('/auth/add-location', {...data}),
    onSuccess: (_: AxiosResponse) => {
      SW.next()
    }
  })

  const onSubmit = async (values: {country: string}) => {
    const email = queryClient.getQueryData(['email']) as string
    mutate({location: values.country, email})
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex items-center w-full justify-center">
        <Image
          alt="mail"
          className="scale-75"
          priority
          height={IMAGES.Location.height}
          src={IMAGES.Location.src}
          width={IMAGES.Location.width}
        />
      </div>
      <h2 className="text-center text-4xl font-bold text-black">
        Where&apos;s Your Current Location
      </h2>
      <p className="mt-2 font-medium text-center text-md text-gray-600">
        Please Choose Your Country For a Better Experience
      </p>
      <div className="mt-5 w-full">
        <Formik
          initialValues={{
            country: "",
          }}
          onSubmit={onSubmit}
        >
          {({ handleSubmit }) => (
            <Form
              onSubmit={handleSubmit}
              className="space-y-5 w-full flex flex-col items-center"
            >
              <Field name="country" as={SelectInput} placeholder="Country" />
              <ButtonComponent
                disabled={isPending}
                type="submit"
                text="Proceed"
                className="text-white w-full text-lg font-bold shadow-xl flex items-center justify-center gap-3 mb-4"
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default StepFive;
