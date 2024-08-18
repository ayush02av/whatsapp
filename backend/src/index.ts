import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

import authRouter from './routers/auth';

const app = express();

app.use(cors({
    origin: '*',
    methods: '*',
    allowedHeaders: '*',
    credentials: true,
    optionsSuccessStatus: 200
}));
app.use(express.json());

app.use("/auth", authRouter);

const port = process.env.PORT ?? 3000;
app.listen(port, function () {
    console.log(`Server is running on port ${port}`);
});