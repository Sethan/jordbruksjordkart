
var ids=[];
var percentages=[];
var translatingtable = [["904","924","923"],["709","707","708","725","726","727","712"],["704","705","721"],["106","103","113","131","133","134"],["105","102","130","114","115"],["1160","1154","1159","1214"],["1231","1230"],["612","601"],["605","601"],["403","401","414"],["519","518"],["516","518"],["436","435"],["441","435"],["1504","1501"],["1523","1527"],["1505","1503","1556"],["1576","1569","1572"],["1756","1723","1729","5053"],["1813","1814"],["1874","1858"],["1903","1901","1915"],["1923","1921","1920"],["2004","2001","2017"],["906","903"],["1160","1154","1159"],["1449","1448"],["1915","1903"],["1723","1756","5053"],["706","710"],["719","710"],["720","710"],["722","729"],["723","729"],["702","715"],["714","715"],["728","712"],["1622","5016"],["1627","5017"],["1749","5049"],["1748","5048"],["1717","5036"],["1620","5014"],["1742","5045"],["1612","5011"],["1617","5013"],["1644","5026"],["1743","5046"],["1662","5030"],["1755","5052"],["1719","5037"],["1738","5042"],["1663","5031"],["1636","5023"],["1653","5028"],["1711","5034"],["1648","5027"],["1725","5040"],["1703","5005"],["1740","5044"],["1751","5051"],["1634","5021"],["1638","5024"],["1633","5020"],["1744","5047"],["1635","5022"],["1632","5019"],["1640","5025"],["1739","5043"],["1664","5032"],["1657","5029"],["1613","5012"],["1736","5041"],["1702","5004"],["1714","5035"],["1601","5001"],["1665","5033"],["1721","5038"],["1724","5039"],["1750","5050"],["1621","5015"],["1630","5018"],["1624","5054"],["1718","5054"],["0701","0717"],["1201","1248","1249","1250","1255","1301"]];

var rootedIds = ["101","104","105","106","111","118","119","121","122","123","124","125","127","128","135","136","137","138","211","213","214","215","216","217","219","220","221","226","227","228","229","230","231","233","234","235","236","237","238","239","301","402","403","412","415","417","418","419","420","423","425","426","427","428","429","430","432","434","436","437","438","439","441","501","502","511","512","513","514","515","516","517","519","520","521","522","528","529","532","533","534","536","538","540","541","542","543","544","545","602","604","605","612","615","616","617","618","619","620","621","622","623","624","625","626","627","628","631","632","633","701","702","704","706","709","711","713","714","715","716","719","720","722","723","728","805","806","807","811","814","815","817","819","821","822","826","827","828","829","830","831","833","834","901","904","906","911","912","914","919","926","928","929","935","937","938","940","941","1001","1002","1003","1004","1014","1017","1018","1021","1026","1027","1029","1032","1034","1037","1046","1101","1102","1103","1106","1111","1112","1114","1119","1120","1121","1122","1124","1127","1129","1130","1133","1134","1135","1141","1142","1144","1145","1146","1149","1151","1160","1201","1211","1216","1219","1221","1222","1223","1224","1227","1228","1231","1232","1233","1234","1235","1238","1241","1242","1243","1244","1245","1246","1247","1251","1252","1253","1256","1259","1260","1263","1264","1265","1266","1401","1411","1412","1413","1416","1417","1418","1419","1420","1421","1422","1424","1426","1428","1429","1430","1431","1432","1433","1438","1439","1441","1443","1444","1445","1449","1502","1504","1505","1511","1514","1515","1516","1517","1519","1520","1523","1524","1525","1526","1528","1529","1531","1532","1534","1535","1539","1543","1545","1546","1547","1548","1551","1554","1557","1560","1563","1566","1567","1571","1573","1576","1601","1612","1613","1617","1620","1621","1622","1624","1627","1630","1632","1633","1634","1635","1636","1638","1640","1644","1645","1648","1653","1657","1662","1663","1664","1665","1702","1703","1711","1714","1717","1718","1719","1721","1723","1724","1725","1729","1736","1738","1739","1740","1742","1743","1744","1748","1749","1750","1751","1755","1756","1804","1805","1811","1812","1813","1815","1816","1818","1820","1822","1824","1825","1826","1827","1828","1832","1833","1834","1835","1836","1837","1838","1839","1840","1841","1845","1848","1849","1850","1851","1852","1853","1854","1856","1857","1859","1860","1865","1866","1867","1868","1870","1871","1874","1901","1902","1903","1911","1913","1915","1917","1919","1920","1922","1923","1924","1925","1926","1927","1928","1929","1931","1933","1936","1938","1939","1940","1941","1942","1943","2002","2003","2004","2011","2012","2014","2015","2017","2018","2019","2020","2021","2022","2023","2024","2025","2027","2028","2030"]
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
	document.getElementById("Form").style.display="none";
	document.getElementById("NO").style.display="block";
	document.getElementById("myRange").style.display="block";
  document.getElementById("chartContainer").style.display="none";
  document.getElementById("TopList").style.display="none";
  document.getElementById("digiKart").style.display="block";
}
function showGraph()
{
  document.getElementById("chartContainer").style.display="block";
	document.getElementById("Form").style.display="none";
  document.getElementById("NO").style.display="none";
	document.getElementById("myRange").style.display="none";
  document.getElementById("TopList").style.display="none";
  document.getElementById("digiKart").style.display="none";
}
function showTop()
{
  document.getElementById("TopList").style.display="block";
  document.getElementById("NO").style.display="none";
	document.getElementById("myRange").style.display="none";
  document.getElementById("chartContainer").style.display="none";
  document.getElementById("Form").style.display="none";
  document.getElementById("digiKart").style.display="none";
}
function showSearch()
{
	document.getElementById("Form").style.display="block";
	document.getElementById("NO").style.display="none";
	document.getElementById("myRange").style.display="none";
  document.getElementById("chartContainer").style.display="none";
  document.getElementById("TopList").style.display="none";
  document.getElementById("digiKart").style.display="none";
}
function reqListener(data) {
	var temp=this.response;
	temp=temp.replace(/[^\d,.]/g, '');
	var temparray=temp.split(",");
	var n
  percentages=[];
  ids=[];
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
  console.log(percentages.length);
	load();
}

initialize(2018);

function initialize(number)
{
  document.getElementById("slidertext").textContent=number;
	var params = "year="+number;
	var oReq = new XMLHttpRequest();
	oReq.addEventListener("load", reqListener);
	oReq.open("GET","/api"+"?"+params);
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
}

function load()
{
  var i;
  for(i in rootedIds)
  {
  	var location;
    var index=ids.indexOf(rootedIds[i]);
    if(index===-1)
    {
      var t;
      for(t in translatingtable)
      {
        if(rootedIds[i]==translatingtable[t][0])
        {
          var v;
          var average=0;
          var modifier=1;
          for(v in translatingtable[t])
          {
            if(v>0)
            {
              if(percentages[ids.indexOf(translatingtable[t][v])])
              {
                average=average+Number(percentages[ids.indexOf(translatingtable[t][v])]);
              }
              else {
                modifier++;
              }

            }
          }
          average=average/(translatingtable[t].length-modifier);
          colorize(average,rootedIds[i]);
          if(rootedIds[i]=="709")
          {
            console.log(average);
          }
          break
        }
      }
    }
    else
    {
    	colorize(percentages[index],ids[index]);
    }
  }
}

function colorize(percentage,id)
{
  var red=255-35*Math.log2(percentage*100+1);
  var green=35*Math.log2(percentage*100+1);
  if(id<1000)
  {
    id="0"+id;
  }
  if(document.getElementById(id))
  {
      document.getElementById(id).style.fill=rgb(red,green,0);
      document.getElementById(id).addEventListener('click', updateForm2 ,true);
  }
}
function updateForm()
{
		areaformat.setState({areal_id:document.getElementById('forminput').value});
		areaformat.componentDidMount();
    return false;
}
function updateForm2()
{
		areaformat.setState({areal_id:this.id});
		areaformat.componentDidMount();
    return false;
}
function rgb(r, g, b){
  r = Math.floor(r/1.5);
  g = Math.floor(g);
  b = Math.floor(b);
  return ["rgb(",r,",",g,",",b,")"].join("");
}
