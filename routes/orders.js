const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const db = require("../db");
const vt = require("../token");

router.get("/:id", (req, res) => {
  const id = req.params.id;
  db.query(`SELECT * from ordered_items where order_id=${id}`, (err, data) => {
    err ? res.send(err) : res.json({ order: data });
  });
});

router.get("/canteen/orders", vt, (req, res) => {
  jwt.verify(req.token, process.env.jwt_secret, (err, authData) => {
    if (authData == undefined) res.sendStatus(403);
    else if (authData.data[0].uid) res.sendStatus(403);
    else {
      if (authData.data[0].canteen_id) {
        db.query(
          `SELECT * from orders inner join ordered_items on orders.order_id=ordered_items.order_id where canteen_id = ?  `,
          authData.data[0].canteen_id,
          (err, results, data) => {
            err ? res.send(err) : res.json({ results });
          }
        );
      }
    }
  });
});

router.post("/", vt, (req, res) => {
  jwt.verify(req.token, jwt_secret, (err, authData) => {
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
      items.map(it => {
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
                  items.map(item => {
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
