import mongoose from "mongoose";

export const connDB = async () => {
    await mongoose.connect('mongodb+srv://**********@cluster0.n3anfx2.mongodb.net/rootsonlinebutchery').then(()=>console.log("Connected to MongoDB"));
}
