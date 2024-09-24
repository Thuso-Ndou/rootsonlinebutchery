import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'meat', required: true },
    quantity: { type: Number, required: true },
});

const orderItemModel = mongoose.models.OrderItem || mongoose.model('OrderItem', orderItemSchema);
export default orderItemModel;