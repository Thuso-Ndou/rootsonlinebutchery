import mongoose from "mongoose";

export const connDB = async () => {
    await mongoose.connect('mongodb+srv://thusondou:thusoND21@cluster0.n3anfx2.mongodb.net/rootsonlinebutchery').then(()=>console.log("Connected to MongoDB"));
}