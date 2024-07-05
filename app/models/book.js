import { connectToDB } from "@/utils/database";

const express = require("express");
const mongoose = require("mongoose");
const User = require("./user");
const Collection = require("./collection");
const Book = require("./book");

const app = express();
app.use(express.json());

// Connect to MongoDB
connectToDB();

// Create a new collection for a user
app.post("/users/:userId/collections", async (req, res) => {
  const collection = new Collection({ ...req.body, user: req.params.userId });
  await collection.save();
  const user = await User.findById(req.params.userId);
  user.collections.push(collection);
  await user.save();
  res.send(collection);
});

// Add a book to a collection
app.post("/collections/:collectionId/books", async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  const collection = await Collection.findById(req.params.collectionId);
  collection.books.push(book);
  await collection.save();
  // Add the collection reference to the book
  book.collections.push(collection);
  await book.save();
  res.send(book);
});

// Get user with collections and books
app.get("/users/:userId", async (req, res) => {
  const user = await User.findById(req.params.userId).populate({
    path: "collections",
    populate: {
      path: "books",
    },
  });
  res.send(user);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
