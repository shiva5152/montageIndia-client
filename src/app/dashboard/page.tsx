"use client";
import { useAuth } from "@/context/AuthContext";
import React from "react";

const page = () => {
  const { logout } = useAuth();
  return (
    <div className="bg-[#fbfbfb] h-screen w-full p-10 py-4">
      <button
        onClick={logout}
        className="bg-black text-white rounded-md px-4 py-2"
      >
        logout
      </button>
    </div>
  );
};

export default page;
