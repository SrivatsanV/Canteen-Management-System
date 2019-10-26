const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  db.query("SELECT * from users", (err, data) => {
    err ? res.send(err) : res.json({ users: data });
  });
});

router.post("/register", (req, res) => {
  const { name, phone_num, email, address, password } = req.body;

  db.query(`SELECT * from users where email = ?`, email, (err, data) => {
    console.log(data[0].password);
    if (data.length != 0) {
      res.json({ msg: "email already registered" });
    } else {
      //Hashing password

      bcrypt.hash(password, 10, (err, hash) => {
        console.log(hash);
        db.query(
          `INSERT INTO users(name,phone_num,email,address,password) values("${name}","${phone_num}","${email}","${address}","${hash}")`,
          (err, data) => {
            err ? res.send(err) : res.json({ msg: "user added" });
          }
        );
      });
    }
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(`SELECT * from users where email = ?`, email, (err, data) => {
    if (data.length != 0) {
      bcrypt.compare(password, data[0].password, function(err, results) {
        console.log(results);
        if (results) {
          res.status(200).json({ msg: "Logged in" });
        } else {
          res.json({ msg: "Incorrect password" });
        }
      });
    } else {
      res.json({ msg: "email doesnt exist" });
    }
  });
});

module.exports = router;
