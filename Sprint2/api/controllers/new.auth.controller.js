import User from "../database/userdata.js";
import bcryptjs from "bcryptjs";
import {errorHandler} from '../utilities/errorhandle.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcryptjs.hashSync(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashedPassword});
    try {
        await newUser.save();
        res.status(201).json('User created successfully!');
    } catch (error) {
        next(errorHandler(550, 'error from the function'));
    }
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });

        if (!validUser) {
            return next(errorHandler(550, 'User not found'));
        }
        const validPassword = await bcryptjs.compare(password, validUser.password); 

        if (!validPassword) {
            return next(errorHandler(550, 'Invalid password, please check again.'));
        }
        const token = jwt.sign({ email: validUser.email, id: validUser._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest} = validUser._doc;
        res
        .cookie('acc_token', token, { httpOnly: true }).status(200).json({rest});
    } 
    catch (error) {
        next(errorHandler(550, 'error from the function'));
    }
};

export const google = async (req, res, next) => {
    try{
        const user = await User.findOne({email:req.body.email})
        if (user) {
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
            const { password: pass, ...rest } = user._doc;
            res
              .cookie('access_token', token, {httpOnly: true})
              .status(200)
              .json(rest);
        }   else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User({ username: req.body.name.split(" ").join("").
            toLowerCase() + Math.random().toString(36).slice(-4), 
            email: req.body.email, password: hashedPassword, avatar: req.body.photo});
            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const {password: pass, ...rest} = newUser._doc;
            res.cookie('access_token', token, {httpOnly: true}).status(200).json(rest);


        }
    } catch (error) {
        next(error)
    }
}