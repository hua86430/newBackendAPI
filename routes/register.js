var express = require('express');
var db = require('../util/database');
var router = express.Router();
const getTime = require('../plugins/getDate');
const crypo = require('../plugins/crypto');

function postData(data) {
  let result = {};
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO api.memberList SET ?', data, function (err, rows) {
      if (err) {
        result.state = false;
        reject(result);
        console.log('1');
        return;
      }
      // 若寫入資料庫成功，則回傳給clinet端下：
      result.state = true;
      console.log('2');
      resolve(result);
    });
  });
}
router.post('/new', (req, res) => {
  let result = {};
  const password = crypo(req.body.password);
  const newData = {
    account: req.body.account,
    email: req.body.email,
    password: password,
    createAt: getTime()
  };

  postData(newData)
    .then(result => {
      if (result.state) {
        res.send({
          success: true,
          code: 200,
          message: '註冊成功！'
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.send({
        success: false,
        code: 400,
        message: '伺服器錯誤，請稍後再試。'
      });
    });
});

module.exports = router;
