import express from "express";
import { createClient } from "redis";

const app = express();
app.use(express.json());

const client = createClient();
client.on("error", (err) => console.error("Redis Client Error", err));

// Connect to Redis before starting server
await client.connect();

app.post("/submit", async (req, res) => {
  const { problemId, userId, code, language } = req.body;
  //push this to a database prisma.submission.create()
  try {
    await client.lPush(
      "submission",
      JSON.stringify({ problemId, userId, code, language }),
    );
    res.json({ message: "Submission received" });
  } catch (error) {
    console.error("Redis push error:", error);
    res.status(500).json({ error: "Failed to process submission" });
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
  console.log("Redis client connected");
});
