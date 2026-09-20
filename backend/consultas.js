const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "likeme",
  password: "postgres",
  port: 5432,
  allowExitOnIdle: true,
});

const agregarPost = async (titulo, url, descripcion) => {
  const consulta = "INSERT INTO posts values (DEFAULT , $1 ,$2 ,$3)";
  const values = [titulo, url, descripcion];
  const result = await pool.query(consulta, values);
  console.log("post agregado con exito");
};

const obtenerPosts = async () => {
  const { rows } = await pool.query("SELECT * FROM posts");
  console.log(rows);
  return rows;
};
const modificarPost = async (titulo, img, descripcion, id) => {
  const consulta =
    "UPDATE posts SET titulo = $1, img = $2, descripcion = $3 WHERE id = $4 RETURNING *; ";
  const values = [titulo, img, descripcion, id];
  const result = await pool.query(consulta, values);
  return result.rows[0];
};
const eliminarPost = async (id) => {
  const consulta = "DELETE FROM posts WHERE id = $1";
  const values = [id];
  const result = await pool.query(consulta, values);
  return result.rows[0];
};

module.exports = {
  pool,
  agregarPost,
  obtenerPosts,
  modificarPost,
  eliminarPost,
};
