import express from 'express';
import { SignUp } from '../controllers/new.auth.controller.js';

const router = express.Router();

router.post('/SignUp', SignUp);
export default router;