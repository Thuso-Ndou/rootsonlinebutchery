// addressController.js
import AddressModel from "../model/addressModel.js";

export const createAddress = async (addressData) => {
    try {
        const { userID, firstName, lastName, street, suburb, city, zipCode, province, email, phone } = addressData;

        if (!userID || !firstName || !lastName || !street || !suburb || !city || !zipCode || !province || !email || !phone) {
            return { success: false, message: 'All fields are required' };
        }

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

        await newAddress.save();
        return { success: true, address: newAddress };
    } catch (error) {
        console.error('Error creating address:', error);
        return { success: false, message: 'Error creating address', error: error.message };
    }
};