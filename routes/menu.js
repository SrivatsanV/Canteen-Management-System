const express = require('express');
const router = express.Router();
const db = require('../db');
const vt = require('../token');
const jwt = require('jsonwebtoken');

const groupBy = (key) => (array) =>
  array.reduce((objectsByKeyValue, obj) => {
    const value = obj[key];
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
    return objectsByKeyValue;
  }, {});
const grouped_can = groupBy('canteen_id');

router.get('/', vt, (req, res) => {
  jwt.verify(req.token, process.env.jwt_secret, (err, authData) => {
    if (authData == undefined) res.sendStatus(403);
    if (err) {
      console.log(err);
      res.sendStatus(403);
    } else {
      db.query(
        `SELECT * from menu LEFT JOIN items on menu.item_id = items.item_id where canteen_id = ${authData.data[0].canteen_id}`,
        (err, results) => {
          err ? res.send(err) : res.status(200).json({ menu: results });
        }
      );
    }
  });
});
router.get('/:id', vt, (req, res) => {
  // jwt.verify(req.token, process.env.jwt_secret, (err, authData) => {
  //   if (authData == undefined) res.sendStatus(403);
  //   console.log(authData);
  //   if (err) {
  //     console.log(err);
  //     res.sendStatus(403);
  //   } else {
  db.query(
    `SELECT * from menu LEFT JOIN items on menu.item_id = items.item_id where canteen_id = ${req.params.id}`,
    (err, results) => {
      err ? res.send(err) : res.status(200).json({ menu: results });
    }
  );
  //   }
  // });
});

router.post('/update', vt, (req, res) => {
  const items = req.body.items;

  jwt.verify(req.token, process.env.jwt_secret, (err, authData) => {
    if (authData == undefined) res.sendStatus(403);
    console.log(authData);
    if (err) {
      console.log(err);
      res.sendStatus(403);
    } else {
      items.map((i) => {
        db.query(
          `REPLACE INTO menu values(
            "${authData.data[0].canteen_id}","${i.item_id}","${i.price}")`,
          (err, results) => {
            err ? res.send(err) : res.status(200).json({ msg: 'updated' });
          }
        );
      });
    }
  });
});

router.get('/update/:item_id/:price', vt, (req, res) => {
  jwt.verify(req.token, process.env.jwt_secret, (err, authData) => {
    console.log(authData);
    if (authData == undefined) res.sendStatus(403);
    console.log(authData);
    if (err) {
      console.log(err);
      res.sendStatus(403);
    } else {
      db.query(
        `REPLACE INTO menu values(
            "${authData.data[0].canteen_id}","${parseInt(
          req.params.item_id
        )}","${parseInt(req.params.price)}")`,
        (err, results) => {
          err ? res.send(err) : res.status(200).json({ msg: 'updated' });
        }
      );
    }
  });
});

router.get('/delete/:item_id/', vt, (req, res) => {
  jwt.verify(req.token, process.env.jwt_secret, (err, authData) => {
    console.log(authData);
    if (authData == undefined) res.sendStatus(403);
    console.log(authData);
    if (err) {
      console.log(err);
      res.sendStatus(403);
    } else {
      db.query(
        'DELETE from menu where canteen_id = ? and item_id = ?',
        [authData.data[0].canteen_id, req.params.item_id],
        (err, results) => {
          err ? res.send(err) : res.status(200).json({ msg: 'updated' });
        }
      );
    }
  });
});

router.get('/', vt, (req, res) => {
  jwt.verify(req.token, process.env.jwt_secret, (err, authData) => {
    if (authData == undefined) res.sendStatus(403);
    console.log(authData);
    if (err) {
      console.log(err);
      res.sendStatus(403);
    } else {
      db.query(
        `SELECT * from menu LEFT JOIN items on menu.item_id = items.item_id`,
        (err, results) => {
          err
            ? res.send(err)
            : res.status(200).json({ menu: grouped_can(results) });
        }
      );
    }
  });
});

router.post('/', vt, (req, res) => {
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
      item_id.map((it) => {
        db.query(
          `REPLACE INTO menu values(${authData.data[0].canteen_id},${it},${price[k]})`,
          (err, results) => {
            if (err) res.send(err);
          }
        );
        k++;
        if (k == item_id.length) res.json({ msg: 'sent' });
      });
    }
  });
});

module.exports = router;
