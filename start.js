var express = require('express');
var app = express();
var db = require('./html/js/db_connect');
var bodyParser = require('body-parser')


app.use(express.static(__dirname + '/html'));
app.get('/api', function(req, res){
    if(req.query.year)
    {
      db.query("SELECT id, (landbruksareal/(areal*1000.0)) as percent FROM kommune, kommunelandbruksareal where Aar="+req.query.year+" and Kommune_id=id", function (err, result, fields) {
          if (err) throw err;
         res.send(result);
      });
    }
});
app.get('/getinfo', function(req, res){
  if(req.query.areal_id)
  {
    db.query("SELECT id, (sum(landbruksareal)/(areal*1000.0*count(*))) as averagepercent FROM kommune, kommunelandbruksareal where Kommune_id="+req.query.areal_id+" and Kommune_id=id", function (err, result, fields) {
        if (err) throw err;
       res.send(result);
    });
  }
});


function getInfo(area_id)
{

}

app.listen(3000);
