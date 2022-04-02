const db = require('../util/database');

let result = {};
const category = 'api.categoryPage';

module.exports = {
  get() {
    return new Promise((resolve, reject) => {
      db.query(
        `
        SELECT *
        FROM ${category} `,
        (err, rows) => {
          if (err) {
            console.log(err);
            result = {
              status: false,
              code: 400,
              message: '伺服器錯誤，請稍後再試！'
            };
            reject(result);
            return;
          }
          result = {
            status: true,
            code: 200,
            data: rows
          };
          resolve(result);
        }
      );
    });
  },
  post(data) {
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO ${category} SET ?`, data, (err, rows) => {
        if (err) {
          console.log(err);
          result = {
            status: false,
            code: 400,
            message: '伺服器錯誤，請稍後再試！'
          };
          reject(result);
          return;
        }
        result = {
          status: true,
          code: 200
        };
        resolve(result);
      });
    });
  },
  put(id, data) {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE ${category} SET ? WHERE id = ${id}`, data, (err, rows) => {
        if (err) {
          console.log(err);
          result = {
            status: false,
            code: 400,
            message: '伺服器錯誤，請稍後再試！'
          };
          reject(result);
          return;
        }
        result = {
          status: true,
          code: 200
        };
        resolve(result);
      });
    });
  },
  delete(id) {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM ${category} WHERE id=${id}`, (err, rows) => {
        if (err) {
          console.log(err);
          result = {
            status: false,
            code: 400,
            message: '伺服器錯誤，請稍後再試！'
          };
          reject(result);
        }
        result = {
          status: true,
          code: 200
        };
        resolve(result);
      });
    });
  }
};
