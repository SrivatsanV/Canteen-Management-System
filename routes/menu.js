const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/:cid", (req, res) => {
  db.query(
    `SELECT * from menu LEFT JOIN items on menu.item_id = items.item_id where canteen_id = ${req.params.cid}`,
    (err, results) => {
      err ? res.send(err) : res.status(200).json({ menu: results });
    }
  );
});

router.post("/:cid", (req, res) => {
  const item_id = parseInt(req.body.item_id);
  const price = parseInt(req.body.price);
  db.query(
    `INSERT INTO menu values(${req.params.cid},${item_id},${price})`,
    (err, results) => {
      err
        ? res.send(err)
        : res.status(200).json({ insertId: results.insertId });
    }
  );
});

module.exports = router;
