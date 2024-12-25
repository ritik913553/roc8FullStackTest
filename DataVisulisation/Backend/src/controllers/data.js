import { SpreadData } from "../models/spreadData.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getFilteredData = asyncHandler(async (req, res) => {
    const { filterAge, filterGender, startDate, endDate } = req.query;
    if (
      [filterAge, filterGender, startDate, endDate].some(
        (field) => !field || field.trim() === ""
      )
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
  
    try {
      const barChartData = await SpreadData.aggregate([
        {
          $match: {
            day: { $gte: new Date(startDate), $lte: new Date(endDate) },
            age: filterAge,
            gender: filterGender,
          },
        },
        {
          $project: {
            day: 1,
            features: [
              { feature: "A", timeSpent: "$A" },
              { feature: "B", timeSpent: "$B" },
              { feature: "C", timeSpent: "$C" },
              { feature: "D", timeSpent: "$D" },
              { feature: "E", timeSpent: "$E" },
              { feature: "F", timeSpent: "$F" },
            ],
          },
        },
        { $unwind: "$features" },
        {
          $group: {
            _id: "$features.feature",
            totalTime: { $sum: "$features.timeSpent" },
          },
        },
        {
          $project: {
            feature: "$_id",
            totalTime: 1,
            _id: 0,
          },
        },
        { $sort: { feature: -1 } },
      ]);
  

      const lineChartData = await SpreadData.aggregate([
        {
          $match: {
            day: { $gte: new Date(startDate), $lte: new Date(endDate) },
            age: filterAge,
            gender: filterGender,
          },
        },
        {
          $project: {
            day: 1,
            features: [
              { feature: "A", timeSpent: "$A" },
              { feature: "B", timeSpent: "$B" },
              { feature: "C", timeSpent: "$C" },
              { feature: "D", timeSpent: "$D" },
              { feature: "E", timeSpent: "$E" },
              { feature: "F", timeSpent: "$F" },
            ],
          },
        },
        { $unwind: "$features" },
        {
          $group: {
            _id: { day: "$day", feature: "$features.feature" },
            totalTime: { $sum: "$features.timeSpent" },
          },
        },
        { $sort: { "_id.day": 1 } },
       
        {
          $project: {
            day: "$_id.day",
            feature: "$_id.feature",
            totalTime: 1,
            _id: 0,
          },
        },
      ]);
  

      return res.status(200).json(
        new ApiResponse(200, "Data fetched successfully", {
          barChart: barChartData,
          lineChart: lineChartData,
        })
      );
    } catch (error) {
      return res.status(500).json({ message: "Error fetching data", error });
    }
  });
  

export { getFilteredData };
