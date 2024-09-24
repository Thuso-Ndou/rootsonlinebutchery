import meatModel from "../model/meatModel.js";
import fs from 'fs';

// add meat item
const addMeat = async (req , res) => {
    let image_filname = `${req.file.filename}`;
    const meat = new meatModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filname,
    })
    try{
        await meat.save();
        res.json({success:true,message:"Product Added"})
    }
    catch(e){
        console.log(e);
        res.json({success:false,message:"Error Adding"});
    }
}

// meat list
const meatList = async (req,res) => {
    try {
        const meat = await meatModel.find({});
        res.json({success:true,data:meat})
    } catch (e) {
        console.log(e);
        res.json({success:false,message:"Error"})
    }
}

// remove meat
const removeMeat = async (req,res) => {
    try {
        const meat = await  meatModel.findById(req.body.id);
        fs.unlink(`uploads/${meat.image}`,()=>{})
        await meatModel.findByIdAndDelete(req.body.id);
        res.json({success: true,message: 'Product Removed'});
    } catch (error) {
        console.log(error);
        res.json({success: false,message:"Failed to remove"})
    }
}

// Search Products function
const searchProducts = async (req, res) => {
    try {
        const query = req.query.query; // Get the search query from request parameters
        const products = await meatModel.find({ 
            name: { $regex: query, $options: 'i' } // Case-insensitive search for product names
        });
        res.json({ success: true, products });
    } catch (error) {
        console.error("Error searching products:", error);
        res.json({ success: false, message: "Error fetching search results" });
    }
};

export {addMeat,meatList,removeMeat,searchProducts}