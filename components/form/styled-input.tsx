"use client";
import { ErrorMessage, useFormikContext } from "formik";
import React, { useState } from "react";

import { usePathname, useRouter } from "next/navigation";
import InputComponent, { InputProps } from "./input-component";
import { isNotNumber, isNotText } from "@/utils/helpers";
import FormError from "./form-error-component";

const StyledInput: React.FC<InputProps> = ({ name, ...rest }) => {
  const {
    getFieldProps,
    handleBlur,
    handleChange,
    getFieldMeta,
    isValidating,
  } = useFormikContext();
  const router = useRouter();

  const fieldProps = getFieldProps(name!);
  const { error } = getFieldMeta(name!);
  const pathname = usePathname();

  if (!fieldProps) {
    return null;
  }

  const { value } = fieldProps;

  return (
    <>
      <InputComponent
        name={name}
        showIcon={value?.length > 0}
        valid={!error}
        loading={isValidating}
        {...rest}
        // border={
        //   typeof error !== "undefined" && error.trim().length < 1 && touched
        // }
        onChange={(e) => {
          if (rest.type === "num") {
            if (!isNotNumber(e.target.value) || e.target.value === "") {
              handleChange(e);
            }
          } else if (rest.type === "text") {
            if (!isNotText(e.target.value) || e.target.value === "") {
              handleChange(e);
            }
          } else {
            handleChange(e);
          }
        }}
        onBlur={handleBlur}
      />
      <div
        className={`flex justify-between items-center ${
          name === "password" ? "flex-row-reverse" : ""
        } `}
      >
        {name === "password" && (
          <div
            className="text-md font-semibold text-s_blue flex justify-end -mt-1 cursor-pointer"
            onClick={() => router.push('/forgot')}
          >
            Forgot password?
          </div>
        )}
        <ErrorMessage name={name!}>
          {(msg) => <FormError msg={msg} />}
        </ErrorMessage>
      </div>
    </>
  );
};

export default StyledInput;
