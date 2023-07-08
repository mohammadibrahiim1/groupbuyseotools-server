const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const todoSchema = require("../schemas/todoSchemas");
const collectionName = "allTodo";
const Todo = new mongoose.model("Todo", todoSchema, collectionName);
// console.log(Todo);

// get active  todo
router.get("/active", async (req, res) => {
  try {
    const todo = new Todo();
    const data = await todo.findActive();
    res.status(200).json({
      result: data,
      message: "success",
    });
  } catch (error) {
    res.status(500).json({
      error: "there was a server side error",
    });
  }
});

// get a todo by callback

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
router.put("/:id", async (req, res) => {
  await Todo.findByIdAndUpdate(
    {
      _id: req.params.id,
    },
    {
      $set: {
        status: "active",
      },
    },
    {
      new: true,
    }
  )
    .then((updatedDocument) => {
      if (updatedDocument) {
        console.log("updated document:", updatedDocument);
      } else {
        console.log("document not found");
      }
      console.log("update one successfully", updatedDocument);
    })
    .catch((error) => console.log("there was an server side error", error));
  //   res.send(result);
  //   console.log(result);
});

// delete todo
router.delete("/:id", async (req, res) => {
  await Todo.deleteOne({
    _id: req.params.id,
  })
    .then(() => {
      console.log("delete one data successfully");
    })
    .catch((error) => console.log(error));
});

// router.get("/", (req, res) => {
//   res.send("Hello World");
// });

module.exports = router;
