import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan'; // For logging HTTP requests
import mongoose from 'mongoose'; // To connect to MongoDB
import connectDb from './config/connectDb.js';
import Authrouter from './Routes/user.router.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from "./config/swaggerConfig.js";
import swaggerDocument from "./config/swaggerDocument.js";
import cookieParser from 'cookie-parser';
import categoryRouter from './Routes/category.router.js';
import articleRouter from './Routes/article.router.js';
import commentRouter from './Routes/comment.router.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev')); 
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));




app.use('/api',Authrouter)
app.use('/api', categoryRouter);
app.use('/api', articleRouter);
app.use('/api',commentRouter)

const combinedSwaggerSpec = {
  ...swaggerSpec,
  ...swaggerDocument
}

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(combinedSwaggerSpec));


// 404 route handler
app.use((req, res, next) => {
  res.status(404).send('Route not found');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} and connected to MongoDB`);
  });
});
