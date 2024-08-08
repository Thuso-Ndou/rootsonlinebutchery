import express from 'express';
import { addToCart,removeFromCart,getCart } from '../controller/cartController.js';

const cartRouter = express.Router();

// end points
cartRouter.post('/add', addToCart);
cartRouter.post('/remove', removeFromCart);
cartRouter.post('/get', getCart);

export default cartRouter;