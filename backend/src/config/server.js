/**
 * @file server.js
 * @description Main server file for initializing the HTTP server, connecting to the database, and starting the application.
 * @date 2023-10-06
 */

import "dotenv/config";
import http from "http";
import db from "../db/db.js";
import app from "./app.js";

const PORT = process.env.PORT || 8001;
// import express app
const server = http.createServer(app);

//listen to port number
server.listen(PORT, async () => {
  try {
    //connect the database
    await db();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit(1); // Exit the process if the database connection fails
  }
  console.log(`Server is running on port http://localhost:${PORT}`);
});
// export default server
export default server;
