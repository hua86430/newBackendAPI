var express = require('express');
var db = require('../util/database');
var router = express.Router();
const getTime = require('../plugins/getDate');
const getDate = require('../plugins/getDate');

/*-----------------------  category Page -----------------------*/
const getData = (req, res) => {
  db.query('SELECT * FROM `api`.`categoryPage`', (err, rows) => {
    if (err) throw err;
    res.send({
      success: true,
      code: 200,
      data: rows
    });
  });
};

router.get('/category', (req, res, next) => {
  getData(req, res);
});

router.post('/category/update', (req, res, next) => {
  const data = req.body;
  db.query('INSERT INTO `api`.`categoryPage` SET ?', data, (err, rows) => {
    if (err) throw err;
    getData(req, res);
  });
});

router.delete('/category/:id', (req, res) => {
  let id = req.params.id;
  if (id == 'delAll') {
    db.query('TRUNCATE TABLE `api`.`categoryPage`;', (err, rows) => {
      if (err) throw err;
      getData(req, res);
    });
  } else {
    db.query(`DELETE FROM \`api\`.\`categoryPage\` WHERE id=${id}`, (err, rows) => {
      if (err) throw err;
      getData(req, res);
    });
  }
});

/*-----------------------  category Page -----------------------*/

/*-----------------------  commodity Page -----------------------*/
// 返回資料格式
const dataField = data => {
  const d = [];
  data.forEach(item => {
    let p = {
      id: item.id,
      checkBox: '0',
      createAt: item.createAt,
      file: {
        imageUrl: item.imageUrl,
        fileName: item.fileName
      },
      commodity: {
        name: item.name,
        category: item.category,
        summary: item.summary,
        description: item.description,
        specName: item.specName,
        serialNum: item.serialNum,
        multiCart: item.multiCart
      },
      date: {
        start: item.start,
        end: item.end,
        schedule: item.schedule
      },
      choose: {
        showStock: item.showStock == 1 ? true : false,
        InventoryDeduct: item.InventoryDeduct == 1 ? true : false,
        limit_enable: item.limit_enable == 1 ? true : false
      },
      quantity: {
        ori_price: item.ori_price,
        sale_price: item.sale_price,
        specOptions: JSON.parse(item.specOptions), // 規格選項
        inStock: item.inStock,
        weight: item.weight,
        limit_num: item.limit_num === null ? '' : item.limit_num
      }
    };
    d.push(p);
  });

  return d;
};
// 送出資料格式
const originType = q => {
  const data = {
    checkBox: '0',
    createAt: getDate('noneSec'),
    imageUrl: q.file.imageUrl,
    fileName: q.file.fileName,
    name: q.commodity.name,
    category: q.commodity.category,
    summary: q.commodity.summary,
    description: q.commodity.description,
    specName: q.commodity.specName,
    serialNum: q.commodity.serialNum,
    multiCart: q.commodity.multiCart,
    start: q.date.start,
    end: q.date.end,
    schedule: q.date.schedule,
    showStock: q.choose.showStock == true ? 1 : 0,
    InventoryDeduct: q.choose.InventoryDeduct == true ? 1 : 0,
    limit_enable: q.choose.limit_enable == true ? 1 : 0,
    ori_price: q.quantity.ori_price,
    sale_price: q.quantity.sale_price,
    specOptions: JSON.stringify(q.quantity.specOptions),
    inStock: q.quantity.inStock,
    weight: q.quantity.weight,
    limit_num: q.quantitylimit_num
  };
  return data;
};
/* 取得資料 query */
const getCommodity = (req, res) => {
  db.query('SELECT * FROM api.commodity', (err, rows) => {
    if (err) throw err;
    res.send({
      success: true,
      code: 200,
      message: '',
      data: dataField(rows)
    });
  });
};
/* 取得資料 */
router.get('/commodity', (req, res) => {
  getCommodity(req, res);
});
/* 新增資料 */
router.post('/commodity', (req, res) => {
  const q = req.body;
  const data = originType(req.body);
  db.query('INSERT INTO api.commodity SET ?', data, err => {
    if (err) throw err;
    getCommodity(req, res);
  });
});

/* 修改單一 */
router.put('/commodity/:id', (req, res) => {
  const id = req.params.id;
  const data = originType(req.body);

  if (typeof id === 'string') {
    db.query(`UPDATE \`api\`.\`commodity\` SET ? WHERE id =${id}`, data, err => {
      if (err) throw err;
      getCommodity(req, res);
    });
  }
});
/* 刪除單一 / 批次 */
router.delete('/commodity/:id', (req, res) => {
  const id = req.params.id;
  let sql = '';
  if (id == 'delAll') {
    const list = req.body.idList;
    list.forEach(item => {
      sql += `${item},`;
    });
    sql = `(${sql.slice(0, -1)})`;
  } else {
    sql = `(${id})`;
  }
  db.query(`DELETE FROM \`api\`.\`commodity\` WHERE id IN ${sql}`, err => {
    if (err) throw err;
    getCommodity(req, res);
  });
});

/* 批次修改上下架 */
router.patch('/commodity', (req, res) => {
  const id = req.body.idList;
  const type = req.body.type;
  let sql = '';
  id.forEach(item => {
    sql += `(${item},${type}),`;
  });
  sql = sql.slice(0, -1);
  db.query(
    `INSERT INTO \`api\`.\`commodity\` (id,schedule) VALUES ${sql} ON DUPLICATE KEY UPDATE id=VALUES(id),schedule=VALUES(schedule)`,
    err => {
      if (err) throw err;
      getCommodity(req, res);
    }
  );
});
/*-----------------------  commodity Page -----------------------*/

module.exports = router;
