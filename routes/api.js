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
    urls: []
  }
};

const swaggerUi = require('swagger-ui-express');
router.use('/', swaggerUi.serve, (req, res) => {
  db.query('SELECT * FROM api.api_URL', (err, data) => {
    if (err) throw err;
    options.swaggerOptions.urls = data;
    let html = swaggerUi.generateHTML(null, options);
    res.send(html);
  });
});

// router.use('/', swaggerUi.serve, swaggerUi.setup(null,options)) // swagger UI
// swagger

module.exports = router;
