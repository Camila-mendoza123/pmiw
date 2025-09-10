
//https://youtu.be/ALT2L7hS_fQ

let imagen;
let animar = false; 
let reiniciando = false; 

const TAM_ORIG = 60;
let movc = 0; // desplazamiento
let columnas = 3, filas = 3;
let zonaX = 400;
let anchoCelda, altoCelda;


function preload(){
 imagen = loadImage("imagen.png"); 
}

function setup() {
  createCanvas(800, 400);
  //fullscreen(true);
  

  anchoCelda = zonaX / columnas;
  altoCelda = height / filas;
  noStroke();
}


function draw() {
background(255);
  image(imagen, 0, 0, 400, 400);

  // Si el mouse entra en la zona derecha 
  if (!animar && !reiniciando && mouseX > zonaX && mouseX < width) {
    animar = true;
  }

  if (animar) {
    movc += random(-2, 1);
    if (movc < 0) {
      movc = 0;
    } else if (movc > zonaX - anchoCelda) {
      movc = zonaX - anchoCelda;
    }
  }

  // Si el mouse vuelve a la izquierda, desactiva el modo reinicio
  if (mouseX < zonaX) {
    reiniciando = false;
  }

  dibujarRectangulos(zonaX, anchoCelda, height);
  dibujarCirculos(zonaX, anchoCelda, altoCelda, animar, movc, mouseX, mouseY);
}

function keyPressed() {
  if (key === 'r' || key === 'R') {
    movc = 0;
    animar = false;
    reiniciando = true; 
  }
}

function calcularTamPeque(x, y, animar, mouseX, mouseY) {
  if (!animar) {
    return TAM_ORIG;
  }
   d = dist(mouseX, mouseY, x, y);
  return map(d, 0, 300, 80, 10);
}

function dibujarRectangulos(zonaX, anchoCelda, altoVentana) {
  fill(240, 193, 22);
  rect(zonaX + 0 * anchoCelda, 0, anchoCelda, altoVentana);

  fill(173, 196, 245);
  rect(zonaX + 1 * anchoCelda, 0, anchoCelda, altoVentana);

  fill(247, 61, 40);
  rect(zonaX + 2 * anchoCelda, 0, anchoCelda, altoVentana);
}

function dibujarCirculos(zonaX, anchoCelda, altoCelda, animar, movc, mouseX, mouseY) {
  for (let col = 0; col < columnas; col++) {
    for (let fila = 0; fila < filas; fila++) {
      
      // Calcula centro
      let posX = zonaX + col * anchoCelda + anchoCelda / 2;
      let posY = fila * altoCelda + altoCelda / 2;
      let x = posX;
      let y;
      
      if (animar) {
        y = posY + movc;
      } else {
        y = posY;
      }

      if (col === 0) fill(0);
      else if (col === 1) fill(247, 171, 5);
      else fill(128, 149, 109);
      ellipse(x, y, anchoCelda, altoCelda);

      let tamPeque = calcularTamPeque(x, y, animar, mouseX, mouseY);

      if (col === 0) fill(240, 193, 22);
      else if (col === 1) fill(173, 196, 245);
      else fill(247, 61, 40);

      ellipse(x, y, tamPeque, tamPeque);
    }
  }
}
