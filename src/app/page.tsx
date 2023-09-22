"use client";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
// import { useRouter } from "next/navigation";
import { usePathname, useRouter } from "next/navigation";
import Loader from "@/components/Loder";
export default function Home() {
  const Pathname = usePathname();
  if (Pathname === "/") {
    console.log("path name is this ");
  }
  const router = useRouter();
  useEffect(() => {
    router.push("/dashboard");
  }, []);

  const { logout } = useAuth();
  return (
    <div className="bg-[#fbfbfb] h-screen">
      <div className="w-full flex justify-center items-center h-screen mx-auto">
        <Loader />
      </div>
    </div>
  );
}
