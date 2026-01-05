import { config } from "dotenv";
import express from "express";
config();
import pg from "./config/config.js";

const app = express();
app.use(express.json());
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
