var express = require('express');
var db = require('../util/database');
var router = express.Router();

router.post('/', (req, res) => {
  const data = {};
  data.id = true;
  data.name = JSON.stringify(req.body.name);
  db.query('INSERT INTO api.invoice SET ?', data, (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

router.get('/getBoolean', (req, res) => {
  db.query('SELECT * FROM api.invoice WHERE id = 14', (err, rows) => {
    if (err) throw err;
    res.send(rows[0]);
  });
});

router.post('/getBoolean', (req, res) => {
  const data = req.body;

  db.query('INSERT INTO api.invoice SET ?', data, (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});
module.exports = router;
