import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true,limit:"16kb"})); 
app.use(express.static("public"))
app.use(cookieParser());


//routes import
import uploadRoute from "./routes/upload.route.js";
import { asyncHandler } from './utils/asyncHandler.js'
import userRoute from './routes/user.route.js'
import dataRoute from './routes/data.route.js'

//routes declaration
app.use("/api/v1/admin",uploadRoute);
app.use("/api/v1/user",userRoute);
app.use("/api/v1/data",dataRoute);

app.get("/", asyncHandler((req, res) => {
    res.send("Hello World");
}))

export {app}