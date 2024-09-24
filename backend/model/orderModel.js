import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OrderItem', required: true }], // Reference to OrderItem
    amount: { type: Number, required: true },
    address: { type: mongoose.Schema.Types.ObjectId, ref: 'Address', required: true },
    status: { type: String, default: "Food Packaging" },
    payment: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment', default: null },
    createdAt: { type: Date, default: Date.now }
});

const orderModel = mongoose.models.Order || mongoose.model('Order', orderSchema);
export default orderModel;