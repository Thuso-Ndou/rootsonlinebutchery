import userModel from "../model/userModel.js"; // Import the user model to interact with the database
import jwt from 'jsonwebtoken'; // Import JWT to handle token creation 
import bcrypt from 'bcrypt'; // Import bcrypt to hash and compare passwords securely
import validator from 'validator'; // Import validator to validate email formats


// Controller function for user login 
const userLogin = async (req, res) => {
    // Extract email and password from the request body
    const {email, password} = req.body; 
    try {
        // Find the user in the database by email
        const user = await userModel.findOne({email});

        // Check if the email is registered
        if(!user){
            return res.json({success: false, message:"User not found"})
        }

        // Compare the input password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.json({success: false, message:"Incorrect password"});
        }

        // If the password matches, generate a JWT token for the user
        const token = createToken(user._id);
        // Send the token as a response
        res.json({success: true, token}); 
    } catch (error) {
        // Handle any errors that occur during login
        console.log(error);
        res.json({success: false, message:"Login failed"});
    }
}

// Function to create a JWT token for the user 
const createToken = (id) => {
    // Sign a token with the user ID and secret
    return jwt.sign({id},process.env.JWT_SECRET)
}

// Controller function for user signup
const userSignup = async (req, res) => {
    // Extract name, password, and email from the request body
    const {name, password, email} = req.body;
    try {
        // Check if the user with the given email already exists
        const exists = await userModel.findOne({email})
        if(exists){
            return res.json({success: false, message:"Email already exists"});
        }

        // Validate the email format using the validator library
        if(!validator.isEmail(email)){
            return res.json({success: false, message:"Invalid email"});
        }

        // Ensure the password length is at least 8 characters
        if(password.length < 8){
            return res.json({success: false, message:"Please enter a strong password"});
        }

        // Hash the password using bcrypt for security
        const salt = await bcrypt.genSalt(10); // Generate a salt with 10 rounds
        const hashedPassword = await bcrypt.hash(password,salt); // Hash the password with the generated salt

        // Create a new user with the provided information
        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword // Store the hashed password
        });

        // Save the new user to the database
        const user = await newUser.save();
        // Generate a JWT token for the newly created user
        const token = createToken(user._id);

        // Send the token as a response
        res.json({success: true,token});

    } catch (error) {
        // Handle any errors that occur during signup
        console.log(error);
        res.json({success: false,message:"Failed to signup"})
    }
}

// Export the login and signup controller functions
export {userLogin, userSignup}