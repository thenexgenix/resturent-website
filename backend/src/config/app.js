import 'dotenv/config'
import express from "express";
import cors from "cors";
import foodRouter from '../Routes/food.routes';

//initialize express app
const app = express();
//mddleware
app.use(cors());
app.use(express.json());

// food listing routes
app.use("/api/foods", foodRouter)

export default app;
