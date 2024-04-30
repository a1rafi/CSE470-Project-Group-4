import express from 'express';
import { createReservation, getReservationHistory, deleteReservation } from '../controllers/reserve.controller.js';
import { verifyToken } from '../utilities/userVerify.js';

const router = express.Router();

router.post('/createreserve', createReservation);
router.get('/getreserve/:id', getReservationHistory);
router.delete('/deletereserve/:id', deleteReservation);


export default router;
