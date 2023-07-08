const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const todoSchema = require("../schemas/todoSchemas");
const collectionName = "allTodo";
const Todo = new mongoose.model("Todo", todoSchema, collectionName);
console.log(Todo);

// get all todos
router.get("/", async (req, res) => {
  await Todo.find({
    status: "active",
  })
    .select({
      _id: 0,
      //   title: 1,
      date: 0,
      __v: 0,
    })
    .limit(2)
    .then((allTodo) => {
      if (allTodo) {
        console.log("allTodo", allTodo);
      } else {
        console.log("not found");
      }
      console.log("get all todos successfully");
    })
    .catch((error) => console.log(error));
});

// get a todo by id
router.get("/:id", async (req, res) => {
  await Todo.find({
    _id: req.params.id,
  })
    .then((getOne) => {
      if (getOne) {
        console.log("findOne");
      } else {
        console.log("not found");
      }
      console.log("data", getOne);
    })
    .catch((error) => console.log("server side error"));
  res.send(getOne);
});
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

router.get("/", (req, res) => {
  res.send("Hello World");
});

module.exports = router;
