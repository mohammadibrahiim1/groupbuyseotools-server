const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const todoSchema = require("../schemas/todoSchemas");
const collectionName = "allTodo";
const Todo = new mongoose.model("Todo", todoSchema, collectionName);
console.log(Todo);

// get all todos
router.get("/", async (req, res) => {});

// get a todo by id
router.get("/:id", async (req, res) => {});
// post todo
router.post("/", async (req, res) => {
  const newTodo = new Todo(req.body);

  await newTodo
    .save()
    .then(() => {
      console.log("todo was inserted successfully");
    })
    .catch((error) => {
      console.log("there was a server side error", error);
    });
  //    await newTodo.save((error) => {
  //     if (error) {
  //       res.status(500).json({
  //         error: "there was a server side error",
  //       });
  //     } else {
  //       res.status(200).json({
  //         message: "Todo was inserted successfully",
  //       });
  //     }
  //   });

  //   res.send(result);
});
// post all todo
router.post("/all", async (req, res) => {
  await Todo.insertMany(req.body)
    .then(() => {
      console.log("all todo inserted successfully");
    })
    .catch((error) => {
      console.log("server side error");
    });
});
// put todo
router.put("/:id", async (req, res) => {});
// delete todo
router.delete("/:id", async (req, res) => {});

module.exports = router;
