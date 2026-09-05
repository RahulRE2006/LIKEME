const { pool, obtenerPosts, agregarPost } = require("./consultas.js");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.listen(3000, () => {
  console.log("Servidor en puerto 3000");
});

app.get("/", (req, res) => {
  res.send("ola w");
});
app.get("/posts", async (req, res) => {
  const posts = await obtenerPosts();
  res.json(posts);
});
app.post("/posts", async (req, res) => {
  const { titulo, url, descripcion } = req.body;
  await agregarPost(titulo, url, descripcion);
  res.send("viaje agregado");
});
