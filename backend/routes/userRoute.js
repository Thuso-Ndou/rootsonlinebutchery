import express from 'express';
import { userLogin,userSignup } from '../controller/userController.js';

// user router using express server
const userRouter = express.Router();

// api end points
userRouter.post('/signup', userSignup);
userRouter.post('/login', userLogin);

export default userRouter;