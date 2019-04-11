const canvas = document.getElementById('geochart');
const ctx = canvas.getContext('2d');
var gchart;
var norgechart;
function updateChart(form)
{
  if(norgechart==null)
  {
    norgechart=form;
  }
  if(gchart != null)
  {
    gchart.destroy();
  }
  var glabels=[];
  var gdata=[];
  var i;
  for(i in form.form)
  {
    glabels[i]=form.form[i].aar;
    gdata[i]=form.form[i].percent;
  }
  glabels.reverse();
  gdata.reverse();
  if(norgechart==form)
  {
    console.log("ded");
    gchart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: glabels,
          datasets: [{
              label: form.areal_id,
              borderColor: 'rgb(255, 100, 255)',
              data: gdata
          }]
      },
      options: {}
  });
  }
  else {
    var ndata=[];
    for(i in norgechart.form)
    {
      ndata[i]=norgechart.form[i].percent;
    }
    gchart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: glabels,
          datasets: [{
              label: form.areal_id,
              borderColor: 'rgb(255, 100, 255)',
              data: gdata
          }, {
              label: norgechart.areal_id,
              borderColor: 'rgb(0, 100, 255)',
              data: ndata
          }]
      },
      options: {}
  });
  }
}
