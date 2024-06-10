"use client"
import ButtonComponent from "@/components/button/button-component";
import React from "react";
import Image from "next/image";
import { IMAGES } from "@/constants";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Axios } from "@/axois/axios";
import { AxiosResponse } from "axios";
import toast from "react-hot-toast";
import Link from "next/link";


const ResetComponent = () => {
  const queryClient = useQueryClient();

  const { mutate: resendLink, isPending } = useMutation({
    mutationFn: async (email: string) =>
      await Axios.post("/auth/reset-password", { email }),
    onSuccess: (res: AxiosResponse) => {
      toast.success(res.data.message);
    },
  });

  const handleClick = () => {
    const email = getEmail()
    resendLink(email)
 }

 const getEmail = () => {
  const email = queryClient.getQueryData(['email']) as string
  return email;
 }


  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="flex items-center w-full justify-center">
        <Image
          alt="mail"
          className="scale-75"
          priority
          height={IMAGES.MailSent.height}
          src={IMAGES.MailSent.src}
          width={IMAGES.MailSent.width}
        />
      </div>
      <p className="font-medium text-center text-md text-gray-600 -mt-2">
        We sent a recovery link to
      </p>
      <h2 className="text-center text-2xl font-bold text-black">
        {getEmail()}
      </h2>
      <div className="mt-5 w-full">
        <ButtonComponent
         onClick={handleClick}
          loading={isPending}
          type="submit"
          text="Resend Link"
          className="text-white w-full text-lg font-bold shadow-xl flex items-center justify-center gap-3 mb-4"
        />
        <Link className="text-center text-md mt-6 flex items-center w-full justify-center" href="/">
          <span className="font-semibold text-s_blue">Return to Log In</span>
        </Link>
      </div>
    </div>
  );
};

export default ResetComponent;
