// addressRoutes.js
import express from 'express';
import { createAddress } from '../controller/addressController.js';
import authMiddleware from '../middleware/auth.js';

const addressRouter = express.Router();

addressRouter.post('/create', authMiddleware, (req, res, next) => {
    console.log('Create address route hit'); // Add this line
    next();
}, createAddress);

export default addressRouter;
