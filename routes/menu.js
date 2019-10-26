const express = require("express");
const router = express.Router();
const db = require("../db");
const vt = require("../token");
const jwt = require("jsonwebtoken");

router.get("/:cid", (req, res) => {
  db.query(
    `SELECT * from menu LEFT JOIN items on menu.item_id = items.item_id where canteen_id = ${req.params.cid}`,
    (err, results) => {
      err ? res.send(err) : res.status(200).json({ menu: results });
    }
  );
});

router.post("/", vt, (req, res) => {
  const item_id = req.body.item_id;
  const price = req.body.price;
  jwt.verify(req.token, process.env.jwt_secret, (err, authData) => {
    if (authData == undefined) res.sendStatus(403);
    if (authData.data[0].canteen_id == undefined) res.sendStatus(403);
    console.log(authData);
    if (err) {
      console.log(err);
      res.sendStatus(403);
    } else {
      var k = 0;
      item_id.map(it => {
        db.query(
          `REPLACE INTO menu values(${authData.data[0].canteen_id},${it},${price[k]})`,
          (err, results) => {
            if (err) res.send(err);
          }
        );
        k++;
        if (k == item_id.length) res.json({ msg: "sent" });
      });
    }
  });
});

module.exports = router;
