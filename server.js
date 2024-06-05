import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from './utils/features.js';

dotenv.config({
    path: './.env'
})
connectDb()

const app = express();
const PORT = process.env.PORT || 8000;



app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
})