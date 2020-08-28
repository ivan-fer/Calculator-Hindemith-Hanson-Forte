
// DECLARACIONES Y FUNCIONES GENERALES ==========================================
/**
 * 
 * @param {type} name
 * @param {type} prime
 * @param {type} card
 * @param {type} vi
 * @returns {Forte}
 */
function Forte(name, prime, card, vi) {
   this.sName = name;     // Set Name; el nombre según Allen Forte.
   this.fPrime = prime;   // Prime Form; forma prima
   this.cardinal = card;  // la cantidad de pc que lo componen.

   this.zMate = null;     // el z de este pcs
   this.vi = vi;          // vector interválico
}

/*
 * Código gracias a Carlos Benítez: http://www.etnassoft.com/2011/06/24/array-unique-eliminar-valores-duplicados-de-un-array-en-javascript/
 * @type Function|Function
 */
Array.prototype.unique = function (a) {
   return function () {
      return this.filter(a);
   };
}(function (a, b, c) {
   return c.indexOf(a, b + 1) < 0;
});
/**
 * código mio.
 * @returns {Array.prototype@call;slice}
 */
Array.prototype.clone = function () {
   return this.slice();
};
/**
 * 
 * @type Function|Function a es un tipo de function.
 */
Array.prototype.numSort = function (a) {
   return function () {
      return this.sort(a);
   };
}(function (a, b) {
   return a - b;
});

/**
 * Muestra en el div 'forte' el nombre del pcs.
 * @param {Array} acorde El grupo de alturas ingresado por el usuario.
 * @returns {undefined}
 */
function mostrarForte(acorde) {
   var pcs = new Array();
   pcs = getPCS(acorde);         // creo un pitch class set
   var rots = getRotations(pcs);     // obtengo todas sus rotaciones.
   var pref = getPrefPCS(rots);
   transposeToZero(pref);
   var inv = getInvertedPCS(pref);
   transposeToZero(inv);
   var best = getBestOf(pref, inv);
	 var name = findName(best);
   document.getElementById("forte").innerHTML = name;
   return name;
}
// DECLARACIONES Y FUNCIONES GENERALES ==========================================
//===============================================================================
//===============================================================================

function getPCS(acorde) {
   var pcs = new Array();
   pcs = acorde.clone();
   pcs = pcs.numSort();
   pcs = pcs.unique();
   return pcs;
}

function getRotations(pcs) {
   var rots = new Array();                // todas las rotaciones del pcs.
   rots[0] = pcs.clone();                 // el original también va.

   var temp = rots[0].clone();            // obtengo una copia del array.
   for (var i = 1; i < pcs.length; i++) {
      var numb = temp.shift();            // remuevo el primer elemento del array y lo guardo.
      temp.push(numb + 12);               // agrego el elemento al final del array.
      rots[i] = temp.clone();             // y lo agrego a la lista de rotaciones.
   }
   return rots;
}

function getPrefPCS(rots) {
   if (rots.length === 1) {
      return rots[0].clone();
   }
   var d = new Array();

   d = getArrayOfDistances(rots, 0, rots[0].length - 1);
   var min = getMinDistance(d);
   var vals = new Array();
   var j = 0;
   for (var i = 0; i < d.length; i++) {
      if (d[i] === min) {
         vals[j] = rots[i].clone();     // me quedo con las rotaciones que tienen la mínima distancia.
         j++;
      }
   }
   // aquí empiezo a chequear distancia del primero con el segundo, con el tercero, etc. hasta que obtenga 1.
   var end = 1;
   while (end < vals[0].length && vals.length > 1) {
      d = getArrayOfDistances(vals, 0, end);
      min = getMinDistance(d);
      var temp = new Array();
      j = 0;
      for (var i = 0; i < d.length; i++) {
         if (d[i] === min) {
            temp[j] = vals[i].clone();     // me quedo con las rotaciones que tienen la mínima distancia.
            j++;
         }
      }
      vals = temp;
      end++;
   }
   return vals[0];
}
function getArrayOfDistances(arrRots, start, end) {
   var dists = new Array();
   for (var i = 0; i < arrRots.length; i++) {
      dists[i] = arrRots[i][end] - arrRots[i][start];  // distancia entre 'end' y 'start'.
   }
   return dists;
}
function getMinDistance(dists) {
   var min = 999;
   for (var i = 0; i < dists.length; i++) {
      if (dists[i] < min) {
         min = dists[i];
      }
   }
   return min;
}

function transposeToZero(pcs) {
   var zero = pcs[0];
   for (var i = 0; i < pcs.length; i++) {
      pcs[i] = pcs[i] - zero;
   }
}

function getInvertedPCS(pcs) {
   var inv = pcs.clone();
   for (var i = 0; i < inv.length; i++) {
      inv[i] = (12 - inv[i]) % 12;
   }
   inv = inv.numSort();
   var rots = getRotations(inv); 
   var pref = getPrefPCS(rots);
   transposeToZero(pref);
   return pref;
}

function getBestOf(pcs1, pcs2) {
   for (var i = 1; i < pcs1.length; i++) {
		 if(pcs1[i] !== pcs2[i]) {
	      if (pcs1[i] < pcs2[i]) {
  	       return pcs1;
    	  } else {
      	   return pcs2;
	      }
		 }
   }
   return pcs1;
}

function findName(pcs) {
   var tam = pcs.length;
   var acorde = new Array();
   switch (tam) {
      case 3:
         acorde = pcs3;
         break;
      case 4:
         acorde = pcs4;
         break;
      case 5:
         acorde = pcs5;
         break;
      case 6:
         acorde = pcs6;
         break;
      case 7:
         acorde = pcs7;
         break;
      case 8:
         acorde = pcs8;
         break;
      case 9:
         acorde = pcs9;
         break;
      default:
         return "No Forte name";
   }
   var pstr = pcs.toString();
   for (var i = 0; i < acorde.length; i++) {
      if (pstr === acorde[i].fPrime) {
         return acorde[i].sName;
      }
   }
   return "indefinida";
}


//=====================================================================
//=====================================================================
// EL PCS, todo!
var pcs3 = new Array();
pcs3[0] = new Forte("3-1", "0,1,2", 3, "210000");
pcs3[1] = new Forte("3-2", "0,1,3", 3, "111000");
pcs3[2] = new Forte("3-3", "0,1,4", 3, "101100");
pcs3[3] = new Forte("3-4", "0,1,5", 3, "100110");
pcs3[4] = new Forte("3-5", "0,1,6", 3, "100011");
pcs3[5] = new Forte("3-6", "0,2,4", 3, "020100");
pcs3[6] = new Forte("3-7", "0,2,5", 3, "011010");
pcs3[7] = new Forte("3-8", "0,2,6", 3, "010101");
pcs3[8] = new Forte("3-9", "0,2,7", 3, "010020");
pcs3[9] = new Forte("3-10", "0,3,6", 3, "002001");
pcs3[10] = new Forte("3-11", "0,3,7", 3, "001110");
pcs3[11] = new Forte("3-12", "0,4,8", 3, "000300");

var pcs4 = new Array();
pcs4[0] = new Forte("4-1", "0,1,2,3", 4, "");
pcs4[1] = new Forte("4-2", "0,1,2,4", 4, "");
pcs4[2] = new Forte("4-3", "0,1,3,4", 4, "");
pcs4[3] = new Forte("4-4", "0,1,2,5", 4, "");
pcs4[4] = new Forte("4-5", "0,1,2,6", 4, "");
pcs4[5] = new Forte("4-6", "0,1,2,7", 4, "");
pcs4[6] = new Forte("4-7", "0,1,4,5", 4, "");
pcs4[7] = new Forte("4-8", "0,1,5,6", 4, "");
pcs4[8] = new Forte("4-9", "0,1,6,7", 4, "");
pcs4[9] = new Forte("4-10", "0,2,3,5", 4, "");
pcs4[10] = new Forte("4-11", "0,1,3,5", 4, "");
pcs4[11] = new Forte("4-12", "0,2,3,6", 4, "");
pcs4[12] = new Forte("4-13", "0,1,3,6", 4, "");
pcs4[13] = new Forte("4-14", "0,2,3,7", 4, "");
pcs4[14] = new Forte("4-z15", "0,1,4,6", 4, "");
pcs4[15] = new Forte("4-16", "0,1,5,7", 4, "");
pcs4[16] = new Forte("4-17", "0,3,4,7", 4, "");
pcs4[17] = new Forte("4-18", "0,1,4,7", 4, "");
pcs4[18] = new Forte("4-19", "0,1,4,8", 4, "");
pcs4[19] = new Forte("4-20", "0,1,5,8", 4, "");
pcs4[20] = new Forte("4-21", "0,2,4,6", 4, "");
pcs4[21] = new Forte("4-22", "0,2,4,7", 4, "");
pcs4[22] = new Forte("4-23", "0,2,5,7", 4, "");
pcs4[23] = new Forte("4-24", "0,2,4,8", 4, "");
pcs4[24] = new Forte("4-25", "0,2,6,8", 4, "");
pcs4[25] = new Forte("4-26", "0,3,5,8", 4, "");
pcs4[26] = new Forte("4-27", "0,2,5,8", 4, "");
pcs4[27] = new Forte("4-28", "0,3,6,9", 4, "");
pcs4[28] = new Forte("4-z29", "0,1,3,7", 4, "");

pcs5 = new Array();
pcs5[0] = new Forte("5-1", "0,1,2,3,4", 5, "");
pcs5[1] = new Forte("5-2", "0,1,2,3,5", 5, "");
pcs5[2] = new Forte("5-3", "0,1,2,4,5", 5, "");
pcs5[3] = new Forte("5-4", "0,1,2,3,6", 5, "");
pcs5[4] = new Forte("5-5", "0,1,2,3,7", 5, "");
pcs5[5] = new Forte("5-6", "0,1,2,5,6", 5, "");
pcs5[6] = new Forte("5-7", "0,1,2,6,7", 5, "");
pcs5[7] = new Forte("5-8", "0,2,3,4,6", 5, "");
pcs5[8] = new Forte("5-9", "0,1,2,4,6", 5, "");
pcs5[9] = new Forte("5-10", "0,1,3,4,6", 5, "");
pcs5[10] = new Forte("5-11", "0,2,3,4,7", 5, "");
pcs5[11] = new Forte("5-z12", "0,1,3,5,6", 5, "");
pcs5[12] = new Forte("5-13", "0,1,2,4,8", 5, "");
pcs5[13] = new Forte("5-14", "0,1,2,5,7", 5, "");
pcs5[14] = new Forte("5-15", "0,1,2,6,8", 5, "");
pcs5[15] = new Forte("5-16", "0,1,3,4,7", 5, "");
pcs5[16] = new Forte("5-z17", "0,1,3,4,8", 5, "");
pcs5[17] = new Forte("5-z18", "0,1,4,5,7", 5, "");
pcs5[18] = new Forte("5-19", "0,1,3,6,7", 5, "");
pcs5[19] = new Forte("5-20", "0,1,5,6,8", 5, "");
pcs5[20] = new Forte("5-21", "0,1,4,5,8", 5, "");
pcs5[21] = new Forte("5-22", "0,1,4,7,8", 5, "");
pcs5[22] = new Forte("5-23", "0,2,3,5,7", 5, "");
pcs5[23] = new Forte("5-24", "0,1,3,5,7", 5, "");
pcs5[24] = new Forte("5-25", "0,2,3,5,8", 5, "");
pcs5[25] = new Forte("5-26", "0,2,4,5,8", 5, "");
pcs5[26] = new Forte("5-27", "0,1,3,5,8", 5, "");
pcs5[27] = new Forte("5-28", "0,2,3,6,8", 5, "");
pcs5[28] = new Forte("5-29", "0,1,3,6,8", 5, "");
pcs5[29] = new Forte("5-30", "0,1,4,6,8", 5, "");
pcs5[30] = new Forte("5-31", "0,1,3,6,9", 5, "");
pcs5[31] = new Forte("5-32", "0,1,4,6,9", 5, "");
pcs5[32] = new Forte("5-33", "0,2,4,6,8", 5, "");
pcs5[33] = new Forte("5-34", "0,2,4,6,9", 5, "");
pcs5[34] = new Forte("5-35", "0,2,4,7,9", 5, "");
pcs5[35] = new Forte("5-z36", "0,1,2,4,7", 5, "");
pcs5[36] = new Forte("5-z37", "0,3,4,5,8", 5, "");
pcs5[37] = new Forte("5-z38", "0,1,2,5,8", 5, "");

pcs6 = new Array();
pcs6[0] = new Forte("6-1", "0,1,2,3,4,5", 6, "");
pcs6[1] = new Forte("6-2", "0,1,2,3,4,6", 6, "");
pcs6[2] = new Forte("6-z3", "0,1,2,3,5,6", 6, "");
pcs6[3] = new Forte("6-z4", "0,1,2,4,5,6", 6, "");
pcs6[4] = new Forte("6-5", "0,1,2,3,6,7", 6, "");
pcs6[5] = new Forte("6-z6", "0,1,2,5,6,7", 6, "");
pcs6[6] = new Forte("6-7", "0,1,2,6,7,8", 6, "");
pcs6[7] = new Forte("6-8", "0,2,3,4,5,7", 6, "");
pcs6[8] = new Forte("6-9", "0,1,2,3,5,7", 6, "");
pcs6[9] = new Forte("6-z10", "0,1,3,4,5,7", 6, "");
pcs6[10] = new Forte("6-z11", "0,1,2,4,5,7", 6, "");
pcs6[11] = new Forte("6-z12", "0,1,2,4,6,7", 6, "");
pcs6[12] = new Forte("6-z13", "0,1,3,4,6,7", 6, "");
pcs6[13] = new Forte("6-14", "0,1,3,4,5,8", 6, "");
pcs6[14] = new Forte("6-15", "0,1,2,4,5,8", 6, "");
pcs6[15] = new Forte("6-16", "0,1,4,5,6,8", 6, "");
pcs6[16] = new Forte("6-z17", "0,1,2,4,7,8", 6, "");
pcs6[17] = new Forte("6-18", "0,1,2,5,7,8", 6, "");
pcs6[18] = new Forte("6-z19", "0,1,3,4,7,8", 6, "");
pcs6[19] = new Forte("6-20", "0,1,4,5,8,9", 6, "");
pcs6[20] = new Forte("6-21", "0,2,3,4,6,8", 6, "");
pcs6[21] = new Forte("6-22", "0,1,2,4,6,8", 6, "");
pcs6[22] = new Forte("6-z23", "0,2,3,5,6,8", 6, "");
pcs6[23] = new Forte("6-z24", "0,1,3,4,6,8", 6, "");
pcs6[24] = new Forte("6-z25", "0,1,3,5,6,8", 6, "");
pcs6[25] = new Forte("6-z26", "0,1,3,5,7,8", 6, "");
pcs6[26] = new Forte("6-27", "0,1,3,4,6,9", 6, "");
pcs6[27] = new Forte("6-z28", "0,1,3,5,6,9", 6, "");
pcs6[28] = new Forte("6-z29", "0,2,3,6,7,9", 6, "");
pcs6[29] = new Forte("6-30", "0,1,3,6,7,9", 6, "");
pcs6[30] = new Forte("6-31", "0,1,4,5,7,9", 6, "");
pcs6[31] = new Forte("6-32", "0,2,4,5,7,9", 6, "");
pcs6[32] = new Forte("6-33", "0,2,3,5,7,9", 6, "");
pcs6[33] = new Forte("6-34", "0,1,3,5,7,9", 6, "");
pcs6[34] = new Forte("6-35", "0,2,4,6,8,10", 6, "");
pcs6[35] = new Forte("6-z36", "0,1,2,3,4,7", 6, "");
pcs6[36] = new Forte("6-z37", "0,1,2,3,4,8", 6, "");
pcs6[37] = new Forte("6-z38", "0,1,2,3,7,8", 6, "");
pcs6[38] = new Forte("6-z39", "0,2,3,4,5,8", 6, "");
pcs6[39] = new Forte("6-z40", "0,1,2,3,5,8", 6, "");
pcs6[40] = new Forte("6-z41", "0,1,2,3,6,8", 6, "");
pcs6[41] = new Forte("6-z42", "0,1,2,3,6,9", 6, "");
pcs6[42] = new Forte("6-z43", "0,1,2,5,6,8", 6, "");
pcs6[43] = new Forte("6-z44", "0,1,2,5,6,9", 6, "");
pcs6[44] = new Forte("6-z45", "0,2,3,4,6,9", 6, "");
pcs6[45] = new Forte("6-z46", "0,1,2,4,6,9", 6, "");
pcs6[46] = new Forte("6-z47", "0,1,2,4,7,9", 6, "");
pcs6[47] = new Forte("6-z48", "0,1,2,5,7,9", 6, "");
pcs6[48] = new Forte("6-z49", "0,1,3,4,7,9", 6, "");
pcs6[49] = new Forte("6-z50", "0,1,4,6,7,9", 6, "");

pcs7 = new Array();
pcs7[0] = new Forte("7-1", "0,1,2,3,4,5,6", 7, "");
pcs7[1] = new Forte("7-2", "0,1,2,3,4,5,7", 7, "");
pcs7[2] = new Forte("7-3", "0,1,2,3,4,5,8", 7, "");
pcs7[3] = new Forte("7-4", "0,1,2,3,4,6,7", 7, "");
pcs7[4] = new Forte("7-5", "0,1,2,3,5,6,7", 7, "");
pcs7[5] = new Forte("7-6", "0,1,2,3,4,7,8", 7, "");
pcs7[6] = new Forte("7-7", "0,1,2,3,6,7,8", 7, "");
pcs7[7] = new Forte("7-8", "0,2,3,4,5,6,8", 7, "");
pcs7[8] = new Forte("7-9", "0,1,2,3,4,6,8", 7, "");
pcs7[9] = new Forte("7-10", "0,1,2,3,4,6,9", 7, "");
pcs7[10] = new Forte("7-11", "0,1,3,4,5,6,8", 7, "");
pcs7[11] = new Forte("7-z12", "0,1,2,3,4,7,9", 7, "");
pcs7[12] = new Forte("7-13", "0,1,2,4,5,6,8", 7, "");
pcs7[13] = new Forte("7-14", "0,1,2,3,5,7,8", 7, "");
pcs7[14] = new Forte("7-15", "0,1,2,4,6,7,8", 7, "");
pcs7[15] = new Forte("7-16", "0,1,2,3,5,6,9", 7, "");
pcs7[16] = new Forte("7-z17", "0,1,2,4,5,6,9", 7, "");
pcs7[17] = new Forte("7-z18", "0,1,4,5,6,7,9", 7, "");
pcs7[18] = new Forte("7-19", "0,1,2,3,6,7,9", 7, "");
pcs7[19] = new Forte("7-20", "0,1,2,5,6,7,9", 7, "");
pcs7[20] = new Forte("7-21", "0,1,2,4,5,8,9", 7, "");
pcs7[21] = new Forte("7-22", "0,1,2,5,6,8,9", 7, "");
pcs7[22] = new Forte("7-23", "0,2,3,4,5,7,9", 7, "");
pcs7[23] = new Forte("7-24", "0,1,2,3,5,7,9", 7, "");
pcs7[24] = new Forte("7-25", "0,2,3,4,6,7,9", 7, "");
pcs7[25] = new Forte("7-26", "0,1,3,4,5,7,9", 7, "");
pcs7[26] = new Forte("7-27", "0,1,2,4,5,7,9", 7, "");
pcs7[27] = new Forte("7-28", "0,1,3,5,6,7,9", 7, "");
pcs7[28] = new Forte("7-29", "0,1,2,4,6,7,9", 7, "");
pcs7[29] = new Forte("7-30", "0,1,2,4,6,8,9", 7, "");
pcs7[30] = new Forte("7-31", "0,1,3,4,6,7,9", 7, "");
pcs7[31] = new Forte("7-32", "0,1,3,4,6,8,9", 7, "");
pcs7[32] = new Forte("7-33", "0,1,2,4,6,8,10", 7, "");
pcs7[33] = new Forte("7-34", "0,1,3,4,6,8,10", 7, "");
pcs7[34] = new Forte("7-35", "0,1,3,5,6,8,10", 7, "");
pcs7[35] = new Forte("7-z36", "0,1,2,3,5,6,8", 7, "");
pcs7[36] = new Forte("7-z37", "0,1,3,4,5,7,8", 7, "");
pcs7[37] = new Forte("7-z38", "0,1,2,4,5,7,8", 7, "");

pcs8 = new Array();
pcs8[0] = new Forte("8-1", "0,1,2,3,4,5,6,7", 8, "");
pcs8[1] = new Forte("8-2", "0,1,2,3,4,5,6,8", 8, "");
pcs8[2] = new Forte("8-3", "0,1,2,3,4,5,6,9", 8, "");
pcs8[3] = new Forte("8-4", "0,1,2,3,4,5,7,8", 8, "");
pcs8[4] = new Forte("8-5", "0,1,2,3,4,6,7,8", 8, "");
pcs8[5] = new Forte("8-6", "0,1,2,3,5,6,7,8", 8, "");
pcs8[6] = new Forte("8-7", "0,1,2,3,4,5,8,9", 8, "");
pcs8[7] = new Forte("8-8", "0,1,2,3,4,7,8,9", 8, "");
pcs8[8] = new Forte("8-9", "0,1,2,3,6,7,8,9", 8, "");
pcs8[9] = new Forte("8-10", "0,2,3,4,5,6,7,9", 8, "");
pcs8[10] = new Forte("8-11", "0,1,2,3,4,5,7,9", 8, "");
pcs8[11] = new Forte("8-12", "0,1,3,4,5,6,7,9", 8, "");
pcs8[12] = new Forte("8-13", "0,1,2,3,4,6,7,9", 8, "");
pcs8[13] = new Forte("8-14", "0,1,2,4,5,6,7,9", 8, "");
pcs8[14] = new Forte("8-z15", "0,1,2,3,4,6,8,9", 8, "");
pcs8[15] = new Forte("8-16", "0,1,2,3,5,7,8,9", 8, "");
pcs8[16] = new Forte("8-17", "0,1,3,4,5,6,8,9", 8, "");
pcs8[17] = new Forte("8-18", "0,1,2,3,5,6,8,9", 8, "");
pcs8[18] = new Forte("8-19", "0,1,2,4,5,6,8,9", 8, "");
pcs8[19] = new Forte("8-20", "0,1,2,4,5,7,8,9", 8, "");
pcs8[20] = new Forte("8-21", "0,1,2,3,4,6,8,10", 8, "");
pcs8[21] = new Forte("8-22", "0,1,2,3,5,6,8,10", 8, "");
pcs8[22] = new Forte("8-23", "0,1,2,3,5,7,8,10", 8, "");
pcs8[23] = new Forte("8-24", "0,1,2,4,5,6,8,10", 8, "");
pcs8[24] = new Forte("8-25", "0,1,2,4,6,7,8,10", 8, "");
pcs8[25] = new Forte("8-26", "0,1,3,4,5,7,8,10", 8, "");
pcs8[26] = new Forte("8-27", "0,1,2,4,5,7,8,10", 8, "");
pcs8[27] = new Forte("8-28", "0,1,3,4,6,7,9,10", 8, "");
pcs8[28] = new Forte("8-z29", "0,1,2,3,5,6,7,9", 8, "");

pcs9 = new Array();
pcs9[0] = new Forte("9-1", "0,1,2,3,4,5,6,7,8", 9, "");
pcs9[1] = new Forte("9-2", "0,1,2,3,4,5,6,7,9", 9, "");
pcs9[2] = new Forte("9-3", "0,1,2,3,4,5,6,8,9", 9, "");
pcs9[3] = new Forte("9-4", "0,1,2,3,4,5,7,8,9", 9, "");
pcs9[4] = new Forte("9-5", "0,1,2,3,4,6,7,8,9", 9, "");
pcs9[5] = new Forte("9-6", "0,1,2,3,4,5,6,8,10", 9, "");
pcs9[6] = new Forte("9-7", "0,1,2,3,4,5,7,8,10", 9, "");
pcs9[7] = new Forte("9-8", "0,1,2,3,4,6,7,8,10", 9, "");
pcs9[8] = new Forte("9-9", "0,1,2,3,5,6,7,8,10", 9, "");
pcs9[9] = new Forte("9-10", "0,1,2,3,4,6,7,9,10", 9, "");
pcs9[10] = new Forte("9-11", "0,1,2,3,5,6,7,9,10", 9, "");
pcs9[11] = new Forte("9-12", "0,1,2,4,5,6,8,9,10", 9, "");


/*
 * EXPLICACIÓN DEL CÓDIGO ANTERIOR:
 guzman
 a ver si he entendido como funciona esto
 con “Array.prototype.unique” añadimos al prototipo de array una nueva funcion unique
 
 esta funcion espera un parametro “a” y llama a la funcion “filter” de array
 la funcion filter() de los array crea un nuevo array, con todos los elementos que cumplen ciertos requisitos
 
 los requisitos se indican con una funcion que se pasa como parametro a filter
 osea “array.filter(funcion_que_dice_si_un_elemento_va_a_estar_en_el_array_devuelto)”
 // para mas detalles
 //http://www.tutorialspoint.com/javascript/array_filter.htm
 
 asi que cuando escribamos “myArr.unique() ” se llama a:
 
 function(a){
 return function(){
 return this.filter(a)
 }
 }
 con esto claro viene la segunda parte,
 
 despues de la defincion de la funcion hay unos parentesis por lo que la funcion es auto ejecutable
 asi que se añade ella sola al prototipo
 
 (
 function(a,b,c){
 return c.indexOf(a,b+1)<0
 }
 );
 por ultimo:
 
 como parametro se manda una funcion
 
 function(a,b,c){
 return c.indexOf(a,b+1)<0
 }
 que es la que espera el metodo filter, como siempre nos hacen trampa estos del javascript y la funcion filter espera tres parametros que si no nos dicen lo que significa cada uno nos va a parecer chino, pero si nos dicen: filter(element, index, array) pues esta mas claro
 
 asi que la funcion lo que hace es mira a ver si en el array que estoy construyendo ya esta el elemento siguiente
 
 c= array que estoy construyendo
 a= elemento que estoy mirando a ver si lo añado
 b= indice del elemento
 indexOf = el elemento esta en el array
 <0 = el indexOf devuelve -1 si el elemento no esta
 
 convertido a cristiano:
 
 function(elemento_a_mirar_si_añado_al_array,indice_del_elemeno_que_estoy_mirando,array_con_los_elementos_ya_añadidos){
 return array_con_los_elementos_ya_añadidos.indexOf(
 elemento_a_mirar_si_añado_al_array,
 indice_del_elemeno_que_estoy_mirando+1
 )<0
 }
 */
