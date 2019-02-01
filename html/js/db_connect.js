var mysql = require('mysql');

var con = mysql.createConnection({
  host: "18.188.167.162",
  user: "digiKartReader",
  password: "123456"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
