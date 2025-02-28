import express from 'express';
import dotenv from 'dotenv';
import connectToMongo from './src/config/connectDB.js';
import customerRoutes from './src/routes/customer.routes.js';
dotenv.config();
import cors from 'cors';
import { app, server } from './src/config/socket.js';
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors("*"));
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/customers",customerRoutes);

server.listen(PORT, () => {
    connectToMongo();
    // generateFakeData();
    console.log(`Server is running on port ${PORT}`);
});

