const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  db.query("SELECT * from orders", (err, data) => {
    err ? res.send(err) : res.json({ orders: data });
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  db.query(`SELECT * from orders where order_id=${id}`, (err, data) => {
    err ? res.send(err) : res.json({ order: data });
  });
});

router.post("/", (req, res) => {
  const uid = req.body.uid;
  const can_id = req.body.canteen_id;
  const status = req.body.order_status;
  console.log(req.body);
  var record = { uid: uid, canteen_id: can_id, status: status };

  db.query(
    `INSERT INTO orders (uid,canteen_id,order_status) values (${uid},${can_id},"${status}")`,
    (err, results, data) => {
      err
        ? res.send(err)
        : res.status(200).json({ insertId: results.insertId });
    }
  );
});

module.exports = router;
