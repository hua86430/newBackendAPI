const getDate = require('../plugins/getDate');
const db = require('../util/database');
const commodity = 'api.commodity';

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
    createAt: q.createAt === '' ? getDate('noneSec') : q.createAt,
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
    limit_num: q.quantity.limit_num
  };
  return data;
};

let result = {};
module.exports = {
  get() {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM ${commodity}`, (err, rows) => {
        if (err) {
          console.log(err);
          result = {
            status: false,
            code: 400,
            message: '伺服器錯誤，請稍後再試！'
          };
          reject(result);
          return;
        }
        let arr = [];
        for (let i = 0; i < rows.length; i++) {
          arr.push(rows[i].category);
        }
        let cList = arr.filter((item, index) => arr.indexOf(item) === index);
        cList.sort();
        cList.unshift('全部商品');

        result = {
          status: true,
          code: 200,
          data: dataField(rows),
          categoryList: cList
        };
        resolve(result);
      });
    });
  },
  post(data) {
    const d = originType(data);
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO ${commodity} SET ?`, d, err => {
        if (err) {
          console.log(err);
          result = {
            status: false,
            code: 400,
            message: '伺服器錯誤，請稍後再試！'
          };
          reject(result);
          return;
        }
        result = {
          status: true,
          code: 200
        };
        resolve(result);
      });
    });
  },
  put(id, data) {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE ${commodity} SET ? WHERE id =${id}`, originType(data), err => {
        if (err) {
          console.log(err);
          result = {
            status: false,
            code: 400,
            message: '伺服器錯誤，請稍後再試！'
          };
          reject(result);
          return;
        }
        result = {
          status: true,
          code: 200
        };
        resolve(result);
      });
    });
  },
  delete(query) {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM ${commodity} WHERE id IN ${query}`, err => {
        if (err) {
          console.log(err);
          result = {
            status: false,
            code: 400,
            message: '伺服器錯誤，請稍後再試！'
          };
          reject(result);
          return;
        }
        result = {
          status: true,
          code: 200
        };
        resolve(result);
      });
    });
  },
  patch(query) {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO ${commodity} (id,schedule) VALUES ${query} ON DUPLICATE KEY UPDATE id=VALUES(id), schedule=VALUES(schedule)`,
        err => {
          if (err) {
            console.log(err);
            result = {
              status: false,
              code: 400,
              message: '伺服器錯誤，請稍後再試！'
            };
            reject(result);
            return;
          }
          result = {
            status: true,
            code: 200
          };
          resolve(result);
        }
      );
    });
  }
};
