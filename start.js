var express = require('express');
var app = express();
var db = require('./html/js/db_connect');
var bodyParser = require('body-parser')

var currentRes = [];
db.query("SELECT id, (landbruksareal/(areal*1000.0)) as percent FROM kommune, kommunelandbruksareal where Aar=1969 and Kommune_id=id", function (err, result, fields) {
    if (err) throw err;
	setValue(result);
});


function setValue(value) {
  currentRes = value;
}
app.use(express.static(__dirname + '/html'));


app.get('/api', function(req, res){
    res.send(currentRes);
    console.log(req.query.year);
    updateRes(req.query.year);
});
app.listen(3000);


function updateRes(years)
{
  db.query("SELECT id, (landbruksareal/(areal*1000.0)) as percent FROM kommune, kommunelandbruksareal where Aar="+years+" and Kommune_id=id", function (err, result, fields) {
      if (err) throw err;
  	setValue(result);
  });
}
