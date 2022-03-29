var express = require('express');
var db = require('../util/database');
var router = express.Router();

const createGet = require('../modules/invoiceManage/invoiceManage');
// const getData = (req, res, next) => {
//   db.execute(`SELECT * FROM \`api\`.\`test\`;`)
//     .then((data) => {
//       res.send({
//         success: true,
//         code: 200,
//         invoiceList: data[0],
//       });
//       res.end();
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
// swagger
let options = {
  explorer: true,
  validatorUrl: null,
  swaggerOptions: {
    urls:[]
  }
}


const swaggerUi = require('swagger-ui-express');
router.use('/', swaggerUi.serve, (req, res) => {
  db.execute(`SELECT * FROM \`api\`.\`api_URL\`;`).then((data) => {
    options.swaggerOptions.urls = data[0]
    let html = swaggerUi.generateHTML(null,options);
    res.send(html);
  });
});

// router.use('/', swaggerUi.serve, swaggerUi.setup(null,options)) // swagger UI
// swagger

router.post('/test', (req, res, next) => {
  const data = req.body;
  console.log(data);
  // db.query('INSERT INTO `api`.`invoice` SET ?',data,(err,rows)=>{
  //   if(err) throw err;
  //   console.log(rows);
  // })
});

router.patch('/', (req, res, next) => {
  const data = req.body;
  let sql = '';
  data.forEach((item) => {
    sql += `('${item[0]}',${item[1]},${item[2]}),`;
  });
  let str = `replace into api.invoice (name,price,id) values ${sql}`.slice(
    0,
    -1
  );
  db.execute(str).then((data) => {
    getData(req, res);
  });
});

router.delete('/', (req, res, next) => {
  db.execute('truncate table `api`.`invoice`;').then((data) => {
    res.send(data[0]);
  });
});





module.exports = router;
