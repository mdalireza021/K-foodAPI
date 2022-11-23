import express from 'express';
import { addFood,getAllFoods,getOneFood,homepage } from '../controllers/user.controller.js';
import multer from 'multer';
import { upload } from '../controllers/user.controller.js';
import path from 'path';
const routers =express.Router();

routers.get('/',homepage);
routers.get('/getall',getAllFoods);
routers.get('/:id',getOneFood);






routers.post('/',upload.single("image"),addFood);

export default routers;