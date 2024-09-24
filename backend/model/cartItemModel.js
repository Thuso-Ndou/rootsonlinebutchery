import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'meat', required: true },
    quantity: { type: Number, required: true, default: 1 }
});

const cartItemModel = mongoose.models.cartItem || mongoose.model('CartItem', cartItemSchema);

export default cartItemModel;
