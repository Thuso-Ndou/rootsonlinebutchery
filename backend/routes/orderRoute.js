import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { placeOrder, verifyOrder } from '../controller/orderController.js';

const orderRouter = express.Router();

// end point
orderRouter.post('/place', authMiddleware, placeOrder);
orderRouter.post("/verify", verifyOrder);

export default orderRouter;