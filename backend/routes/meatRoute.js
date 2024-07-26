import express from 'express';
import  {addMeat} from '../controller/meatController.js';
import multer from 'multer';

// get post methods
const meatRouter = express.Router();

// image storage
const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`);
    }
});

// store on the upload folder
const upload = multer({storage: storage});

meatRouter.post("/add",upload.single("image"),addMeat);

export default meatRouter;
