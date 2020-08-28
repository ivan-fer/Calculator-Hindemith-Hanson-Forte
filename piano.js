//=============================================================
// VARIABLES GLOBALES
var canvas;
var ctx;
var entrada;

var tArriba = "rgb(255, 255, 255)";   // colores de las teclas sin presionar y presionadas.
var tAbajo = "rgb(60,184,251)";
var tNArriba = "rgb(0, 0, 0)";
var tNAbajo = "rgb(0,102,235)";

var CONSUME = false;// indicador para que luego de que se pinte una tecla, no se sigan chequenado las demás.


window.onload = function () {
   canvas = document.getElementById("canvas");
   ctx = canvas.getContext("2d");
   entrada = document.getElementById("entries");

   canvas.addEventListener("click", pianoOnClick, false);
   dibPiano();
};

/**
 * Limpia todos los objetos y lo deja lista para volver a usarse desde cero.
 * @returns {undefined}
 */
function resetAll() {
   document.entries.reset();
   document.results.reset();
   dibPiano();
   for (var i = 0, max = ts.length; i < max; i++) {
      ts[i].state = false;
   }
   document.getElementById("hindemith").innerHTML = "";
   document.getElementById("category").innerHTML = "";
   document.getElementById("hanson").innerHTML = "";
   document.getElementById("forte").innerHTML = "";
}

/**
 * SE LLAMA DESDE EL PIANO
 * Luego que se apreta una tecla del piano, se debe escribir a la salida.
 * @param {type} t 
 * @returns {undefined}
 */
function salida(t) {
   var chb = document.getElementById(t.valor);
   chb.checked = t.state;
   if (t.state === true) {  // la tecla se ha bajado
      entrada.txtChord.value += t.valor + " ";
   } else {                 // la tecla se ha suido
      entrada.txtChord.value = entrada.txtChord.value.replace(t.valor + " ", "");
   }
}
/**
 * SE LLAMA DESDE UN CHECKBOX
 * @param {type} chbID  Un string que es el id del checkbox.
 * @returns {undefined}
 */
function chbSalida(chbID) {
   var chb = document.getElementById(chbID);
   if (chb.checked === true) {
      entrada.txtChord.value += chbID + " ";
      chbToPiano(chbID, false);
   } else {
      entrada.txtChord.value = entrada.txtChord.value.replace(chbID + " ", "");
      chbToPiano(chbID, true);
   }
}
function chbToPiano(chbID, chequed) {
   if (chbID === "t") {
      chbID = "10";
   } else if (chbID === "e") {
      chbID = "11";
   }
   var k = parseInt(chbID);
   k = k % 12;
   var t = ts[k];
   t.state = chequed;   // quiere decir que la tecla no está apretada y debe apretarse.
   if (k === 0 || k === 2 || k === 4 || k === 5 || k === 7 || k === 9 || k === 11) {
      teclaBlancaOnClickDibujar(t);
   } else {
      teclaNegraOnClickDibujar(t);
   }
}

//=============================================================
//=============================================================
// CLASES
// clase para guardar puntos.
function Punto(x, y) {
   this.X = x;
   this.Y = y;
}

function Rectangulo(x, y, ancho, alto) {
   this.X = x;
   this.Y = y;
   this.ancho = ancho;
   this.alto = alto;

   this.rX = this.X + this.ancho;
   this.rY = this.Y + this.alto;
}

function PianoKey(nomb, valor, esNegra) {
   this.name = nomb;
   this.valor = valor;
   this.state = false;
   this.negra = esNegra;
   this.rectSup = new Rectangulo();
   this.rectInf = new Rectangulo();
}
//=============================================================
// DIBUJAR LAS TECLAS
// estado : estado 'tArriba', 'tAbajo' etc.
// t : la tecla definida en el array 'ts'
// color : el color usado para dibujar.
function dibTeclaBlanca(estado, t) {
   ctx.fillStyle = estado;
   ctx.fillRect(t.rectSup.X + 1, t.rectSup.Y + 1, t.rectSup.ancho - 1, t.rectSup.alto);
   ctx.fillRect(t.rectInf.X + 1, t.rectInf.Y, t.rectInf.ancho - 1, t.rectInf.alto - 1);
   dibTeclaBlancaBordeDerecho("rgb(0, 0, 0)", t);
}
function dibTeclaNegra(estado, t) {
   ctx.fillStyle = estado;
   ctx.fillRect(t.rectSup.X, t.rectSup.Y + 1, t.rectSup.ancho, t.rectSup.alto - 1);
   ctx.strokeStyle = tNArriba;
   ctx.strokeRect(t.rectSup.X, t.rectSup.Y, t.rectSup.ancho, t.rectSup.alto - 1);
}
function dibTeclaBlancaBordeDerecho(color, t) {
   ctx.strokeStyle = color;
   if (t.valor === 4 || t.valor === "e") {
      ctx.moveTo(t.rectSup.rX, t.rectSup.Y);
      ctx.lineTo(t.rectSup.rX, t.rectInf.rY);
   } else {
      ctx.moveTo(t.rectInf.rX, t.rectInf.Y);
      ctx.lineTo(t.rectInf.rX, t.rectInf.rY);
   }
   ctx.stroke();
}
//=============================================================
// DIBUJAR EL PIANO
function dibPiano() {
   dibTeclaBlanca(tArriba, ts[0]);
   dibTeclaNegra(tNArriba, ts[1]);
   dibTeclaBlanca(tArriba, ts[2]);
   dibTeclaNegra(tNArriba, ts[3]);
   dibTeclaBlanca(tArriba, ts[4]);
   dibTeclaBlanca(tArriba, ts[5]);
   dibTeclaNegra(tNArriba, ts[6]);
   dibTeclaBlanca(tArriba, ts[7]);
   dibTeclaNegra(tNArriba, ts[8]);
   dibTeclaBlanca(tArriba, ts[9]);
   dibTeclaNegra(tNArriba, ts[10]);
   dibTeclaBlanca(tArriba, ts[11]);

   dibTeclaBlanca(tArriba, ts[12]);
   dibTeclaNegra(tNArriba, ts[13]);
   dibTeclaBlanca(tArriba, ts[14]);
   dibTeclaNegra(tNArriba, ts[15]);
   dibTeclaBlanca(tArriba, ts[16]);
   dibTeclaBlanca(tArriba, ts[17]);
   dibTeclaNegra(tNArriba, ts[18]);
   dibTeclaBlanca(tArriba, ts[19]);
   dibTeclaNegra(tNArriba, ts[20]);
   dibTeclaBlanca(tArriba, ts[21]);
   dibTeclaNegra(tNArriba, ts[22]);
   dibTeclaBlanca(tArriba, ts[23]);

   dibTeclaBlanca(tArriba, ts[24]);
   dibTeclaNegra(tNArriba, ts[25]);
   dibTeclaBlanca(tArriba, ts[26]);
   dibTeclaNegra(tNArriba, ts[27]);
   dibTeclaBlanca(tArriba, ts[28]);
   dibTeclaBlanca(tArriba, ts[29]);
   dibTeclaNegra(tNArriba, ts[30]);
   dibTeclaBlanca(tArriba, ts[31]);
   dibTeclaNegra(tNArriba, ts[32]);
   dibTeclaBlanca(tArriba, ts[33]);
   dibTeclaNegra(tNArriba, ts[34]);
   dibTeclaBlanca(tArriba, ts[35]);

   dibBorde("rgb(0, 0, 0)");
}
function dibBorde(color) {
   ctx.strokeStyle = color;
   ctx.strokeRect(0, 0, 358, 75);
}

//=============================================================
// CONTROL DE EVENTOS
// evento de click sobre el piano. Detecta que tecla se presionó y actúa en consecuensia.
function pianoOnClick(e) {
   for (var i = 0; i < ts.length; i++) {
      var k = i % 12;
      if (k === 0 || k === 2 || k === 4 || k === 5 || k === 7 || k === 9 || k === 11) {
         teclaBlancaOnClick(e, ts[i]);
      } else {
         teclaNegraOnClick(e, ts[i]);
      }
      if (CONSUME === true) {
         salida(ts[i]);   // salida al textbox
         break;
      }
   }
   CONSUME = false;  // reseteo para que pueda volver a usarse.
}
// t: tecla específica.
function teclaBlancaOnClick(e, t) {
   if (puntoEnTeclaBlanca(e, t)) {
      teclaBlancaOnClickDibujar(t);
      CONSUME = true;   // indica para que no se hagan más chequeos.
   }
}
function teclaBlancaOnClickDibujar(t) {
   if (t.state === false) {
      dibTeclaBlanca(tAbajo, t);
      t.state = true;
   } else {
      dibTeclaBlanca(tArriba, t);
      t.state = false;
   }
}
function puntoEnTeclaBlanca(e, t) {
   if (t.activo === false) {
      return false;
   }
   if ((e.clientX - canvas.offsetLeft > t.rectSup.X && e.clientX - canvas.offsetLeft < t.rectSup.rX) &&
           (e.clientY - canvas.offsetTop > t.rectSup.Y && e.clientY - canvas.offsetTop < t.rectSup.rY)) {
      return true;
   } else if ((e.clientX - canvas.offsetLeft > t.rectInf.X && e.clientX - canvas.offsetLeft < t.rectInf.rX) &&
           (e.clientY - canvas.offsetTop > t.rectInf.Y && e.clientY - canvas.offsetTop < t.rectInf.rY)) {
      return true;
   }
   return false;
}
function teclaNegraOnClick(e, t) {
   if (puntoEnTeclaNegra(e, t)) {
      teclaNegraOnClickDibujar(t);
      CONSUME = true;   // indica para que no se hagan más chequeos.
   }
}
function teclaNegraOnClickDibujar(t) {
   if (t.state === false) {
      dibTeclaNegra(tNAbajo, t);
      t.state = true;
   } else {
      dibTeclaNegra(tNArriba, t);
      t.state = false;
   }
}
function puntoEnTeclaNegra(e, t) {
   if (t.activo === false) {
      return false;
   }
   if ((e.clientX - canvas.offsetLeft > t.rectSup.X && e.clientX - canvas.offsetLeft < t.rectSup.rX) &&
           (e.clientY - canvas.offsetTop > t.rectSup.Y && e.clientY - canvas.offsetTop < t.rectSup.rY)) {
      return true;
   }
   return false;
}

//=============================================================
//=============================================================
//=============================================================
//definir todas las teclas:

var tAncho = 17;       // ancho máximo de la tecla.
var tAltoSup = 50;        // alto máximo de la tecla.
var tAltoInf = 25;        // alto máximo de la tecla.
var tAnchoBlack = 12;  // ancho de la tecla negra.
var tAltoBlack = 50;   // alto de la tecla negra.
var posX = 0;          // posición de la tecla.
var posY = 0;

var ts = new Array();
// OCTAVA 1 =========================================================
// do1
posX = 0;
ts[0] = new PianoKey("do1", 0, false);
ts[0].rectSup = new Rectangulo(posX, posY, 10, tAltoSup);
ts[0].rectInf = new Rectangulo(posX, 50, tAncho, tAltoInf);
// do#1
posX = 10;
ts[1] = new PianoKey("do#1", 1, true);
ts[1].rectSup = new Rectangulo(posX, posY, tAnchoBlack, tAltoBlack);
ts[1].rectInf = null;
// re1
posX = 17;
ts[2] = new PianoKey("re1", 2, false);
ts[2].rectSup = new Rectangulo(posX + 5, posY, 7, tAltoSup);
ts[2].rectInf = new Rectangulo(posX, 50, tAncho, tAltoInf);
// re#1
posX = 29;
ts[3] = new PianoKey("re#1", 3, true);
ts[3].rectSup = new Rectangulo(posX, posY, tAnchoBlack, tAltoBlack);
ts[3].rectInf = null;
// mi1
posX = 34;
ts[4] = new PianoKey("mi1", 4, false);
ts[4].rectSup = new Rectangulo(posX + 7, posY, 10, tAltoSup);
ts[4].rectInf = new Rectangulo(posX, 50, tAncho, tAltoInf);

// fa1
posX = 51;
ts[5] = new PianoKey("fa1", 5, false);
ts[5].rectSup = new Rectangulo(posX, posY, 10, tAltoSup);
ts[5].rectInf = new Rectangulo(posX, 50, tAncho, tAltoInf);
// fa#1
posX = 61;
ts[6] = new PianoKey("fa#1", 6, true);
ts[6].rectSup = new Rectangulo(posX, posY, tAnchoBlack, tAltoBlack);
ts[6].rectInf = null;
// sol1
posX = 68;
ts[7] = new PianoKey("sol1", 7, false);
ts[7].rectSup = new Rectangulo(posX + 5, posY, 7, tAltoSup);
ts[7].rectInf = new Rectangulo(posX, 50, tAncho, tAltoInf);
// sol#1
posX = 80;
ts[8] = new PianoKey("sol#1", 8, true);
ts[8].rectSup = new Rectangulo(posX, posY, tAnchoBlack, tAltoBlack);
ts[8].rectInf = null;
// la1
posX = 85;
ts[9] = new PianoKey("la1", 9, false);
ts[9].rectSup = new Rectangulo(posX + 6, posY, 7, tAltoSup);
ts[9].rectInf = new Rectangulo(posX, 50, tAncho, tAltoInf);
// la#1
posX = 98;
ts[10] = new PianoKey("la#1", "t", true);
ts[10].rectSup = new Rectangulo(posX, posY, tAnchoBlack, tAltoBlack);
ts[10].rectInf = null;
// si1
posX = 102;
ts[11] = new PianoKey("si1", "e", false);
ts[11].rectSup = new Rectangulo(posX + 7, posY, 10, tAltoSup);
ts[11].rectInf = new Rectangulo(posX, 50, tAncho, tAltoInf);

// OCTAVA 2 =========================================================
// do1
posX = 119;
ts[12] = new PianoKey("do2", 0, false);
ts[12].rectSup = new Rectangulo(posX, posY, 10, tAltoSup);
ts[12].rectInf = new Rectangulo(posX, 50, tAncho, tAltoInf);
// do#1
posX = 129;
ts[13] = new PianoKey("do#2", 1, true);
ts[13].rectSup = new Rectangulo(posX, posY, tAnchoBlack, tAltoBlack);
ts[13].rectInf = null;
// re1
posX = 136;
ts[14] = new PianoKey("re2", 2, false);
ts[14].rectSup = new Rectangulo(posX + 5, posY, 7, tAltoSup);
ts[14].rectInf = new Rectangulo(posX, 50, tAncho, tAltoInf);
// re#1
posX = 148;
ts[15] = new PianoKey("re#2", 3, true);
ts[15].rectSup = new Rectangulo(posX, posY, tAnchoBlack, tAltoBlack);
ts[15].rectInf = null;
// mi1
posX = 153;
ts[16] = new PianoKey("mi2", 4, false);
ts[16].rectSup = new Rectangulo(posX + 7, posY, 10, tAltoSup);
ts[16].rectInf = new Rectangulo(posX, 50, tAncho, tAltoInf);

// fa1
posX = 170;
ts[17] = new PianoKey("fa2", 5, false);
ts[17].rectSup = new Rectangulo(posX, posY, 10, tAltoSup);
ts[17].rectInf = new Rectangulo(posX, 50, tAncho, tAltoInf);
// fa#1
posX = 180;
ts[18] = new PianoKey("fa#2", 6, true);
ts[18].rectSup = new Rectangulo(posX, posY, tAnchoBlack, tAltoBlack);
ts[18].rectInf = null;
// sol1
posX = 187;
ts[19] = new PianoKey("sol2", 7, false);
ts[19].rectSup = new Rectangulo(posX + 5, posY, 7, tAltoSup);
ts[19].rectInf = new Rectangulo(posX, 50, tAncho, tAltoInf);
// sol#1
posX = 199;
ts[20] = new PianoKey("sol#2", 8, true);
ts[20].rectSup = new Rectangulo(posX, posY, tAnchoBlack, tAltoBlack);
ts[20].rectInf = null;
// la1
posX = 204;
ts[21] = new PianoKey("la2", 9, false);
ts[21].rectSup = new Rectangulo(posX + 6, posY, 7, tAltoSup);
ts[21].rectInf = new Rectangulo(posX, 50, tAncho, tAltoInf);
// la#1
posX = 217;
ts[22] = new PianoKey("la#2", "t", true);
ts[22].rectSup = new Rectangulo(posX, posY, tAnchoBlack, tAltoBlack);
ts[22].rectInf = null;
// si1
posX = 221;
ts[23] = new PianoKey("si2", "e", false);
ts[23].rectSup = new Rectangulo(posX + 7, posY, 10, tAltoSup);
ts[23].rectInf = new Rectangulo(posX, 50, tAncho, tAltoInf);
// OCTAVA 3 =========================================================
// do1
posX = 238;
ts[24] = new PianoKey("do3", 0, false);
ts[24].rectSup = new Rectangulo(posX, posY, 10, tAltoSup);
ts[24].rectInf = new Rectangulo(posX, 50, tAncho, tAltoInf);
// do#1
posX = 248;
ts[25] = new PianoKey("do#3", 1, true);
ts[25].rectSup = new Rectangulo(posX, posY, tAnchoBlack, tAltoBlack);
ts[25].rectInf = null;
// re1
posX = 255;
ts[26] = new PianoKey("re3", 2, false);
ts[26].rectSup = new Rectangulo(posX + 5, posY, 7, tAltoSup);
ts[26].rectInf = new Rectangulo(posX, 50, tAncho, tAltoInf);
// re#1
posX = 267;
ts[27] = new PianoKey("re#3", 3, true);
ts[27].rectSup = new Rectangulo(posX, posY, tAnchoBlack, tAltoBlack);
ts[27].rectInf = null;
// mi1
posX = 272;
ts[28] = new PianoKey("mi3", 4, false);
ts[28].rectSup = new Rectangulo(posX + 7, posY, 10, tAltoSup);
ts[28].rectInf = new Rectangulo(posX, 50, tAncho, tAltoInf);

// fa1
posX = 289;
ts[29] = new PianoKey("fa3", 5, false);
ts[29].rectSup = new Rectangulo(posX, posY, 10, tAltoSup);
ts[29].rectInf = new Rectangulo(posX, 50, tAncho, tAltoInf);
// fa#1
posX = 299;
ts[30] = new PianoKey("fa#3", 6, true);
ts[30].rectSup = new Rectangulo(posX, posY, tAnchoBlack, tAltoBlack);
ts[30].rectInf = null;
// sol1
posX = 306;
ts[31] = new PianoKey("sol3", 7, false);
ts[31].rectSup = new Rectangulo(posX + 5, posY, 7, tAltoSup);
ts[31].rectInf = new Rectangulo(posX, 50, tAncho, tAltoInf);
// sol#1
posX = 318;
ts[32] = new PianoKey("sol#3", 8, true);
ts[32].rectSup = new Rectangulo(posX, posY, tAnchoBlack, tAltoBlack);
ts[32].rectInf = null;
// la1
posX = 323;
ts[33] = new PianoKey("la3", 9, false);
ts[33].rectSup = new Rectangulo(posX + 6, posY, 7, tAltoSup);
ts[33].rectInf = new Rectangulo(posX, 50, tAncho, tAltoInf);
// la#1
posX = 336;
ts[34] = new PianoKey("la#3", "t", true);
ts[34].rectSup = new Rectangulo(posX, posY, tAnchoBlack, tAltoBlack);
ts[34].rectInf = null;
// si1
posX = 340;
ts[35] = new PianoKey("si3", "e", false);
ts[35].rectSup = new Rectangulo(posX + 7, posY, 10, tAltoSup);
ts[35].rectInf = new Rectangulo(posX, 50, tAncho, tAltoInf);








