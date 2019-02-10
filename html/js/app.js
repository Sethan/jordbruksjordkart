
var array = [];

function reqListener(data) {
	array=this.response;
	console.log(array);
}


var oReq = new XMLHttpRequest();
oReq.addEventListener("load", reqListener);
oReq.open("GET", "/api");
oReq.send();



var fylke;
var kommune;
var norge = document.getElementById('01').childNodes;

for(fylke in norge){
	if(norge[fylke].id>0)
	{
			norge[fylke].style.fill="green";
	}
}