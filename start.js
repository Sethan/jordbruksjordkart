var express = require('express');
var app = express();
var db = require('./html/js/db_connect');
var bodyParser = require('body-parser');



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
  if(req.query.area_id)
  {
    var q="";
    //select sum(landbruksareal), kommunelandbruksareal.aar, fylke.id from kommune, fylke, kommuner_over_tid, kommunelanadress ="/getinfo?areal_id="+this.state.areal_id;dbruksareal where fylke.id=Fylke_id and kommune.id=kommuner_over_tid.kommune_id and kommunelandbruksareal.kommune_id=kommune.id GROUP BY fylke.id,kommunelandbruksareal.aar;
    //db.query("SELECT id, (sum(landbruksareal)/(areal*1000.0*count(*))) as averagepercent FROM kommune, kommunelandbruksareal where Kommune_id="+req.query.areal_id+" and Kommune_id=id", function (err, result, fields) {
    if(isNaN(req.query.area_id))
    {
      q="SELECT landbruksareal,areal, aar, (landbruksareal/(areal*10.0)) as percent FROM kommune, kommunelandbruksareal where kommune.navn='"+req.query.area_id+"' and Kommune_id=id";
      db.query(q, function (err, result, fields) {
          if (err) throw err;
          if(result=="")
          {
            db.query("select sum(landbruksareal) as landbruksareal, sum(kommune.areal) as areal, kommunelandbruksareal.aar as aar, (sum(landbruksareal)/(sum(kommune.areal)*10.0)) as percent from kommune, fylke, kommuner_over_tid, kommunelandbruksareal where fylke.id=Fylke_id and fylke.navn='"+req.query.area_id+"' and kommune.id=kommuner_over_tid.kommune_id and kommunelandbruksareal.kommune_id=kommune.id GROUP BY fylke.id,kommunelandbruksareal.aar", function (err2, result2, fields2) {
                if (err2) throw err;
                  res.send(JSON.stringify(result2));
              });
          }
          else {
              res.send(JSON.stringify(result));
          }

      });
    }
    else {
      if(req.query.area_id>99)
      {
        q="SELECT landbruksareal,areal, aar, (landbruksareal/(areal*10.0)) as percent FROM kommune, kommunelandbruksareal where Kommune_id="+req.query.area_id+" and Kommune_id=id";
      }
      else {
        q="select sum(landbruksareal) as landbruksareal, sum(kommune.areal) as areal, kommunelandbruksareal.aar as aar, (sum(landbruksareal)/(sum(kommune.areal)*10.0)) as percent from kommune, fylke, kommuner_over_tid, kommunelandbruksareal where fylke.id=Fylke_id and fylke.id="+req.query.area_id+" and kommune.id=kommuner_over_tid.kommune_id and kommunelandbruksareal.kommune_id=kommune.id GROUP BY fylke.id,kommunelandbruksareal.aar";
      }
      db.query(q, function (err, result, fields) {
          if (err) throw err;
          res.send(JSON.stringify(result));
      });
    }
  }
});


app.listen(3000);
