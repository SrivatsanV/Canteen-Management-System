const express = require('express');
const router = express.Router();
const db = require('../db');
const jwt = require('jsonwebtoken');
const vt = require('../token');

router.get('/', vt, (req, res) => {
  jwt.verify(req.token, process.env.jwt_secret, (err, authData) => {
    console.log(authData);
    if (authData == undefined) res.sendStatus(403);
    if (err) {
      console.log(err);
      res.sendStatus(403);
    } else {
      db.query('SELECT * from items', (err, data) => {
        err ? res.send(err) : res.json({ item: data });
      });
    }
  });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.query(`SELECT * from items where item_id=${id}`, (err, data) => {
    err ? res.send(err) : res.json({ item: data });
  });
});

router.post('/', vt, (req, res) => {
  console.log(req.token);
  jwt.verify(req.token, process.env.jwt_secret, (err, authData) => {
    const { item_name, item_type, description } = req.body;

    if (authData == undefined) res.sendStatus(403);
    if (err) {
      console.log(err);
      res.sendStatus(403);
    } else {
      db.query(
        `REPLACE INTO items (item_name,item_type,description) values("${item_name}","${item_type}","${description}")`,
        (err, results) => {
          err ? res.send(err) : res.json({ msg: 'added' });
        }
      );
    }
  });
});

module.exports = router;
