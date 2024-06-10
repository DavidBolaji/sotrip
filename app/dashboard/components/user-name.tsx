"use client";
import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

const UserName = () => {
  const queryClient = useQueryClient();
  const [name, setName] = useState("");

  useEffect(() => {
    const user = queryClient.getQueryData(["user"]) as any;
    setName(user?.name);
  }, [queryClient]);

  return (
    <h2
      className={`text-black font-semibold text-2xl ${
        name.trim().length < 1 && "animate-pulse"
      }`}
    >
      Welcome {name.split(' ')[0]}!
    </h2>
  );
};

export default UserName;
