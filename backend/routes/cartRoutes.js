import express from 'express';
import { addToCart,removeFromCart,getCart } from '../controller/cartController.js';
import authMiddleWare from '../middleware/auth.js';

const cartRouter = express.Router();

// end points
cartRouter.post('/add',authMiddleWare,addToCart);
cartRouter.post('/remove',authMiddleWare,removeFromCart);
cartRouter.post('/get',authMiddleWare,getCart);

export default cartRouter;