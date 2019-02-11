
var mysql = require('mysql');
var connection = mysql.createConnection({
	host:"localhost",
    user:"digiKartAdmin",
    password:"CSOI-83ee-676e-991b-3f20-6a41",
    database:"mydb"
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;