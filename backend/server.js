import express from "express";
import cors from "cors";
import { connDB } from './config/db.js';

// app config
const app = express();
const port = 4000;

// middleware
app.use(express.json()) 
// access any backend from frontend
app.use(cors());

// connect to dabase
connDB();

// test API
app.get("/", (req, res) => {
    res.send("API Working")
})

// server status
app.listen(port, (req, res) => {
    console.log(`Server running on http://localhost:${port}` );
})

//mongodb+srv://thusondou:thusoND@21@cluster0.n3anfx2.mongodb.net/?
