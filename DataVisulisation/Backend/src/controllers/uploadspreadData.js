import { asyncHandler } from "../utils/asyncHandler.js";
import { google } from "googleapis";
import { SpreadData } from "../models/spreadData.model.js";

const uploadspreadData = asyncHandler(async (req, res) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: "../../sonic-terrain-445306-g2-40d4100dfa65.json",
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  const spreadsheetId = "1l7GstWHc69HPV0irSdvoMIyHgtufUPKsbtCiNw7IKR0";
  const range = "Sheet3";

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = response.data.values;

    if (rows && rows.length) {
      
      const header = rows[0];
      const dataRows = rows.slice(1);

      const dataToInsert = dataRows.map((row) => {

        const dateParts = row[0].split("/"); 
        const day = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`); // Convert to YYYY-MM-DD format

        if (isNaN(day)) {
          console.error("Invalid date:", row[0]);
          return null;
        }

        return {
          day: day, 
          age: row[1], 
          gender: row[2], 
          A: Number(row[3]), 
          B: Number(row[4]),
          C: Number(row[5]),
          D: Number(row[6]), 
          E: Number(row[7]), 
          F: Number(row[8]),
        };
      });

      await SpreadData.insertMany(dataToInsert);

      res.status(200).json({
        success: true,
        message: "Data successfully uploaded to the database",
        insertedCount: dataToInsert.length,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No data found in the specified range",
      });
    }
  } catch (error) {
    console.error("Error processing Google Sheet:", error.message);
    res.status(500).json({
      success: false,
      message: "Error processing Google Sheet",
      error: error.message,
    });
  }
});

export { uploadspreadData };
