import 'dotenv/config'
import express from "express";
import cors from "cors";

//initialize express app
const app = express();
//mddleware
app.use(cors());
app.use(express.json());

//test routes
app.post("/", (req, res) => {
  const { name, age } = req.body;
  if (!name || !age) {
    return res.status(400).json({ message: "Please provide name and age" });
  }
  return res
    .status(200)
    .json({ message: `Hello ${name}, you are ${age} years old` });
});
export default app;
