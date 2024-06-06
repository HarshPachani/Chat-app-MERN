import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from './utils/features.js';
import { errorMiddleware } from './middlewares/error.js'
import cookieParser from 'cookie-parser';

import userRoute from './routes/user.js';
import chatRoute from './routes/chat.js';

dotenv.config({
    path: './.env'
})
connectDb()

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/user', userRoute)
app.use('/api/v1/chat', chatRoute)

app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
})