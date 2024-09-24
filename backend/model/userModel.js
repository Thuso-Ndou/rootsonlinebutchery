import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {type:String, required:true},
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true},
},{minimize:false});// for the cart to be created

// if the model is not yet created then create it
const userModel = mongoose.models.user || mongoose.model('User',userSchema);

export default userModel;