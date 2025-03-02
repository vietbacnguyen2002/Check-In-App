import express from "express";
import dotenv from "dotenv";
import connectToMongo from "./src/config/connectDB.js";
import customerRoutes from "./src/routes/customer.routes.js";
import authRoutes from "./src/routes/auth.routes.js";
dotenv.config();
import cors from "cors";
import { app, server } from "./src/config/socket.js";
import helmet from "helmet";
import compression from "compression";
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors("*"));
app.use(helmet());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/customers", customerRoutes);
app.use("/api/v1/auth", authRoutes);
app.use(
  compression({
    level: 6,
    threshold: 1024,
  })
);

app.use("/", (req, res) => {
  res.send("Welcome to Check-in API");
});

server.listen(PORT, () => {
  connectToMongo();
  // generateFakeData();
  console.log(`Server is running on port ${PORT}`);
});
