const mysql = require('mysql');
require('dotenv/config');

var db;

function connectDatabase() {
  if (!db) {
    db = mysql.createConnection({
      host: '127.0.0.3',
      user: 'root',
      password: `${process.env.mysqlpassword}`,
      database: 'test',
    });

    db.connect(function (err) {
      if (!err) {
        console.log('Database is connected!');
      } else {
        console.log(err);
      }
    });
  }
  return db;
}

module.exports = connectDatabase();
