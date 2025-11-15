//https://youtu.be/gFvcCuq4MaM
// camila mendoza  12278/7

let juego;
let imgTitulo, imgInstrucciones, imgCaminos, imgTroncos;
let imgPiedras, imgSinObstaculos, imgCaminos2;
let imgPersonaje1;
let imgPersonaje, imgGanaste, imgPerdiste, imgCreditos;
let imgretornar;
let sonidoganaste;
let sonidoperdiste;

function preload() {
  imgTitulo = loadImage("data/pantalla1.jpg");
  imgInstrucciones = loadImage("data/pantalla2.jpg");
  imgCaminos = loadImage("data/pantalla3.jpg"); 
  imgTroncos = loadImage("data/pantalla4.jpg");
  imgPiedras = loadImage("data/pantalla5.jpg");
  imgSinObstaculos = loadImage("data/pantalla6.jpg");
  imgCaminos2 = loadImage("data/pantalla7.jpg");
  imgPersonaje1 = loadImage("data/personaje1.png");
  imgGanaste = loadImage("data/pantalla8.jpg");
  imgPerdiste = loadImage("data/pantalla9.jpg");
  imgCreditos = loadImage("data/pantalla10.jpg");
  imgretornar = loadImage("data/retornar.png");
  sonidoganaste = loadSound("data/aplausos.mp3");
  sonidoperdiste = loadSound("data/perdiste.mp3");
}

function setup() {
  createCanvas(640,480);
  frameRate(60);
  juego = new Juego();
}

function draw() {
  background(0);
  juego.mostrar();
  juego.actualizar();
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) juego.mover.izquierda = true;
  
  if (keyCode === RIGHT_ARROW) juego.mover.derecha = true;
  if (keyCode === UP_ARROW) juego.mover.arriba = true;
}

function keyReleased() {
  if (keyCode === LEFT_ARROW) juego.mover.izquierda = false;
  if (keyCode === RIGHT_ARROW) juego.mover.derecha = false;
  if (keyCode === UP_ARROW) juego.mover.arriba = false;
}

function mousePressed() {
  juego.mousePresionado(mouseX, mouseY);
}
