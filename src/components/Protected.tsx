"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Loader from "./Loder";
const layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { userLoading, user } = useAuth();
  // console.log(user);

  useEffect(() => {
    // console.log("protected", user);
    if (user === null) {
      console.log("protected", user);
      router.push("/login");
    }
  }, [user]);

  if (userLoading) {
    return (
      <div className="w-full flex justify-center items-center h-screen mx-auto">
        <Loader />
      </div>
    );
  }
  return <>{children}</>;
};

export default layout;
