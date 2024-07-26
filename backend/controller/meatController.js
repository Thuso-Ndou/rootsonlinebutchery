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
        res.json({success:true,message:"Meat Saved"})
    }
    catch(e){
        console.log(e);
        res.json({success:false,message:"Error Saving"});
    }
}

export {addMeat}