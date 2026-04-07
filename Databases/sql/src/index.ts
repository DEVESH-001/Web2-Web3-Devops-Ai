//https://node-postgres.com/

import pg = require("pg");
import express = require("express");

const app = express();

const pgClient = new pg.Client({
  user: "neondb_owner",
  password: "npg_szvO1UK4TbLg",
  host: "ep-blue-paper-anxp2zo7-pooler.c-6.us-east-1.aws.neon.tech",
  database: "neondb",
  port: 5432,
  ssl: true,
});

async function main() {
  await pgClient.connect();
  console.log("Connected to database");
  const response = await pgClient.query("SELECT * FROM users");
  const updateUser = await pgClient.query(
    "UPDATE users SET username = 'kirat' WHERE id = 4",
  );
  console.log(response.rows);
}

app.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;



  const response = await pgClient.query(
    `INSERT INTO users (username,email,password) VALUES (${username},${email},${password})`,
  );
  res.json({ message: "You have signed-up" });
});

main();
