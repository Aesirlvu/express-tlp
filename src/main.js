import express from "express";
import { connectDB } from "./config/db.js";

const PORT = 3300;
const app = express();

app.use(express.json());

app.get("/books", async (req, res) => {
  const connection = await connectDB();
  try {
    const result = await connection.query(`
        SELECT * FROM books
        `);
    res.json(result[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error.");
  } finally {
    connection.end();
  }
});

app.post("/books", async (req, res) => {
  const connection = await connectDB();
  try {
    const { title, author } = req.body;
    const query = `
    INSERT INTO books (title, author) VALUES
    (?, ?)
    `;
    const checkQuery = `
    SELECT * FROM books WHERE title = ? AND author = ?
    `;
    const existingBooks = await connection.query(checkQuery, [title, author]);
    if (existingBooks.length > 0) {
      return res.status(400).send("El libro ya existe.");
    }
    const result = await connection.query(query, [title, author]);
    res.send("Se creó");
  } catch (error) {
    console.error(error);
    res.status(500).send("Hubo un error.");
  }
});

app.delete("/", async (req, res) => {
  const connection = await connectDB();
  try {
    const { id } = req.body;
    const queryDelete = `
    DELETE FROM books WHERE id = ?
    `;
    const result = await connection.query(queryDelete, [id]);
    res.send("Registro eliminado.");
  } catch (error) {
    console.error(error);
    res.status(500).send("No se pudo eliminar");
  } finally {
    connection.end();
  }
});

app.listen(PORT, (res) => {
  console.log(`Servidor escuchando en: ${PORT}`);
});
