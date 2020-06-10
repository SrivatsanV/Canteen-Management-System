const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const db = require('../db');
const vt = require('../token');

const groupBy = (key) => (array) =>
  array.reduce((objectsByKeyValue, obj) => {
    const value = obj[key];
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
    return objectsByKeyValue;
  }, {});
const grouped_can = groupBy('order_id');

router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.query(`SELECT * from ordered_items where order_id=${id}`, (err, data) => {
    err ? res.send(err) : res.json({ order: data });
  });
});

router.get('/canteen/orders', vt, (req, res) => {
  jwt.verify(req.token, process.env.jwt_secret, (err, authData) => {
    if (authData == undefined) res.sendStatus(403);
    else if (authData.data[0].uid) res.sendStatus(403);
    else {
      if (authData.data[0].canteen_id) {
        db.query(
          `SELECT * from orders inner join ordered_items on orders.order_id=ordered_items.order_id inner join items on items.item_id = ordered_items.item_id inner join users on orders.uid = users.uid where canteen_id = ?  `,
          authData.data[0].canteen_id,
          (err, results, data) => {
            err ? res.send(err) : res.json({ orders: grouped_can(results) });
          }
        );
      }
    }
  });
});

router.get('/canteen/orders/accept/:id', vt, (req, res) => {
  jwt.verify(req.token, process.env.jwt_secret, (err, authData) => {
    if (authData == undefined) res.sendStatus(403);
    else if (authData.data[0].uid) res.sendStatus(403);
    else {
      if (authData.data[0].canteen_id) {
        db.query(
          `UPDATE orders set order_status = "Order Accepted" where order_id = ? `,
          [req.params.id],
          (err, results, data) => {
            err ? res.send(err) : res.json({ orders: results });
          }
        );
      }
    }
  });
});

router.get('/canteen/orders/reject/:id', vt, (req, res) => {
  jwt.verify(req.token, process.env.jwt_secret, (err, authData) => {
    if (authData == undefined) res.sendStatus(403);
    else if (authData.data[0].uid) res.sendStatus(403);
    else {
      if (authData.data[0].canteen_id) {
        db.query(
          `UPDATE  orders set order_status = "Order Rejected" where order_id = ? `,
          parseInt(req.params.id),
          (err, results, data) => {
            err ? res.send(err) : res.json({ orders: results });
          }
        );
      }
    }
  });
});

router.get('/user/orders', vt, (req, res) => {
  jwt.verify(req.token, process.env.jwt_secret, (err, authData) => {
    if (authData == undefined) res.sendStatus(403);
    else if (authData.data[0].canteen_id) res.sendStatus(403);
    else {
      if (authData.data[0].uid) {
        db.query(
          `SELECT * from orders inner join ordered_items on orders.order_id=ordered_items.order_id inner join items on items.item_id = ordered_items.item_id inner join night_canteen on night_canteen.canteen_id = orders.canteen_id where uid = ? `,
          authData.data[0].uid,
          (err, results, data) => {
            err ? res.send(err) : res.json({ orders: grouped_can(results) });
          }
        );
      }
    }
  });
});

router.post('/', vt, (req, res) => {
  jwt.verify(req.token, process.env.jwt_secret, (err, authData) => {
    const uid = authData.data[0].uid;
    const can_id = req.body.canteen_id;
    const status = req.body.order_status;
    const items = req.body.items;
    var order_id;
    if (err) {
      console.log(err);
      res.sendStatus(403);
    } else {
      var c = 0;
      var total_price = 0;
      var prices = [];
      items.map((it) => {
        db.query(
          `SELECT price from menu where canteen_id = ? and item_id=?`,
          [can_id, it],
          (err, results, data) => {
            //console.log(results);
            console.log(results[0].price);
            total_price += results[0].price;
            prices.push(results[0].price);
            c++;
            console.log(c, total_price);
            if (items.length == c) {
              console.log(total_price);
              db.query(
                `INSERT INTO orders (uid,canteen_id,order_status,total_price) values (${uid},${can_id},"${status}",${total_price})`,
                (err, results, data) => {
                  err
                    ? res.send(err)
                    : res.status(200).json({ insertId: results.insertId });
                  order_id = results.insertId;
                  var k = 0;
                  items.map((item) => {
                    db.query(
                      `INSERT INTO ordered_items values (${item},${order_id},${prices[k]})`,
                      (err, results, data) => {
                        if (err) console.log(err);
                      }
                    );
                    k++;
                  });
                }
              );
            }
          }
        );
      });
    }
  });
});

module.exports = router;
