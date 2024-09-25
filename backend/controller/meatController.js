// Import the meatModel to interact with the meat collection in the database
import meatModel from "../model/meatModel.js";
// Import the fs (File System) module to handle file operations
import fs from 'fs';

// Controller function to add a new meat item
const addMeat = async (req , res) => {
    // Store the uploaded image filename from the request
    let image_filname = `${req.file.filename}`;
    // Create a new meat item using the data from the request body and the image filename
    const meat = new meatModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filname,
    })
    try{
        // Save the new meat item to the database
        await meat.save();
         // Send a success response
        res.json({success:true,message:"Product Added"})
    }
    catch(e){
        // Handle any errors during the save operation
        console.log(e);
         // Send a failure response if an error occurs
        res.json({success:false,message:"Error Adding"});
    }
}

// Controller function to list all meat items
const meatList = async (req,res) => {
    try {
        // Fetch all meat items from the database
        const meat = await meatModel.find({});
        // Send the meat data as a response
        res.json({success:true,data:meat})
    } catch (e) {
        // Handle any errors during the fetch operation
        console.log(e);
        // Send a failure response if an error occurs
        res.json({success:false,message:"Error"})
    }
}

// Controller function to remove a meat item
const removeMeat = async (req,res) => {
    try {
        // Find the meat item by its ID (sent in the request body)
        const meat = await  meatModel.findById(req.body.id);

        // Remove the image file associated with the meat item from the uploads folder
        fs.unlink(`uploads/${meat.image}`,()=>{})

        // Delete the meat item from the database
        await meatModel.findByIdAndDelete(req.body.id);

        // Send a success response after removal
        res.json({success: true,message: 'Product Removed'});
    } catch (error) {
        // Handle any errors during the removal process
        console.log(error);
        // Send a failure response if an error occurs
        res.json({success: false,message:"Failed to remove"})
    }
}

// Export the controller functions so they can be used in routes
export {addMeat,meatList,removeMeat}