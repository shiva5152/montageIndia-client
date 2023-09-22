"use client";
import React, { use, useState } from "react";
import AddUserForm from "@/components/AddUserForm";

const page = () => {
  const [showFrom, setShowForm] = useState(false);

  return (
    <div className=" p-4">
      <button
        onClick={() => setShowForm(true)}
        className="bg-green-400 text-white rounded-md p-3"
      >
        Add user
      </button>

      <AddUserForm />
    </div>
  );
};

export default page;
