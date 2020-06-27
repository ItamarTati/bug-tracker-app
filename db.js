const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "?$mR4i:9",
  host: "localhost",
  port: 5432,
  database: "bugs"
});

module.exports = pool;