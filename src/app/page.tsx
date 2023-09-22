"use client";

import { useEffect } from "react";
// import { useRouter } from "next/navigation";
import { usePathname, useRouter } from "next/navigation";
import Loader from "@/components/Loder";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const Pathname = usePathname();
  if (Pathname === "/") {
    console.log("path name is this ");
  }
  const router = useRouter();
  useEffect(() => {
    router.push("/dashboard");
  }, []);

  const { userLoading, user } = useAuth();
  // console.log(user);

  useEffect(() => {
    // console.log("protected", user);
    if (user === null) {
      console.log("protected", user);
      router.push("/login");
    }
  }, [user]);

  return (
    <div className="bg-[#fbfbfb] h-screen w-screen flex justify-center items-center">
      <div className="w-full flex justify-center items-center h-screen mx-auto">
        <Loader />
      </div>
    </div>
  );
}
