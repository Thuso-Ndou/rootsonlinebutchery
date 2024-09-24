import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'meat', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
});

const orderedItemModel = mongoose.models.orderedItem || mongoose.model('OrderedItem', itemSchema);

export default orderedItemModel;
