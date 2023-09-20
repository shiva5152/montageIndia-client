"use client";
import React, { useState } from "react";
import { signUp } from "@/config/auth";

function MyForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
    mediaType: "",
    category: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      alert("email or password is not provided");
      return;
    }
    const result = await signUp(formData.email, formData.password);
    if (!result) {
      alert("something went wrong");
      return;
    }
    const { user } = result;
    const apiBody = {
      email: user.email,
      uid: user.uid,
      avatar: user.photoURL || "none",
      name: user.displayName || "none",
      role: "",
      category: "",
      mediaType: "",
    };
    if (!formData.role || !formData.category || !formData.mediaType) {
      alert("please provide all values");
      return;
    }
    (apiBody.role = formData.role),
      (apiBody.category = formData.category),
      (apiBody.mediaType = formData.mediaType),
      console.log(formData);
  };

  return (
    <div className="max-w-md mx-auto mt-4 p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-600">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-600">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="role" className="block text-gray-600">
            Role:
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:border-blue-500"
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="user">Vendor</option>
            {/* Add more options as needed */}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="mediaType" className="block text-gray-600">
            Media Type:
          </label>
          <select
            id="mediaType"
            name="mediaType"
            value={formData.mediaType}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:border-blue-500"
          >
            <option value="">Select Media Type</option>
            <option value="image">Image</option>
            <option value="video">Video</option>
            <option value="video">Audio</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-600">
            Category:
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:border-blue-500"
          >
            <option value="">Select Category</option>
            <option value="music">Nature</option>
            <option value="sports">Sports</option>
            <option value="sports">Vibe</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default MyForm;
