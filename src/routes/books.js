import { connectDB } from "../config/db.js";
import { Router } from "express";
import {
  getBooks,
  createBook,
  updateBook,
  deleteBook,
} from "../controllers/books.js";

export const booksRouter = Router();

booksRouter.get("/", getBooks);

booksRouter.post("/", createBook);

booksRouter.put("/", updateBook);

booksRouter.delete("/", deleteBook);
