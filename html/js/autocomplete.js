function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      var c=0;
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()&&c<6) {
          console.log(c);
          c=c+1;
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong style='padding-left:10px'>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
          b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}

/*An array containing all the country names in the world:*/
var navn = ["Agdenes","Akershus Oslo","Alstahaug","Alta","Alvdal","Andebu","Andøy","Ankenes","Aremark","Arendal","Arna","Asker","Askim","Askvoll","Askøy","Audnedal","Aukra","Aure","Aurland","Aurskog-Høland","Aust-Agder","Austevoll","Austrheim","Averøy","Balestrand","Ballangen","Balsfjord","Bamble","Bardu","Beiarn","Berg","Bergen","Berlevåg","Bindal","Birkenes","Bjarkøy","Bjerkreim","Bjugn","Bodin","Bodø","Bokn","Borge","Borre","Bremanger","Brunlanes","Brønnøy","Buskerud","Bygland","Bykle","Båtsfjord","Bærum","Bø","Bømlo","Dovre","Drammen","Drangedal","Dyrøy","Dønna","Eid","Eide","Eidfjord","Eidsberg","Eidskog","Eidsvoll","Eigersund","Elverum","Enebakk","Engerdal","Etne","Etnedal","Evenes","Evje og Hornnes","Fana","Farsund","Fauske","Fedje","Fet","Finnmark","Finnøy","Fitjar","Fjaler","Fjell","Fjære","Flakstad","Flatanger","Flekkefjord","Flesberg","Flora","Flå","Folldal","Forsand","Fosnes","Fredrikstad","Frei","Frogn","Froland","Fron","Frosta","Fræna","Frøya","Fusa","Fyresdal","Færder","Førde","Gamvik","Gaular","Gausdal","Gildeskål","Giske","Gjemnes","Gjerdrum","Gjerstad","Gjesdal","Gjøvik","Gloppen","Gol","Gran","Grane","Granvin","Gratangen","Grimstad","Grong","Grue","Gulen","Gáivuotna","Hadsel","Halden","Halsa","Haltdalen","Hamar","Hamarøy","Hammerfest","Haram","Hareid","Harstad","Hasvik","Hattfjelldal","Haugesund","Hedemark","Hedrum","Hemne","Hemnes","Hemsedal","Herefoss","Herøy","Hisøy","Hitra","Hjartdal","Hjelmeland","Hobøl","Hof","Hol","Hole","Holmestrand","Holtålen","Hordaland","Hornindal","Horten","Hurdal","Hurum","Hvaler","Hyllestad","Hå","Hægebostad","Høyanger","Høylandet","Ibestad","Idd","Inderøy","Inderøy"
,"Indre Fosen","Iveland","Jevnaker","Jondal","Jølster","Karasjok","Karlsøy","Karmøy","Kautokeino","Klepp","Klæbu","Kongsberg","Kongsvinger","Kragerø","Kristiansand","Kristiansund","Kråkerøy","Krødsherad","Kvalsund","Kvam","Kvinesdal","Kvinnherad","Kviteseid","Kvitsøy","Kvæfjord","Kvænangen","Landvik","Lardal","Larvik","Lavangen","Lebesby","Leikanger","Leirfjord","Leka","Leksvik","Lenvik","Lesja","Levanger","Lier","Lierne","Lillehammer","Lillesand","Lindesnes","Lindås","Lom","Loppa","Lund","Lunner","Lurøy","Luster","Lyngdal","Lyngen","Lærdal","Lødingen","Lørenskog","Løten","Malvik","Mandal","Marker","Marnardal","Masfjorden","Meland","Meldal","Melhus","Meløy","Meråker","Midsund","Midtre Gauldal","Modalen","Modum","Moland","Molde","Moskenes","Moss","Mosvik","Mykland","Målselv","Måsøy","Møre og Romsdal","Namdalseid","Namsos","Namsskogan","Nannestad","Narvik","Naustdal","Nedre Eiker","Nes","Nesna","Nesodden","Nesseby","Nesset","Nissedal","Nittedal","Nome","Nord-Aurdal","Nord-Fron","Nord-Odal","Nord-Trøndelag","Norddal","Nordkapp","Nordland","Nordre Land","Nordreisa","Nore og Uvdal","Notodden","Nærøy","Nøtterøy","Odda","Onsøy","Oppdal","Oppegård","Oppland","Orkdal","Os Hedemark","Os Hordaland","Osen","Oslo","Osterøy","Overhalla","Porsanger","Porsgrunn","Radøy","Rakkestad","Ramnes","Rana","Randaberg","Rauma","Re","Rendalen","Rennebu","Rennesøy","Rindal","Ringebu","Ringerike","Ringsaker","Rissa","Roan","Rogaland","Rollag","Rolvsøy","Rygge","Råde","Rælingen","Rødøy","Rømskog","Røros","Røst","Røyken","Røyrvik","Salangen","Saltdal","Samnanger","Sandar","Sande","Sandefjord","Sandnes","Sandøy","Sarpsborg","Sauda","Sauherad","Sel","Selbu","Selje","Seljord","Sem","Sigdal","Siljan","Sirdal","Skaun","Skedsmo","Ski","Skien","Skiptvet","Skjeberg","Skjerstad","Skjervøy","Skjåk","Skodje","Skånland","Smøla","Snillfjord","Snåsa","Sogn og Fjordane","Sogndal","Sokndal","Sola","Solund","Songdalen","Sortland","Spydeberg","Stangaland","Stange","Stavanger","Stavern","Steigen","Steinkjer","Stjørdal","Stokke","Stor-Elvdal","Stord","Stordal","Storfjord","Strand","Stranda","Stryn","Sula","Suldal","Sund","Sunndal","Surnadal","Sveio","Svelvik","Sykkylven","Søgne","Sømna","Søndre Land","Sør-Aurdal","Sør-Fron","Sør-Odal","Sør-Trøndelag","Sør-Varanger","Sørfold","Sørreisa","Sørum","Sørøysund","Tana","Telemark","Time","Tingvoll","Tinn","Tjeldsund","Tjølling","Tjøme","Tokke","Tolga","Tolga-Os","Torsken","Tranøy","Troms","Tromsø","Tromsøy","Trondheim","Trysil","Træna","Trøgstad","Trøndelag","Tune","Tustna","Tvedestrand","Tydal","Tynset","Tysfjord","Tysnes","Tysvær","Tønsberg","Ullensaker","Ullensvang","Ulstein","Ulvik","Utsira","Vadsø","Vaksdal","Valle","Vang","Vanylven","Vardø","Varteig","Vats","Vefsn","Vega","Vegårshei","Vennesla","Verdal","Verran","Vest-Agder","Vestby","Vestfold","Vestnes","Vestre Slidre","Vestre Toten","Vestvågøy","Vevelstad","Vik","Vikna","Vindafjord","Vinje","Volda","Voss","Vågan","Vågsøy","Vågå","Våler Hedemark","Våler Østfold","Værøy","Åfjord","Ål","Ålesund","Åmli","Åmot","Årdal","Ås","Åseral","Åsnes","Øksnes","Ølen","Ørland","Ørskog","Ørsta","Østfold","Østre Toten","Øvre Eiker","Øyer","Øyestad","Øygarden","Øystre Slidre"];
/*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
autocomplete(document.getElementById("forminput"), navn);
