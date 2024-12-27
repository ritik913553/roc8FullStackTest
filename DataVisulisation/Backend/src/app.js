import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv';

dotenv.config();
const app = express()



app.use(cors({
    origin:["http://localhost:5173","https://data-visulization-app.vercel.app"],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
}))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');
    res.header('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204); // Send a response to the preflight request
    }
    next();
});

app.use((req, res, next) => {
    console.log('Request URL:', req.url);
    console.log('Request Method:', req.method);
    console.log('Request Headers:', req.headers);
    next();
});


app.options('*', cors());



app.use(express.json({limit: "16kb"}));
app.use(cookieParser());

app.use(express.urlencoded({extended: true,limit:"16kb"})); 
app.use(express.static("public"))

//testing
app.use((req, res, next) => {
    console.log('Request Origin:', req.headers.origin);
    console.log('Request Method:', req.method);
    console.log('Request Headers:', req.headers);
    next();
});

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