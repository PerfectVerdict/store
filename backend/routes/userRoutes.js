import express from "express";
import { createUser } from "../controllers/userConroller.js" 
const router = express.Router()



router.route('/').post(createUser);

export default router;