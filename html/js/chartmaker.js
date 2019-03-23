const canvas = document.getElementById('geochart');
const ctx = canvas.getContext('2d');
var gchart;

function updateChart(form)
{
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
  gchart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: glabels,
        datasets: [{
            label: form.areal_id,
            backgroundColor: 'rgb(100, 255, 100)',
            borderColor: 'rgb(255, 100, 255)',
            data: gdata
        }]
    },
    options: {}
});
}
