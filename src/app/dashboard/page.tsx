"use client";
import { useAuth } from "@/context/AuthContext";
import React from "react";
import SearchContainer from "@/components/Search";

const page = () => {
  const { logout } = useAuth();
  return (
    <div className="bg-[#fbfbfb] h-screen w-full p-10 py-4">
      <div className="w-full text-white text-[2rem] text-center rounded-md py-4 bg-black">
        Dashboard
      </div>
      <div>
        <SearchContainer />
      </div>
    </div>
  );
};

export default page;
