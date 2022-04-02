const com = require('../models/commodity_model');

const getData = (req, res) => {
  com
    .get()
    .then(result => {
      if (result.status) res.send(result);
    })
    .catch(err => res.send(err));
};

module.exports = {
  get(req, res) {
    getData(req, res);
  },
  /* 新增資料 */
  create(req, res) {
    com
      .post(req.body)
      .then(result => {
        if (result.status) getData(req, res);
      })
      .catch(err => res.send(err));
  },
  /* 修改單一 */
  update(req, res) {
    com
      .put(req.params.id, req.body)
      .then(result => {
        if (result.status) getData(req, res);
      })
      .catch(err => res.send(err));
  },
  /* 刪除單一 / 批次 */
  delete(req, res) {
    const id = req.params.id;
    let sql = '';
    if (id == 'delAll') {
      req.body.idList.forEach(item => {
        sql += `${item},`;
      });
      sql = `(${sql.slice(0, -1)})`;
    } else {
      sql = `(${id})`;
    }
    com
      .delete(sql)
      .then(result => {
        if (result.status) getData(req, res);
      })
      .catch(err => res.send(err));
  },
  /* 批次修改上下架 */
  batch(req, res) {
    const id = req.body.idList;
    const type = req.body.type;
    let sql = '';
    id.forEach(item => {
      sql += `(${item},${type}),`;
    });
    sql = sql.slice(0, -1);
    com
      .patch(sql)
      .then(result => {
        if (result.status) getData(req, res);
      })
      .catch(err => res.send(err));
  }
};
