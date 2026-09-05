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

module.exports = { pool, agregarPost, obtenerPosts };
