
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
  juego = new Juego(); //Se crea un objeto de la clase Juego.
}

function draw() {
  background(0);
  
  juego.mostrar();
  juego.actualizar();
}

function keyPressed() { // detecta cuando la tecla se aprieta 

  if (keyCode === LEFT_ARROW) juego.personaje.izquierda = true;
  if (keyCode === RIGHT_ARROW) juego.personaje.derecha = true;
  if (keyCode === UP_ARROW) juego.personaje.arriba = true;
  if (keyCode === DOWN_ARROW) juego.personaje.abajo = true;

}

function keyReleased() {
  if (keyCode === LEFT_ARROW) juego.personaje.izquierda = false;
  if (keyCode === RIGHT_ARROW) juego.personaje.derecha = false;
  if (keyCode === UP_ARROW) juego.personaje.arriba = false;
  if (keyCode === DOWN_ARROW) juego.personaje.abajo = false;

}


function mousePressed() {//Cuando sueltas la tecla  deja de mover al personaje.
  juego.mousePresionado(mouseX, mouseY);
}


