// addressController.js
// Import the Address model from the addressModel.js file
import AddressModel from "../model/addressModel.js";

// Function to create a new address entry
export const createAddress = async (addressData) => {
    try {
        // Destructure the required fields from the incoming addressData object
        const { userID, firstName, lastName, street, suburb, city, zipCode, province, email, phone } = addressData;

        // Check if any of the required fields are missing
        // If any field is missing, return a failure response with a message
        if (!userID || !firstName || !lastName || !street || !suburb || !city || !zipCode || !province || !email || !phone) {
            return { success: false, message: 'All fields are required' };
        }

        // Create a new address instance using the AddressModel
        const newAddress = new AddressModel({
            userID,
            firstName,
            lastName,
            street,
            suburb,
            city,
            zipCode,
            province,
            email,
            phone
        });

        // Save the new address to the database
        await newAddress.save();
        // Return a success response with the newly created address
        return { success: true, address: newAddress };
    } catch (error) {
        // Log the error if an issue occurs during address creation
        console.error('Error creating address:', error);
         // Return a failure response with an error message
        return { success: false, message: 'Error creating address', error: error.message };
    }
};