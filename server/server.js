import cookieParser from "cookie-parser";
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from "./configs/db.js";
import connectCloudinary from './configs/cloudinary.js';

// app config
const app = express();
const port = process.env.PORT || 3000;

await connectDB()
await connectCloudinary()

// Allow multiple origins
const allowedOrigins = ['http://localhost:5173']

// Middleware configuration
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrigins, credentials: true}));

// api endpoints


app.get('/', (req, res)=> res.send('API is Working'));

app.listen(port, ()=> {
    console.log(`Server is running on http://localhost:${port}`)
})
