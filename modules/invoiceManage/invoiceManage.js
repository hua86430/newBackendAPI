const db = require('../../util/database');

const createGet = {
  getAll: (req, res) => {
    db.execute(`SELECT * FROM \`api\`.\`test\`;`).then((data) => {
      res.send(data[0]);
    });
  },
};

module.exports = createGet;
