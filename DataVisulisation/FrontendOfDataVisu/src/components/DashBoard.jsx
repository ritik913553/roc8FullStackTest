import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axios";
import { useNavigate, useLocation } from "react-router-dom";
import BarChart from "./BarChart";
import LineChart from "./LineChart";

const DashBoard = () => {
  const [filterAge, setFilterAge] = useState(">25");
  const [filterGender, setFilterGender] = useState("Male");
  const [startDate, setStartDate] = useState("2022-10-04");
  const [endDate, setEndDate] = useState("2022-10-29");
  const navigate = useNavigate();
  const location = useLocation();
  const [barChartData, setBarChartData] = useState([]);
  const [lineChartData, setlineChartData] = useState([]);
  const [selectedFeature, setSelectedFeature] = useState(null);

  useEffect(()=>{
    if(!localStorage.getItem("accessToken")){
      navigate("/");
    }
  })


  const handleLogout = async () => {
    try {
      await axiosInstance.post("/user/logout");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      localStorage.removeItem("accessToken");
      navigate("/");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const query = new URLSearchParams({
      filterAge,
      filterGender,
      startDate,
      endDate,
    }).toString();

    navigate(`/dashboard?${query}`);
  };

  const handleBarHover = (feature) => {
    setSelectedFeature(feature);
  };

  useEffect(() => {
    const fetchFilteredData = async () => {
      const query =
        location.search ||
        "?" +
          new URLSearchParams({
            filterAge,
            filterGender,
            startDate,
            endDate,
          }).toString();
      

      try {
        const res = await axiosInstance.get(`/data/filter${query}`);
        console.log(res.data.data);
        if (res.data.data && res.data.data.barChart.length>0 ) {
          setBarChartData(res.data.data.barChart);
        } 
        else {
          setBarChartData([]); // Fallback in case of missing data
        }

        if(res.data.data && res.data.data.lineChart.length>0 ){
          setlineChartData(res.data.data.lineChart);
        }
        else{
          setlineChartData([]); // Fallback in case of missing
        }
        navigate(`/dashboard${query}`);
      } catch (error) {
        console.error("Failed to fetch filtered data:", error);
      }
    };

    fetchFilteredData();
  }, [location.search, filterAge, filterGender, startDate, endDate]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-blue-900 to-blue-700 p-2 ">
      <header className="flex justify-between items-center p-2">
        <h1 className="text-xl text-white text-center">Welcome 👋</h1>
        <button
          onClick={handleLogout}
          type="submit"
          className="text-2xl px-3 rounded-md bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white"
        >
          Logout
        </button>
      </header>
      <form
        onSubmit={handleSearch}
        className="flex gap-5 flex-wrap items-center mt-10"
      >
        <select
          value={filterAge}
          onChange={(e) => setFilterAge(e.target.value)}
        >
          <option value="15-25">15-25</option>
          <option value=">25">25</option>
        </select>
        <select
          value={filterGender}
          onChange={(e) => setFilterGender(e.target.value)}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button className="px-2 bg-blue-300 rounded-md" type="submit">
          Search
        </button>
      </form>
      <div className="mt-10 flex flex-col lg:flex lg:flex-row gap-2 lg:mt-20 lg:h-92">
        <BarChart Bardata={barChartData} onBarHover={handleBarHover} />
        {selectedFeature && (
          <LineChart
            LineData={lineChartData.filter(
              (item) => item.feature === selectedFeature
            )}
          />
        )}
      </div>
    </div>
  );
};

export default DashBoard;
