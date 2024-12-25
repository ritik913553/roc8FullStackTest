import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axios";

const SignUp = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/user/register", user);
      navigate("/");
    } catch (error) {
      setError("Sign Up failed. Please check your credentials.");
    }
  };

  return (
    <div className="h-screen w-full bg-gradient-to-r from-cyan-900 to-blue-700 flex flex-col items-center justify-center p-2 ">
      <form
        onSubmit={handleSignUp}
        className="border-2 border-white  flex flex-col items-center justify-center rounded-md p-10 gap-5"
      >
        <h1 className="text-2xl font-bold">Create Your Account</h1>
        <div className="flex flex-col  w-full ">
          <h1 className="font-semibold">Name</h1>
          <input
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            className="bg-inherit border-b-2 placeholder-gray-800 text-black border-black outline-none"
            type="text"
            required={true}
            placeholder="Enter your name"
          />
        </div>
        <div className="flex flex-col  w-full ">
          <h1 className="font-semibold">E-mail Address</h1>
          <input
            required={true}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="bg-inherit border-b-2 placeholder-gray-800 text-black border-black outline-none"
            type="email"
            placeholder="Enter your mail"
          />
        </div>
        <div className="flex flex-col  w-full ">
          <h1 className="font-semibold">Password</h1>
          <input
            required={true}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="bg-inherit border-b-2 placeholder-gray-800 text-black border-black outline-none"
            type="password"
            placeholder="Enter your password"
          />
        </div>

        <div className="flex gap-5 mt-3 ">
          <button
            type="submit"
            className="text-xl px-4 rounded-full bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white"
          >
            Sign Up
          </button>
          <Link
            to={"/"}
            className="text-xl  px-4 rounded-full bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white"
          >
            Sign In
          </Link>
        </div>
        {error && <p className="text-red-500 text-center">{error}</p>}
      </form>
    </div>
  );
};

export default SignUp;
