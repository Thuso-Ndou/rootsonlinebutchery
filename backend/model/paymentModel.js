import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    price: { type: Number, required: true },
    payment: { type: Boolean, default: false },
    cart_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true }
});

const paymentModel = mongoose.models.Payment || mongoose.model('Payment', paymentSchema);

export default paymentModel;
