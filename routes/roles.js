const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const vt = require('../token');

router.get('/', vt, (req, res) => {
  jwt.verify(req.token, process.env.jwt_secret, (err, authData) => {
    if (authData === undefined) res.status(200).json({ role: 'visitor' });
    if (err) {
      console.log(err);
      res.sendStatus(403);
    } else {
      if (authData.data[0].role === 'admin') {
        res.status(200).json({ role: 'admin' });
      } else if (authData.data[0].role === 'canteen') {
        res.status(200).json({ role: 'canteen' });
      } else if (authData.data[0].role === 'user') {
        res.status(200).json({ role: 'user' });
      }
    }
  });
});

router.get('/permissions', (req, res) => {
  const role = req.query.role;
  let perm = [],
    ops = [];
  db.query(
    `SELECT permission from permissions where roles = ? `,
    role,
    (err, results, data) => {
      err ? res.send(err) : (perm = results);
    }
  );
  db.query(
    `SELECT operation, op.permission FROM test.operations op inner join test.permissions p on  op.roles=p.roles and op.permission=p.permission where op.roles=?`,
    role,
    (err, results, data) => {
      if (err) res.send(err);
      else {
        ops = results;
        res.json({ perm, ops });
      }
    }
  );
});
router.get('/operations', (req, res) => {
  //   db.query(`SELECT * FROM operations `, (err, results, data) => {
  //     err ? res.send(err) : res.json(results);
  //   });
  const role = req.query.role;
  let perm = [],
    ops = [];
  db.query(`SELECT * from permissions`, (err, results, data) => {
    err ? res.send(err) : (perm = results);
  });
  db.query(
    `SELECT * FROM test.operations op inner join test.permissions p on  op.roles=p.roles and op.permission=p.permission`,
    (err, results, data) => {
      if (err) res.send(err);
      else {
        ops = results;
        res.json({ perm, ops });
      }
    }
  );
});

router.post('/assign', (req, res) => {
  const { role, perm, ops } = req.body;
  console.log(req.body);
  if (ops.length !== 0) {
    db.query(
      `SELECT * FROM operations where roles=? and permission=? and operation=?`,
      [role, perm, ops],
      (err, results, data) => {
        if (err) res.send(err);
        else {
          if (results.length > 0) res.json({ msg: 'already assigned' });
          else
            db.query(
              `SELECT * FROM permissions where roles=? and permission=? `,
              [role, perm],
              (err, results, data) => {
                if (err) res.send(err);
                else {
                  if (results.length === 0)
                    db.query(
                      `INSERT into permissions(roles,permission) values ("${role}","${perm}")`,
                      (err, results, data) => {
                        err ? res.send(err) : console.log(results);
                      }
                    );
                  db.query(
                    `INSERT into operations(roles,permission,operation) values ("${role}","${perm}","${ops}")`,
                    (err, results, data) => {
                      err ? res.send(err) : console.log(results);
                    }
                  );
                }
              }
            );
        }
      }
    );
  } else {
    db.query(
      `SELECT * FROM permissions where roles=? and permission=? `,
      [role, perm],
      (err, results, data) => {
        if (err) res.send(err);
        else {
          if (results.length === 0)
            db.query(
              `INSERT into permissions(roles,permission) values ("${role}","${perm}")`,
              (err, results, data) => {
                err ? res.send(err) : res.json(results);
              }
            );
        }
      }
    );
  }
});

router.post('/delete', (req, res) => {
  const { role, perm, ops } = req.body;
  console.log(req.body);
  if (ops.length !== 0) {
    db.query(
      `SELECT * FROM operations where roles=? and permission=? and operation=?`,
      [role, perm, ops],
      (err, results, data) => {
        if (err) res.send(err);
        else {
          if (results.length > 0)
            db.query(
              `DELETE FROM operations where roles=? and permission=? and operation=?`,
              [role, perm, ops],
              (err, results, data) => {
                err ? res.send(err) : res.json(results);
              }
            );
          else res.json({ msg: 'Operation not found' });
        }
      }
    );
  } else {
    db.query(
      `SELECT * FROM operations where roles=? and permission=? `,
      [role, perm],
      (err, results, data) => {
        if (err) res.send(err);
        else {
          if (results.length > 0) {
            db.query(
              `DELETE FROM operations where roles=? and permission=? `,
              [role, perm],
              (err, results, data) => {
                err ? res.send(err) : console.log(results);
              }
            );
          }

          db.query(
            `SELECT * FROM permissions where roles=? and permission=? `,
            [role, perm],
            (err, results, data) => {
              if (err) res.send(err);
              else {
                if (results.length > 0)
                  db.query(
                    `DELETE FROM permissions where roles=? and permission=?`,
                    [role, perm],
                    (err, results, data) => {
                      err ? res.send(err) : console.log(results);
                    }
                  );
                else res.json({ msg: 'no permission' });
              }
            }
          );
        }
      }
    );
  }
});

module.exports = router;
