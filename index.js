// getting-started.js
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");

// const todoHandler = require("./routesHandler/todoHandler");

// require dotenv
require("dotenv").config();

// express app initialization

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.wuwpwwx.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  const usersCollection = client.db("seo-tools").collection("users");
  try {
    // post user data in mongodb database
    app.post("/users", async (req, res) => {
      const users = req.body;
      const result = await usersCollection.insertOne(users);
      res.send(result);
    });
  } finally {
  }
}

// database connection with mongoose
// mongoose
//   .connect(
//     `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.wuwpwwx.mongodb.net/?retryWrites=true&w=majority`
//   )
//   .then(() => console.log("successfully connected to MongoDB"))
//   .catch((error) => console.log("Error connecting to MongoDb", error));

// application routes

// app.use("/todo", todoHandler);
// app.use("/", router);

// default error handler
// function errorHandler(err, req, res, next) {
//   if (res.headersSent) {
//     return next(err);
//   }
//   res.status(500).json({ error: err });
// }

app.get("/", (req, res) => {
  res.send("Simple node server running");
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

// console.log(dbConnect);

// const { MongoClient, ServerApiVersion } = require("mongodb");
// const uri =
//   "mongodb+srv://<username>:<password>@cluster0.wuwpwwx.mongodb.net/?retryWrites=true&w=majority";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

run().catch(console.dir);
