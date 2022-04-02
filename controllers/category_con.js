const getDate = require('../plugins/getDate');
const cat = require('../models/category_model');

const getData = (req, res) => {
  cat
    .get()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.send(err);
    });
};
module.exports = {
  getCategory(req, res) {
    getData(req, res);
  },
  UpdateCategory(req, res) {
    const data = req.body;
    cat
      .post(data)
      .then(result => {
        if (result.status) {
          getData(req, res);
        }
      })
      .catch(err => {
        res.send(err);
      });
  },
  editCategory(req, res) {
    const data = req.body;
    const id = req.params.id;
    cat
      .put(id, data)
      .then(result => {
        if (result.status) {
          getData(req, res);
        }
      })
      .catch(err => res.send(err));
  },
  delCategory(req, res) {
    const id = req.params.id;
    cat
      .delete(id)
      .then(result => {
        if (result.status) getData(req, res);
      })
      .catch(err => res.send(err));
  }
};
