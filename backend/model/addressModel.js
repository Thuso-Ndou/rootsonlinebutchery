import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    street: { type: String, required: true },
    suburb: { type: String, required: true},
    city: { type: String, required: true },
    province: { type: String, required: true },
    zipCode: { type: String, required: true },
    email: { type: String, required: true},
    phone: { type: String, required: true}
});

const addressModel = mongoose.models.address || mongoose.model('Address', addressSchema);

export default addressModel;
