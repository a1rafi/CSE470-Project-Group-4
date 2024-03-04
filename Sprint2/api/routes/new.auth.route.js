import express from 'express';
import { google, signin, signup } from '../controllers/new.auth.controller.js';

const router = express.Router();

router.post("/SignUp", signup);
router.post("/Signin", signin);
router.post("/google", google);
export default router;