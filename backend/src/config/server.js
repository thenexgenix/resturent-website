import dotenv from "dotenv";
import http from "http";
import db from "../db/db.js";
import app from "./app.js";
dotenv.config();

const PORT = process.env.PORT || 8001;
// import express app
const server = http.createServer(app);

//listern to port number
server.listen(PORT, () => {
  //connect the database
  const connect = db();
  if (connect) {
    console.log("Database connected successfully");
  } else {
    console.log("Database connection failed");
  }
  console.log(`Server is running on port http://localhost:${PORT}`);
}); 
// export default server
export default server;
