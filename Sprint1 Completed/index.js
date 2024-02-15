import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import userRouter from './routes/user_route.js';
import authRouter from './routes/auth.route.js';

// mongoose
//   .connect(process.env.MONGO)
//   .then(() => {
//     console.log('Connected to MongoDB!');
//   })
//   .catch((err) => {
//     console.log(err);
//   });

mongoose.set('strictQuery', false) 
const dbConnection = async () => {
    try {
      await mongoose.connect(process.env.MONGO, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      });
      console.log('MongoDB has started successfully');
    } catch (error) {
      console.error(error);
    }
  };
  dbConnection();

const app = express();

app.use(express.json());

app.listen(3000, () => {
    console.log('Server is running on port 3000!!');
  }
  );

  app.use("/api/user",userRouter);
  app.use("/api/auth",authRouter);

  app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
});
