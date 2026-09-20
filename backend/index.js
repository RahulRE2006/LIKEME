const {
  pool,
  obtenerPosts,
  agregarPost,
  modificarPost,
  eliminarPost,
} = require("./consultas.js");
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
  try {
    const posts = await obtenerPosts();
    res.json(posts);
  } catch (error) {
    console.error("Error al obtener los posts:", error);
    res.status(500).json({ error: "Error al obtener los posts" });
  }
});
app.post("/posts", async (req, res) => {
  try {
    const { titulo, url, descripcion } = req.body;
    await agregarPost(titulo, url, descripcion);
    res.send("viaje agregado");
  } catch (error) {
    console.error("error al postear :", error);
  }
});
app.put("/posts/:id", async (req, res) => {
  const { id } = req.params;
  const { titulo, img, descripcion } = req.body;
  await modificarPost(titulo, img, descripcion, id);
  res.send("modificado");
});
app.delete("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await eliminarPost(id);
    res.send("eliminado");
  } catch (error) {}
});
