//require("dotenv").config();
import { Pool } from "pg";
import "dotenv/config";
//const { pool } = require("pg");
export const pool = new Pool({
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
});
