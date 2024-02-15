import User from "../database/userdata.js";
import bcryptjs from "bcryptjs";
import {errorHandler} from '../utilities/errorhandle.js';

export const SignUp = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcryptjs.hash(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashedPassword});
    try {
        await newUser.save();
        res.status(201).json('User created successfully!');
    } catch (error) {
        next(errorHandler(550,'error from the function'));
    }
};