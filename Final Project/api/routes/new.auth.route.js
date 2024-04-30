import express from 'express';
import { adminsignOut, adminsignin, adminsignup, google, signOut, signin, signup } from '../controllers/new.auth.controller.js';

const router = express.Router();

router.post("/SignUp", signup);
router.post("/Signin", signin);
router.post("/google", google);
router.get('/signout', signOut); 

router.post("/adminSignUp", adminsignup);
router.post("/adminSignin", adminsignin);
router.get('/adminsignout', adminsignOut);

export default router;