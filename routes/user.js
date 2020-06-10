const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const vt = require('../token');

router.get('/', (req, res) => {
  db.query('SELECT * from users', (err, data) => {
    err ? res.send(err) : res.json({ users: data });
  });
});

router.post('/register', (req, res) => {
  const { name, phone_num, email, address, password } = req.body;

  db.query(`SELECT * from users where email = ?`, email, (err, data) => {
    console.log(data.length);
    if (data.length != 0) {
      console.log('HI');
      res.json({ msg: 'email already registered' });
    } else {
      //Hashing password

      bcrypt.hash(password, 10, (err, hash) => {
        console.log(hash);
        db.query(
          `INSERT INTO users(name,phone_num,email,address,password) values("${name}","${phone_num}","${email}","${address}","${hash}")`,
          (err, data) => {
            err ? res.send(err) : res.json({ msg: 'user added' });
          }
        );
      });
    }
  });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.query(`SELECT * from users where email = ?`, email, (err, data) => {
    if (err) res.send(err);
    //console.log(data);
    else if (data.length != 0) {
      bcrypt.compare(password, data[0].password, function (err, results) {
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
  });
});
router.post('/admin/login', (req, res) => {
  const { email, password } = req.body;
  db.query(`SELECT * from admin where email = ?`, email, (err, data) => {
    if (err) res.send(err);
    //console.log(data);
    else if (data.length != 0) {
      if (data[0].password == password) {
        jwt.sign({ data }, process.env.jwt_secret, (err, token) => {
          console.log(token);
          res.status(200).json({ token });
        });
      } else res.json({ msg: 'Incorrect password' });
    } else {
      res.json({ msg: 'email doesnt exist' });
    }
  });
});

router.get('/orders', vt, (req, res) => {
  jwt.verify(req.token, process.env.jwt_secret, (err, authData) => {
    if (err) {
      console.log(err);
      res.sendStatus(403);
    } else {
      db.query(
        'SELECT * from orders where uid = ?',
        authData.data[0].uid,
        (err, data) => {
          err ? res.send(err) : res.json({ orders: data, authData });
        }
      );
    }
  });
});
module.exports = router;
