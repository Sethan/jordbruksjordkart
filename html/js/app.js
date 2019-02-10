var fylke;
var kommune;
var norge = document.getElementById('01').childNodes;

for(fylke in norge){
	if(norge[fylke].id>0)
	{
			norge[fylke].style.fill="green";
	}
}

