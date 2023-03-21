// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

var notes = {"1": 4,"2": 2,"4": 1,"8": 0.5,"16": 0.25,"32": 0.125,"64": 0.0625,"128": 0.03125};
var note = [4,2,1,0.5,0.25,0.125,0.0625,0.03125];
var arr = [1,2,4,8,16,32,64,128];
var type = {"notes": 1,"triplets": 0.667,"dotted": 1.5};
var minute="60000"

function nameNotes(){
  var divNames =  document.createElement("div");
  divNames.id = "divNames";
  document.getElementById("results").appendChild(divNames);
  for (name in type){
    upper=name.charAt(0).toUpperCase() + name.slice(1);
    var nameNota = document.createElement("p");
    var texto = document.createTextNode(upper);
    nameNota.appendChild(texto);
    document.getElementById("divNames").appendChild(nameNota);
  }
}
nameNotes();

function addElements(a,i,s) {
  var li =  document.createElement("li");
  var nameLi="nott"+a;
  li.id=nameLi;
  document.getElementById("results").appendChild(li);
  var radio = document.createElement("input");
  radio.type="radio";
  radio.name="tab";
  if (a==0){
    radio.checked="checked";
  }
  radio.id=s;
  document.getElementById(nameLi).appendChild(radio);
  var label = document.createElement("Label");
  label.setAttribute("for",s);
  label.innerHTML = s;
  document.getElementById(nameLi).appendChild(label);

  for (var key in notes){

    i++;

    var div =  document.createElement("div");
    var nameDiv= 'd'+i;
    div.id = nameDiv;
    div.className = 'h'+(i-a);
    var m="nott"+a;

    document.getElementById(m).appendChild(div);
// <label for="tabreiter-0-0">Lorem Ipsum</label>
    for (var name in type){

      var input = document.createElement("input");
      var para = document.createElement("p");
      var str = "1/";
      var t = str.concat(key);
      var text = document.createTextNode(t);

      input.name = name;
      input.className = 'resultado';
      input.disabled = true;

      para.appendChild(text);
      document.getElementById(nameDiv).appendChild(para);
      document.getElementById(nameDiv).appendChild(input);
    }
  }
}

//nombre
addElements(0,0,"Normal");
addElements(9,9,"1 Bar Added");
addElements(18,18,"2 Bar Added");
addElements(27,27,"3 Bar Added");

function addValues(a,b) {

  let entrada = document.querySelector('#bpm_input');
  var resultados = document.getElementsByClassName( 'resultado' );

  for ( var i = 0; i < resultados.length/4; i++ ) {

    (function(lockedInIndex){
      entrada.addEventListener('input', function(e){
        var locked=lockedInIndex+a;
        bpm=e.srcElement.value;
        var ms=minute/bpm;
        switch (resultados[locked].name){
          case "notes":
            var noteValue=1;
            var noteVal = lockedInIndex/3;
            var nota=note[noteVal];
            var barAdd=b*arr[noteVal]+1;
            var final=ms*nota*noteValue*barAdd;
            var result = (final - Math.floor(final)) !== 0;
              if (result)
                resultados[locked].value = parseFloat(final).toFixed(2);
              else
                resultados[locked].value = final;
            break;
          case "triplets":
            var noteValue=0.667;
            var noteVal = (lockedInIndex-1)/3;
            var nota=note[noteVal];
            var barAdd=b*arr[noteVal]+1;
            var final=ms*nota*noteValue*barAdd;
            var result = (final - Math.floor(final)) !== 0;
              if (result)
                resultados[locked].value = parseFloat(final).toFixed(2);
              else
                resultados[locked].value = final;
            break;
          case "dotted":
            var noteValue=1.5;
            var noteVal = (lockedInIndex-2)/3;
            var nota=note[noteVal];
            var barAdd=b*arr[noteVal]+1;
            var final = ms*nota*noteValue*barAdd;
            var result = (final - Math.floor(final)) !== 0;
              if (result)
                resultados[locked].value = parseFloat(final).toFixed(2);
              else
                resultados[locked].value = final;
            break;
        }
      },'false');
    })(i);
  }
}
addValues(0,0);
addValues(24,1);
addValues(48,2);
addValues(72,3);
