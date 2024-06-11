// import mysql from "mysql2/promise"
import express from "express";
import { connectDB } from "../src/config/db.js";
import { booksRouter } from "../src/routes/books.js";

const PORT = process.env.PORT ?? 3300;
const URL = "http://localhost:";
const app = express();

app.use(express.json());

const startServer = async () => {
  await connectDB();

  app.use("/books", booksRouter);

  app.listen(PORT, (res) => {
    console.log(`Servidor escuchando en: ${URL}${PORT}/books`);
  });
};
startServer();
