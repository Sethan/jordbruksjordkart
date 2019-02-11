var express = require('express');
var app = express();
var db = require('./html/js/db_connect');

var currentRes = [];
db.query("SELECT id, (landbruksareal/(areal*1000.0)) as percent FROM kommune, kommunelandbruksareal where Aar=2017 and Kommune_id=id", function (err, result, fields) {
    if (err) throw err;
	setValue(result);
  });


function setValue(value) {
  currentRes = value;
  console.log(currentRes);
}
app.use(express.static(__dirname + '/html'));
app.get('/api', function(req, res){
res.send(currentRes);
});
app.listen(3000);
