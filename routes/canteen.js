const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
  db.query('SELECT * from night_canteen', (err, data) => {
    err ? res.send(err) : res.json({ nc: data });
  });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.query(
    `SELECT * from night_canteen where canteen_id=${id}`,
    (err, data) => {
      err ? res.send(err) : res.json({ nc: data });
    }
  );
});

router.post('/register', (req, res) => {
  const { canteen_name, phone_num, type, location, email, password } = req.body;

  db.query(
    `SELECT * from night_canteen where email = ?`,
    email,
    (err, data) => {
      console.log(data);
      if (data === undefined) {
        bcrypt.hash(password, 10, (err, hash) => {
          console.log(hash);
          db.query(
            `INSERT INTO night_canteen( canteen_name, phone_num, type, location, email, password) values("${canteen_name}","${phone_num}","${type}","${location}","${email}","${hash}")`,
            (err, data) => {
              err ? res.send(err) : res.json({ msg: 'canteen added' });
            }
          );
        });
      } else if (data.length !== 0) {
        res.json({ msg: 'email already registered' });
      } else if (data.length == 0) {
        //Hashing password

        bcrypt.hash(password, 10, (err, hash) => {
          console.log(hash);
          db.query(
            `INSERT INTO night_canteen( canteen_name, phone_num, type, location, email, password) values("${canteen_name}","${phone_num}","${type}","${location}","${email}","${hash}")`,
            (err, data) => {
              err ? res.send(err) : res.json({ msg: 'canteen added' });
            }
          );
        });
      }
    }
  );
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.query(
    `SELECT * from night_canteen where email = ?`,
    email,
    (err, data) => {
      if (data.length != 0) {
        bcrypt.compare(password, data[0].password, function (err, results) {
          console.log(results);
          if (results) {
            jwt.sign({ data }, process.env.jwt_secret, (err, token) => {
              res.status(200).json({ token });
            });
          } else {
            res.json({ msg: 'Incorrect password' });
          }
        });
      } else {
        res.json({ msg: 'email doesnt exist' });
      }
    }
  );
});

module.exports = router;
