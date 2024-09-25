import express from "express";
import cors from "cors";
import { connDB } from './config/db.js';
import meatRouter from "./routes/meatRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoutes.js";
import 'dotenv/config';
import orderRouter from "./routes/orderRoute.js";
import addressRouter from "./routes/addressRoute.js";
import authMiddleWare from "./middleware/auth.js";
import product from "./model/meatModel.js";
import user from "./model/userModel.js";
import address from "./model/addressModel.js";
import order from "./model/orderModel.js";

// app config
const app = express();
const port = 4000;

// middleware
app.use(express.json()) 
// access any backend from frontend
app.use(cors());

// connect to dabase
connDB();

// API end point
app.use("/api/meat", meatRouter);
app.use("/images",express.static('uploads'));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/address", addressRouter);

// product search api
app.get("/search/:key", async (req, res) => {
    let data = await product.find(
        {
            "$or":[
                {name: {$regex:req.params.key,$options: 'i'}},
                {description: {$regex:req.params.key,$options: 'i'}},
                {category: {$regex:req.params.key,$options: 'i'}}
            ]
    });
    res.send(data);
});

// api for counting products
app.get("/reports/productCount", async (req, res) => {
    try {
        const productCount = await product.countDocuments();
        res.status(200).json({ productCount });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch product count" });
    }
});

// API for counting category
app.get("/reports/categoryCount", async (req, res) => {
    try {
        // Retrieve distinct categories and count them
        const distinctCategories = await product.distinct("category");
        const categoryCount = distinctCategories.length; // Count the distinct categories
        res.status(200).json({ categoryCount });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch category count" });
    }
});

//api for counting customers
app.get("/reports/customerCount", async (req, res) => {
    try {
        const customerCount = await user.countDocuments();
        res.status(200).json({ customerCount });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch customer count" });
    }
});

// api for revenue
app.get("/reports/revenue", async (req, res) => {
    try {
        const totalRevenue = await order.aggregate([
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);
        const revenue = totalRevenue.length ? totalRevenue[0].total : 0;
        res.status(200).json({ revenue });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch revenue" });
    }
});

// api for getting address
app.get("/reports/provinceData", async (req, res) => {
    try {
        const provinceData = await address.aggregate([
            {
                $group: {
                    _id: "$province",
                    order: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    name: "$_id", // Rename _id to name for the chart's X-axis
                    order: "$order"
                }
            }
        ]);
        res.status(200).json(provinceData);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch province data" });
    }
});


// test API
app.get("/", (req, res) => {
    res.send("API Working")
})

// server status
app.listen(port, (req, res) => {
    console.log(`Server running on http://localhost:${port}` );
})
