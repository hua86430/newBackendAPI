var express = require('express');
var db = require('../util/database');
var router = express.Router();

/*-----------------------  category Page -----------------------*/
const getData = (req, res) => {
  db.query('SELECT * FROM `api`.`categoryPage`',(err,rows)=>{
    if(err) throw err;
    res.send({
      success: true,
      code: 200,
      data:rows,
    });
  })
};

router.get('/category', (req, res, next) => {
  getData(req, res);
});

router.post('/category/update', (req, res, next) => {
  const data = req.body;
  db.query(
    'INSERT INTO `api`.`categoryPage` SET ?', data , (err,rows)=>{
      if(err) throw err
      getData(req, res);
    })
});

router.delete('/category/:id', (req, res) => {
  let id = req.params.id;
  if (id == 'delAll') {
    db.query('TRUNCATE TABLE `api`.`categoryPage`;',(err,rows)=>{
      if (err) throw err
      getData(req, res);
    })
  } else {
    db.query(`DELETE FROM \`api\`.\`categoryPage\` WHERE id=${id}`,(err,rows)=>{
      if(err) throw err
      getData(req, res);
    })
  }
});

/*-----------------------  category Page -----------------------*/
module.exports = router;
