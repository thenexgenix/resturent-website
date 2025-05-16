import "dotenv/config";
import express from "express";
import cors from "cors";
import foodRouter from "../Routes/food.routes.js";
import userRouter from "../Routes/user.routes.js";

//initialize express app
const app = express();
//mddleware
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/images", express.static("upload"));

// food listing routes
app.use("/api/v1/foods", foodRouter);

//user authencation routes
app.use("/api/v1/user", userRouter);

export default app;
