const config = require('./development_config');
const mysql = require('mysql2');

//AWS
const pool = mysql.createPool({
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
  timezone: '+08:00',
  multipleStatements: true
});

module.exports = pool;
// module.exports = pool.promise();
