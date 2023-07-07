// getting-started.js
const express = require("express");
const mongoose = require("mongoose");

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
    //   .where("name")
    //   .equals("munna")
    //   .populate("bestFriend")
    //   .limit(1)
    //   .select("age");
    // user[0].bestFriend = "64a85a7fbf3c9f651176521c";
    // await user.save();
    // const user = await user.findOne({
    //   name: "munna",
    // });
    // console.log(user.namedEmail);
    // await user.save();
    // user.sayHi();
    // const user = await User.create({
    //   name: "munna",
    //   age: "25",
    //   email: "Test@te.com",
    //   hobbies: ["cricket, football,racing"],
    //   address: {
    //     street: "Main St",
    //   },
    // });
    // user.createdAt = 5;
    // await user.save().then(() => console.log("user saved"));
    // console.log(user);
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );
  } finally {
  }
}
run().catch(console.dir);
