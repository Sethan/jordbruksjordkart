
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


var oReq = new XMLHttpRequest();
oReq.addEventListener("load", reqListener);
oReq.open("GET", "/api");
oReq.send();





function load(){
var i;
for(i in ids){
	var location;
	var color=percentages[i]*1000+50;
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
			document.getElementById(location).style.fill=rgb(0,color,0);
	}

}

}


function rgb(r, g, b){
  r = Math.floor(r);
  g = Math.floor(g);
  b = Math.floor(b);
  return ["rgb(",r,",",g,",",b,")"].join("");
}
