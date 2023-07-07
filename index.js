// getting-started.js
const express = require("express");
const mongoose = require("mongoose");

const todoHandler = require("./routesHandler/todoHandler");

// require dotenv
require("dotenv").config();

// express app initialization
const app = express();
app.use(express.json());

// database connection with mongoose
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.wuwpwwx.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => console.log("successfully connected"))
  .catch((error) => console.log(error));

// application routes

app.use("/todo", todoHandler);

// default error handler
function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
}

app.listen(5000, () => {
  console.log("app listening at port 5000");
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

async function run() {
  try {
  } finally {
  }
}
run().catch(console.dir);
