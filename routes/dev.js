var express = require('express');
var router = express.Router();

/*-----------------------  category Page -----------------------*/
const toCategory = require('../controllers/category_con');
router
  .get('/category', toCategory.getCategory)
  .post('/category/update', toCategory.UpdateCategory)
  .put('/category/update/:id', toCategory.editCategory)
  .delete('/category/:id', toCategory.delCategory);

/*-----------------------  category Page -----------------------*/

/*-----------------------  commodity Page -----------------------*/
const toCommodity = require('../controllers/commodity_con');
router
  .get('/commodity', toCommodity.get)
  .post('/commodity', toCommodity.create)
  .put('/commodity/:id', toCommodity.update)
  .delete('/commodity/:id', toCommodity.delete)
  .patch('/commodity/', toCommodity.batch);

/*-----------------------  commodity Page -----------------------*/
/* 商品分類列表 搜尋功能 */

module.exports = router;
