import { connectDB } from "../config/db.js";
import { Router } from "express";

export const booksRouter = Router();

booksRouter.get("/", async (req, res) => {
  const connection = await connectDB();
  try {
    const [result] = await connection.query(`SELECT * FROM books`);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error.");
  } finally {
    await connection.end();
  }
});

booksRouter.post("/", async (req, res) => {
  const connection = await connectDB();
  try {
    const { title, author } = req.body;
    const query = `INSERT INTO books (title, author) VALUES (?, ?)`;
    const checkQuery = `SELECT * FROM books WHERE title = ? AND author = ?`;
    const [existingBooks] = await connection.query(checkQuery, [title, author]);
    if (existingBooks.length > 0) {
      return res.status(400).send("El libro ya existe.");
    }
    const result = await connection.query(query, [title, author]);
    res.send("Se creó");
  } catch (error) {
    console.error(error);
    res.status(500).send("Hubo un error.");
  } finally {
    await connection.end();
  }
});

booksRouter.delete("/", async (req, res) => {
  const connection = await connectDB();
  try {
    const { id } = req.body;
    const querySelect = `SELECT * FROM books WHERE id = ?`;
    const queryDelete = `DELETE FROM books WHERE id = ?`;
    const [existingBooks] = await connection.query(querySelect, [id]);
    if (existingBooks.length === 0) {
      return res.status(404).send("El libro no existe.");
    }
    const result = await connection.query(queryDelete, [id]);
    res.send("Registro eliminado.");
  } catch (error) {
    console.error(error);
    res.status(500).send("No se pudo eliminar");
  } finally {
    await connection.end();
  }
});
