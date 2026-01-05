import { config } from "dotenv";
import { Pool } from "pg";
config();

const pg = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
});

async function start_server() {
  try {
    await pg.connect();
    console.log("Database connected");
  } catch (error) {
    console.error("Error occured with connecting database", error.message);
  }
}

start_server();

export default pg;
