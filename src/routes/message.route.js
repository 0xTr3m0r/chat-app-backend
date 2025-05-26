import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { getUserFromSideBar,getMessages } from '../controllers/message.controller.js';


const router = express.Router();

router.get('/user',protectRoute,getUserFromSideBar);
router.get('/:id',protectRoute,getMessages);


export default router;


