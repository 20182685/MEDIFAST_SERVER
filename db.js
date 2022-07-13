const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "lccs95",
  host: "localhost",
  port: 5432,
  database: "medifast"
});

module.exports = pool;