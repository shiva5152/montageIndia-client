"use client";
import React, { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loder";
const layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { userLoading, user } = useAuth();

  //   if (!user) {
  //     return (
  //         <div className="w-full flex justify-center items-center h-screen mx-auto">
  //       <Loader />
  //     </div>
  //     )
  //   }
  return <>{children}</>;
};

export default layout;
