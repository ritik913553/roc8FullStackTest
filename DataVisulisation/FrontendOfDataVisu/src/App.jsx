import React, { useEffect } from "react";
import Login from "./components/AuthComponent/Login";
import {Routes, Route, useNavigate} from "react-router-dom";
import SignUp from "./components/AuthComponent/SignUp";
import DashBoard from "./components/DashBoard";
import Cookies from "js-cookie";

const App = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("accessToken"); 
    if (!token) {
      if(localStorage.getItem("accessToken")){
        navigate("/dashboard");
      }
    }
    else{
      navigate("/dashboard");
    }
  }, [navigate]);


  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<DashBoard />} />
      </Routes>
    </>
  );
};

export default App;
