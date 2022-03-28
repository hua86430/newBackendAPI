const mysql = require('mysql2');

//AWS
const pool = mysql.createPool({
  host: "api.czn8qpmir7dt.us-east-1.rds.amazonaws.com",
  user: "root",
  password: "17934600",
  database: "api",
  multipleStatements: true,
});

module.exports = pool;
// module.exports = pool.promise();
