var express = require('express');
var db = require('../util/database');
var router = express.Router();

/*-----------------------  category Page -----------------------*/
const getData = (req, res) => {
  db.execute('SELECT * FROM `api`.`categoryPage`').then((data) => {
    res.send({
      success: true,
      code: 200,
      data: data[0],
    });
  });
};

router.get('/category', (req, res, next) => {
  getData(req, res);
});

router.post('/category/update', (req, res, next) => {
  const data = req.body;
  db.execute(
    'INSERT INTO `api`.`categoryPage` (fileName,imageUrl,name) VALUES (?,?,?)',
    [data.fileName, data.imgUrl, data.category]
  )
    .then(() => {
      getData(req, res);
      // getData(req, res);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.delete('/category/:id', (req, res) => {
  let id = req.params.id;
  db.execute(`DELETE FROM \`api\`.\`categoryPage\` WHERE id=${id}`).then(() => {
    getData(req, res);
  });
});

router.delete('/category/delAll', (req, res, next) => {
  db.execute('TRUNCATE TABLE `api`.`categoryPage`;').then(() => {
    getData(req, res);
  });
});
/*-----------------------  category Page -----------------------*/
module.exports = router;
