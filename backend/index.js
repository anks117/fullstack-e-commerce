import express from "express";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import cors from 'cors';
import mainRouter from './routes/index.js'


const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static('dist'));
app.use(cookieParser());
app.use(cors({
    origin: '*',  // Allow all origins
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true  // Allow cookies and other credentials
}))
dotenv.config();



app.use('/api/v1',mainRouter);

const port=process.env.PORT || 3000
connectDB();

app.listen(port,()=> console.log("Server running on port : "+port))