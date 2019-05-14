var express = require('express');
var app = express();
var db = require('./html/js/db_connect');
var bodyParser = require('body-parser');

//top 5 by percent
//select sum(landbruksareal) as landbruksareal, sum(kommune.areal) as areal, kommunelandbruksareal.aar as aar, round((sum(landbruksareal)/(sum(kommune.areal)*10.0))*10)/10 as percent from kommune, fylke, kommuner_over_tid, kommunelandbruksareal where fylke.id=Fylke_id  and kommune.id=kommuner_over_tid.kommune_id and kommunelandbruksareal.kommune_id=kommune.id GROUP BY fylke.id,kommunelandbruksareal.aar order by percent desc limit 5;

//compares percent of 1969 and 2000
//select t1.id, ((t1.percent-t2.percent)/10) as percent from (select id, (sum(landbruksareal)/sum(kommune.areal)) as percent from kommunelandbruksareal, kommune where id=kommune_id and aar=1969 group by id) as t1, (select id, (sum(landbruksareal)/sum(kommune.areal)) as percent from kommunelandbruksareal, kommune where id=kommune_id and aar=2000 group by id) as t2 where t1.id=t2.id order by percent desc limit 5;


app.get('/gettop', function(req, res){
    if(req.query.aar)
    {
      var aar=req.query.aar.split(",");
      db.query("select t1.id, t1.navn, (round(t1.percent-t2.percent)/10) as percent from (select id, navn, (sum(landbruksareal)/sum(kommune.areal)) as percent from kommunelandbruksareal, kommune where id=kommune_id and aar="+aar[1]+" and kommune.startaar<=aar and kommune.sluttaar>=aar and landbruksareal is not null and landbruksareal!=0 group by id,navn) as t1, (select id, (sum(landbruksareal)/sum(kommune.areal)) as percent from kommunelandbruksareal, kommune where id=kommune_id and aar="+aar[0]+" and kommune.startaar<=aar and kommune.sluttaar>=aar and landbruksareal is not null and landbruksareal!=0 group by id,navn) as t2 where t1.id=t2.id order by percent desc limit 5", function (err, result, fields) {
          if (err) throw err;
         res.send(result);
      });
    }
});
app.get('/getbot', function(req,res){
    if(req.query.aar)
    {
      var aar=req.query.aar.split(",");
      db.query("select t1.id, t1.navn, (round(t1.percent-t2.percent)/10) as percent from (select id, navn, (sum(landbruksareal)/sum(kommune.areal)) as percent from kommunelandbruksareal, kommune where id=kommune_id and aar="+aar[1]+" and kommune.startaar<=aar and kommune.sluttaar>=aar and landbruksareal is not null and landbruksareal!=0 group by id,navn) as t1, (select id, (sum(landbruksareal)/sum(kommune.areal)) as percent from kommunelandbruksareal, kommune where id=kommune_id and aar="+aar[0]+" and kommune.startaar<=aar and kommune.sluttaar>=aar and landbruksareal is not null and landbruksareal!=0 group by id,navn) as t2 where t1.id=t2.id order by percent asc limit 5", function (err, result, fields) {
          if (err) throw err;
         res.send(result);
      });
    }
});
app.use(express.static(__dirname + '/html'));
app.get('/api', function(req, res){
    if(req.query.year)
    {
      db.query("SELECT id, (landbruksareal/(areal*1000.0)) as percent FROM kommune, kommunelandbruksareal where Aar="+req.query.year+" and Kommune_id=id and kommune.startaar<=aar and kommune.sluttaar>=aar", function (err, result, fields) {
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
      if(req.query.area_id.toUpperCase()=="NORGE")
      {

          q="select round(sum(landbruksareal)/1000) as landbruksareal, sum(kommune.areal) as areal, kommunelandbruksareal.aar as aar, round((sum(landbruksareal)/(sum(kommune.areal)*10.0))*10)/10 as percent from kommune, fylke, kommunelandbruksareal where fylke.id=Fylke_id and kommunelandbruksareal.kommune_id=kommune.id and kommune.startaar<=aar and kommune.sluttaar>=aar GROUP BY kommunelandbruksareal.aar order by aar desc";
          db.query(q, function (err, result, fields) {
              if (err) throw err;
              res.send(JSON.stringify(result));
          });
      }
      else {
      q="SELECT round(landbruksareal/1000) as landbruksareal,areal, aar, round((landbruksareal/(areal*10.0))*10)/10 as percent FROM kommune, kommunelandbruksareal where kommune.navn='"+req.query.area_id+"' and Kommune_id=id and kommune.startaar<=aar and kommune.sluttaar>=aar order by aar DESC";
      db.query(q, function (err, result, fields) {
          if (err) throw err;
          if(result=="")
          {
            db.query("select round(sum(landbruksareal)/1000) as landbruksareal, sum(kommune.areal) as areal, kommunelandbruksareal.aar as aar, round((sum(landbruksareal)/(sum(kommune.areal)*10.0))*10)/10 as percent from kommune, fylke, kommunelandbruksareal where fylke.id=Fylke_id and fylke.navn='"+req.query.area_id+"' and kommunelandbruksareal.kommune_id=kommune.id and kommune.startaar<=aar and kommune.sluttaar>=aar and kommune.startaar<=aar and kommune.sluttaar>=aar GROUP BY fylke.id,kommunelandbruksareal.aar order by aar DESC", function (err2, result2, fields2) {
                if (err2) throw err;
                  res.send(JSON.stringify(result2));
              });
          }
          else {
              res.send(JSON.stringify(result));
          }

      });
    }
    }
    else {
      if(req.query.area_id>99)
      {
        q="SELECT round(landbruksareal/1000) as landbruksareal,areal, aar, (landbruksareal/(areal*10.0)) as percent FROM kommune, kommunelandbruksareal where Kommune_id="+req.query.area_id+" and Kommune_id=id and kommune.startaar<=aar and kommune.sluttaar>=aar order by aar DESC";
      }
      else {
        q="select round(sum(landbruksareal)/1000) as landbruksareal, sum(kommune.areal) as areal, kommunelandbruksareal.aar as aar, round((sum(landbruksareal)/(sum(kommune.areal)*10.0))*10)/10 as percent from kommune, fylke, kommunelandbruksareal where fylke.id=Fylke_id and fylke.id="+req.query.area_id+" and kommunelandbruksareal.kommune_id=kommune.id and kommune.startaar<=aar and kommune.sluttaar>=aar GROUP BY fylke.id,kommunelandbruksareal.aar order by aar DESC";
      }
      db.query(q, function (err, result, fields) {
          if (err) throw err;
          res.send(JSON.stringify(result));
      });
    }

  }
});
app.get('/getgeoinfo', function(req, res){
  q="select kommunelandbruksareal.aar as aar, round((sum(landbruksareal)/(sum(kommune.areal)*10.0))*10)/10 as percent from kommune, fylke, kommunelandbruksareal where fylke.id=Fylke_id and kommunelandbruksareal.kommune_id=kommune.id and kommune.startaar<=aar and kommune.sluttaar>=aar GROUP BY kommunelandbruksareal.aar";
  db.query(q, function (err, result, fields) {
      if (err) throw err;
      res.send(JSON.stringify(result));
  });
});


app.listen(3000);
