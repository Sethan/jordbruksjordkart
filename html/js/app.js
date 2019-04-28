
var ids=[];
var percentages=[];
function showMap()
{
	document.getElementById("Form").style.display="none";
	document.getElementById("NO").style.display="block";
  document.getElementById("geochart").style.display="none";
	document.getElementById("TopList").style.display="none";
	document.getElementById("digiKart").style.display="block";

  document.getElementById("mainbtn").onclick = function () { showGraph(); };
  document.getElementById("mainbtn").value = "Graf";

	document.getElementById("secbtn").onclick = function () { showTop();};
	document.getElementById("secbtn").value = "Topliste";

}

function showGraph()
{
  document.getElementById("geochart").style.display="block";
	document.getElementById("Form").style.display="none";
  document.getElementById("NO").style.display="none";
	document.getElementById("myRange").style.display="block";
	document.getElementById("TopList").style.display="none";
	document.getElementById("digiKart").style.display="none";

  document.getElementById("mainbtn").onclick = function () { showMap();};
  document.getElementById("mainbtn").value = "Kart";

	document.getElementById("secbtn").onclick = function () { showGeo();};
	document.getElementById("secbtn").value = "Geo";

}
function showTop()
{
  document.getElementById("TopList").style.display="block";
  document.getElementById("NO").style.display="none";
  document.getElementById("geochart").style.display="none";
  document.getElementById("Form").style.display="none";
  document.getElementById("digiKart").style.display="none";

	document.getElementById("secbtn").onclick = function () { showMap();};
	document.getElementById("secbtn").value = "Back";
}
function showGeo()
{
	document.getElementById("Form").style.display="none";
	document.getElementById("NO").style.display="none";
  document.getElementById("geochart").style.display="block";
  document.getElementById("TopList").style.display="none";
  document.getElementById("digiKart").style.display="none";

	document.getElementById("secbtn").onclick = function () { showGraph();};
	document.getElementById("secbtn").value = "Back";
}

function startInc()
{
	var myVar = setInterval(increment, 1200);

	function increment()
	{
		var range = document.getElementById("myRange").value;
		if (range > 1996)
			clearInterval(myVar);
		if (range = 2017)
			document.getElementById("myRange").value = "1996";
		if (range < 2017)
		{
			while (range < 2017) {
				document.getElementById("myRange").stepUp(1);
				var range = document.getElementById("myRange").value;
			}
		clearInterval(myVar);
		}
	}
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
  document.getElementById("slidertext").textContent=number;
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
    var n=this.value;
		if(n==1996)
		{
      n=1969;
		}
		else if (n==1997)
		{
      n=1979;
		}
		else if (n==1998)
		{
      n=1989;
		}
    initialize(parseInt(n));
    updateTop(n);
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
    return false;
}

function updateTop(number)
{
  topformat.setState({aar:number});
  topformat.componentDidMount();
}

function rgb(r, g, b){
  r = Math.floor(r);
  g = Math.floor(g);
  b = Math.floor(b);
  return ["rgb(",r,",",g,",",b,")"].join("");
}
