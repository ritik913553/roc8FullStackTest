import React, { useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../utils/axios.js";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const HandleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/user/login", user, {
        withCredentials: true,
      });
      localStorage.setItem("accessToken", res.data.data.accessToken);
      navigate("/dashboard");
    } catch (error) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="h-screen w-full bg-gradient-to-r from-cyan-900 to-blue-700 flex flex-col items-center justify-center p-2 ">
      <form
        onSubmit={HandleLogin}
        className="border-2 border-white  flex flex-col items-center justify-center rounded-md p-10 gap-5"
      >
        <h1 className="text-2xl font-bold">Login</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <input
          required={true}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          className="bg-inherit border-b-2 text-black border-black p-1 px-4 outline-none"
          type="email"
          placeholder="Email"
        />
        <input
          required={true}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          className="bg-inherit border-b-2 border-black p-1 px-4 outline-none "
          type="password"
          placeholder="Password"
        />
        <button
          type="submit"
          className="text-2xl w-full py-1 rounded-md bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white"
        >
          Login
        </button>
        <p className="text-slate-200">
          Don't have an account?{" "}
          <Link className="border-b-2" to="/signup">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
