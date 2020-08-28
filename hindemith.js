function Hanson() {
   this.p = 0;
   this.m = 0;
   this.n = 0;
   this.s = 0;
   this.d = 0;
   this.t = 0;
}
var hn = new Hanson();

/** CALCULADOR DEL ROOT **/
var chords = new Array();   // La lista de alturas que ingresa el usuario.
var best = -1;              // el mejor intervalo del acorde.
var root = -1;              // el root del acorde.
var intervs = new Array();  // la lista de intervalos que tiene el acorde.
var firstPC = new Array();
var seconPC = new Array();
var fName = "";  // Nombre de forte

// Obtiene el acorde de la caja de texto 'txtChord'.
function obtChord() {
   var d = document;

   var ch = d.entries.txtChord;
   var k = 0;
   for (var i = 0; i < ch.value.length; i++) {
      if (ch.value[i] !== " ") {
         if (ch.value[i] === "t") {
            chords[k] = 10;
         } else if (ch.value[i] === "e") {
            chords[k] = 11;
         } else {
            chords[k] = parseInt(ch.value[i]);
         }
         k++;
      }
   }

}

function mod12Sub(pcA, pcB) {
   if (pcA < pcB) {
      return (12 - (pcB - pcA));
   } else {
      return (pcA - pcB);
   }
}

function crearIntervalos() {
   var k = 0;
   for (var i = 0; i < chords.length - 1; i++) {
      for (var j = i + 1; j < chords.length; j++) {
         intervs[k] = mod12Sub(chords[j], chords[i]);
         firstPC[k] = chords[i];
         seconPC[k] = chords[j];
         k++;
      }
   }
}

function hallarRoot() {
   if (contains(7)) {
      best = intervs.indexOf(7);
      root = firstPC[best];
   } else if (contains(5)) {
      best = intervs.indexOf(5);
      root = seconPC[best];
   } else if (contains(4)) {
      best = intervs.indexOf(4);
      root = firstPC[best];
   } else if (contains(8)) {
      best = intervs.indexOf(8);
      root = seconPC[best];
   } else if (contains(3)) {
      best = intervs.indexOf(3);
      root = firstPC[best];
   } else if (contains(9)) {
      best = intervs.indexOf(9);
      root = seconPC[best];
   } else if (contains(2)) {
      best = intervs.indexOf(2);
      root = seconPC[best];
   } else if (contains(10)) {
      best = intervs.indexOf(10);
      root = firstPC[best];
   } else if (contains(1)) {
      best = intervs.indexOf(1);
      root = seconPC[best];
   } else if (contains(11)) {
      best = intervs.indexOf(11);
      root = firstPC[best];
   } else if (contains(6)) {
      best = intervs.indexOf(6);
      root = "undefined";
   }
}

function contains(inter) {
   for (var i = 0; i < intervs.length; i++) {
      if (intervs[i] === inter) {
         return true;
      }
   }
   return false;
}

function escribirRoot() {
   var temp;
   if (root === 0) {
      temp = "C";
   } else if (root === 1) {
      temp = "C# / Db";
   } else if (root === 2) {
      temp = "D";
   } else if (root === 3) {
      temp = "D# / Eb";
   } else if (root === 4) {
      temp = "E";
   } else if (root === 5) {
      temp = "F";
   } else if (root === 6) {
      temp = "F# / Gb";
   } else if (root === 7) {
      temp = "G";
   } else if (root === 8) {
      temp = "G# / Ab";
   } else if (root === 9) {
      temp = "A";
   } else if (root === 10) {
      temp = "A# / Bb";
   } else if (root === 11) {
      temp = "B";
   }
   document.getElementById("hindemith").innerHTML = temp;
}

// Calcula el Root y lo guarda en 'root'
function calcRoot() {
   chords = new Array();
   intervs = new Array();
   firstPC = new Array();
   seconPC = new Array();
   hn = new Hanson();
   obtChord();
   crearIntervalos();
   hallarRoot();
   escribirRoot();

   calcCantIntervs();
   escribirHanson();
   fName = mostrarForte(chords);
   escrHindemithClasification();
}

// calculador de intervalos para hanson
function calcCantIntervs() {
   for (var i = 0, max = intervs.length; i < max; i++) {
      if (intervs[i] === 5 || intervs[i] === 7) {
         hn.p += 1;
      }
      if (intervs[i] === 4 || intervs[i] === 8) {
         hn.m += 1;
      }
      if (intervs[i] === 3 || intervs[i] === 9) {
         hn.n += 1;
      }
      if (intervs[i] === 2 || intervs[i] === 10) {
         hn.s += 1;
      }
      if (intervs[i] === 1 || intervs[i] === 11) {
         hn.d += 1;
      }
      if (intervs[i] === 6) {
         hn.t += 1;
      }
   }
}

function escribirHanson() {
   var cad = "";
   if (hn.p > 0) {
      cad += "p";
   }
   if (hn.p > 1) {
      cad += "<sup>" + hn.p + "</sup>";
   }
   if (hn.m > 0) {
      cad += "m";
   }
   if (hn.m > 1) {
      cad += "<sup>" + hn.m + "</sup>";
   }
   if (hn.n > 0) {
      cad += "n";
   }
   if (hn.n > 1) {
      cad += "<sup>" + hn.n + "</sup>";
   }
   if (hn.s > 0) {
      cad += "s";
   }
   if (hn.s > 1) {
      cad += "<sup>" + hn.s + "</sup>";
   }
   if (hn.d > 0) {
      cad += "d";
   }
   if (hn.d > 1) {
      cad += "<sup>" + hn.d + "</sup>";
   }
   if (hn.t > 0) {
      cad += "t";
   }
   if (hn.t > 1) {
      cad += "<sup>" + hn.t + "</sup>";
   }
   document.getElementById("hanson").innerHTML = cad;
}

function escrHindemithClasification() {
   var cad = "undefined";
   if (hn.t === 0) {                     // Si no tiene tritonos...
      if (fName === "3-11") {            // si es acorde mayor o menor.
         if (root === chords[0]) {      // categoría I
            cad = "I.1";
         } else {
            cad = "I.2";
         }
      } else {
         if (fName === "3-12" || fName === "3-9") {  // categoría V
            cad = "V";
         } else if (hn.s > 0 || hn.d > 0) {
            if (root === chords[0]) {      // categoría III
               cad = "III.1";
            } else {
               cad = "III.2";
            }
         }
      }
   } else {    // tiene tritono ...
      if (fName === "3-10" || fName === "4-28") {
         cad = "VI";
      } else if (hn.d === 0) {   // grupo II; sin segundas menores ni séptimas mayores.
         if ((fName === "3-8" || fName === "4-27") && (root === chords[0])) {
            cad = "IIa";
         } else if (hn.s > 0) {
            if (hn.t > 1) {
               cad = "IIb.3";
            } else {
               if (root === chords[0]) {
                  cad = "IIb.1";
               } else {
                  cad = "IIb.2";
               }
            }
         }
      } else {   // grupo IV
         if (root === chords[0]) {
            cad = "IV.1";
         } else {
            cad = "IV.2";
         }
      }
   }
   document.getElementById("category").innerHTML = cad;
}


















