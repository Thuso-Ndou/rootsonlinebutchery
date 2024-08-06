import userModel from "../model/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';

// login 
const userLogin = async (req, res) => {

}

// create token 
const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}

// sign up
const userSignup = async (req, res) => {
    const {name, password, email} = req.body;
    try {
        // checking if the user is already signed up
        const exists = await userModel.findOne({email})
        if(exists){
            return res.json({success: false, message:"Email already exists"});
        }

        // validating email and password
        if(!validator.isEmail(email)){
            return res.json({success: false, message:"Invalid email"});
        }

        // checking password length
        if(password.length < 8){
            return res.json({success: false, message:"Please enter a strong password"});
        }

        // hash user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        //create account
        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        });

        // save account in the database
        const user = await newUser.save();
        const token = createToken(user._id);

        // send token as a response
        res.json({success: true,token});

    } catch (error) {
        console.log(error);
        res.json({success: false,message:"Error saving account"})
    }
}

export {userLogin, userSignup}