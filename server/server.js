import express from "express";
import { promises as fs } from "fs";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
import pg from "pg";

dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const collectionName = process.env.MONGO_DB_COLLECTION;

const { Pool } = pg;
// PostgreSQL pool configuration
const pool = new Pool({
  user: "postgres",
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: "postgres",
  port: 5432,
});

const app = express();
app.use(cors());
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

app.post("/socks/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query(
      "SELECT uid FROM users WHERE username = $1 AND password = $2",
      [username, password]
    );
    if (result.rows.length > 0) {
      res.status(200).json({ uid: result.rows[0].uid });
    } else {
      res.status(401).json({ message: "Authentication failed" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Endpoint to read and send JSON file content
app.get("/socks", async (req, res) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const socks = await collection.find({}).toArray();
    res.json(socks);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Hmmm, something smells... No socks for you! ☹");
  }
});

app.get("/socks/:color", async (req, res) => {
  try {
    // Console log the entire request object
    // console.log(req);

    // // Console log specific parts of the request
    // console.log("Headers:", req.headers);
    // console.log("URL:", req.url);
    // console.log("Method:", req.method);
    // console.log("Query parameters:", req.query);

    const { color } = req.params;

    const data = await fs.readFile("../data/socks.json", "utf8");
    const jsonObj = JSON.parse(data);
    const filtered = jsonObj.filter(
      (sock) => sock.color.toLowerCase() === color
    );
    if (filtered.length < 1) return res.status(404).send("no socks found :(");
    res.json(filtered);
    // const filteredJSON = JSON.stringify(filtered)
    // res.status(200).send(filteredJSON)
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Hmmm, something smells... No socks for you! ☹");
  }
});

app.post("/socks/search", async (req, res) => {
  try {
    // TODO: Add code that can search MongoDB based on a color value
    // from the Search text box.
    // grab the search input
    const query = req.body.searchTerm;
    //return console.log(1)
    const client = await MongoClient.connect(url);
    //return console.log('h')
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const socks = await collection
      .find({ "sockDetails.color": query })
      .toArray();
    // return console.log(socks);
    // console.log(socks)
    client.close();
    return res.json(socks);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send(err.message);
  }
});

app.post("/socks", async (req, res) => {
  try {
    // Obligatory reference to POST Malone
    console.log(
      "If POST Malone were a sock, he'd be the one with the most colorful pattern."
    );
    const formData = req.body;
    console.log(req.body);

    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const sock = await collection.insertOne(formData);

    console.log("hi");
    console.log(sock);
    // Respond with the created user information and a 201 Created status
    res.status(201).send({
      status: "success",
      //  location: "http://localhost:3000/users/1234", // This URL should point to the newly created user
      message: "Sock created successfully.",
      sock: sock,
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Hmmm, something smells... No socks for you! ☹");
  }
});

app.delete("/socks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Deleting sock with ID:", id);
    res.status(200).send("Sock deleted successfully");
  } catch (err) {
    console.error("Error:", err);
    res
      .status(500)
      .send("Hmm, something doesn't smell right... Error deleting sock");
  }
});

app.put("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.body;
    console.log("Updating email for user with ID:", id);
    res.status(200).send({
      status: "success",
      data: email, // This URL should point to the newly created user
      message: "User updated successfully.",
    });
  } catch (err) {
    console.error("Error:", err);
    res
      .status(500)
      .send("Hmm, something doesn't smell right... Error deleting sock");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
