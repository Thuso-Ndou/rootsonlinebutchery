import mongoose from "mongoose";

// describe meat products
const meatSchema = new mongoose.Schema({
    name: {type:String, required:true},
    description: {type:String, required:true},
    price: {type:Number, required:true},
    image: {type:String, required:true},
    category: {type:String, required:true},
})

const meatModel = mongoose.models.meat || mongoose.model("meat",meatSchema);

export default meatModel;