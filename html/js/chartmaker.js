var ctx = document.getElementById('geochart').getContext('2d');
function updateChart(form)
{
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
var chart = new Chart(ctx, {
    // The type of chart we want to create

    type: 'line',
    // The data for our dataset
    data: {
        labels: glabels,
        datasets: [{
            label: form.areal_id,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: gdata
        }]
    },

    // Configuration options go here
    options: {}
});
}
