
var ids=[];
var percentages=[];

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


		if(this.value<2000&&this.value%10==9||this.value>=2000)
		{
			initialize(parseInt(this.value));
			console.log(parseInt(this.value));
		}
}

function load(){
var i;
for(i in ids){
	var location;
	var color=-5*percentages[i]*percentages[i]+percentages[i]*500+5;
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
			document.getElementById(location).style.fill=rgb(0,255,0);
					document.getElementById(location).style.opacity=color/255+0.20;

	}
	else {
		console.log(location);
	}

}

}


function rgb(r, g, b){
  r = Math.floor(r);
  g = Math.floor(g);
  b = Math.floor(b);
  return ["rgb(",r,",",g,",",b,")"].join("");
}
