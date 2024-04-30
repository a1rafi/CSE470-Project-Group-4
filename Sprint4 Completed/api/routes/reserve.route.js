import express from 'express';
import { createReservation } from '../controllers/reserve.controller.js';
import { verifyToken } from '../utilities/userVerify.js';

const router = express.Router();

router.post('/createreserve', verifyToken,createReservation);

export default router;
