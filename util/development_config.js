require('dotenv').config();

module.exports = {
  mysql: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    dbname: process.env.DATABASE_NAME
  }
};
