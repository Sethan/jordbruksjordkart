
var ids=[];
var percentages=[];
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
showMap();
function showMap()
{
	document.getElementById("searchbar").style.display="none";
	document.getElementById("Form").style.display="none";
	document.getElementById("NO").style.display="block";
	document.getElementById("myRange").style.display="block";
  document.getElementById("geochart").style.display="none";
}
function showGraph()
{
  document.getElementById("geochart").style.display="block";
  document.getElementById("searchbar").style.display="none";
	document.getElementById("Form").style.display="none";
  document.getElementById("NO").style.display="none";
	document.getElementById("myRange").style.display="none";
}
function showSearch()
{
	document.getElementById("searchbar").style.display="block";
	document.getElementById("Form").style.display="block";
	document.getElementById("NO").style.display="none";
	document.getElementById("myRange").style.display="none";
  document.getElementById("geochart").style.display="none";
}
function reqListener(data) {
	var temp=this.response;
	temp=temp.replace(/[^\d,.]/g, '');
	var temparray=temp.split(",");
	var n
	for(n in temparray)
	{
		if(n%2==0)
		{
			ids.push(temparray[n]);
		}
		else {
			percentages.push(temparray[n]);
		}
	}
	load();
}

initialize(1969);

function initialize(number)
{
	var params = "year="+number;
	var oReq = new XMLHttpRequest();
	oReq.addEventListener("load", reqListener);
	oReq.open("GET", "/api"+"?"+params);
	oReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
	oReq.send();
}

var slider = document.getElementById("myRange");


// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
		if(this.value==1996)
		{
			initialize(parseInt(1969));
			console.log(parseInt(1969));
		}
		else if (this.value==1997)
		{
			initialize(parseInt(1979));
			console.log(parseInt(1979));
		}
		else if (this.value==1998)
		{
			initialize(parseInt(1989));
			console.log(parseInt(1989));
		}
		else
		{
			initialize(parseInt(this.value));
			console.log(parseInt(this.value));
		}
}

function load(){
var i;
for(i in ids){
	var location;
	var red=255-35*Math.log2(percentages[i]*100+1);
	var green=35*Math.log2(percentages[i]*100+1);
	if(ids[i]<1000)
			{
				location="0"+ids[i];
			}
		else
		{
				location=ids[i];
		}
	if(document.getElementById(location))
	{
			document.getElementById(location).style.fill=rgb(red,green,0);
			document.getElementById(location).addEventListener('click', updateForm ,true);
	}
}
}

function updateForm()
{

		areaformat.setState({areal_id:document.getElementById('forminput').value});
		areaformat.componentDidMount();
    updateChart(areaformat.getState());
    return false;

}

function rgb(r, g, b){
  r = Math.floor(r);
  g = Math.floor(g);
  b = Math.floor(b);
  return ["rgb(",r,",",g,",",b,")"].join("");
}
