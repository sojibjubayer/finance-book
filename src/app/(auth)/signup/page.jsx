"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }
    const newUser = {
      name,
      email,
      password,
      role: "user",
    };

    try {
      const resp = await fetch(`http://localhost:3000/signup/api`, {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
          "content-type": "application/json",
        },
      });

      if (resp.status === 200) {
        setLoading(false);
        toast.success("Successfully Signed Up");
        e.target.reset();
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
      if (resp.status === 409) {
        setLoading(false);
        toast("User exist with same email");
      }
    } catch (error) {
      toast.error("An error occurred during sign up");
    }
  };

  return (
    <div className="px-4 py-6 md:w-[40%] md:mx-auto mx-2 bg-gray-50 shadow-md rounded-md mt-10 mb-20 ">
      <form onSubmit={handleSubmit} className="space-y-6 ">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Signup
        </h2>
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-1 text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="border rounded-md p-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-1 text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="border rounded-md p-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="mb-1 text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="border rounded-md p-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            placeholder="Enter your password"
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-medium py-2 rounded-md focus:ring-2 focus:ring-yellow-300 focus:outline-none transition"
            onClick={() => setLoading(true)}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
        <div className="text-center text-sm">
          Have an account?{" "}
          <Link href="/login" className="text-blue-600 font-semibold">
            Login here
          </Link>
        </div>
      </form>
      <Toaster />
    </div>
  );
};

export default SignUp;
