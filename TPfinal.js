/* TP final, cuento:Pulgarcito
   Integrantes: Ortega Melany y Camila Mendoza 
   video Mendoza Camila:  https://youtu.be/_IBkvlXJn6M  */
   
   
let imagenes = [];
let estado = 0;
let texto = [];
let sonidoClick;   
let sonidoOpcion;  
let preguntas = [
  [
    "¿Qué debe hacer Pulgarcito con las piedritas?",
    "Usarlas para marcar el camino de regreso",
    "Guardarlas para después."
  ],
  [
    "¿Qué debería usar ahora Pulgarcito para no perderse?",
    "Buscar migas de pan para marcar el camino",
    "Seguir las estrellas"
  ],
  [
    "¿Qué deberían hacer los hermanos perdidos?",
    "Buscar una casa iluminada",
    "Seguir la luz de la luna"
  ]
];

// pantallas normales donde aparece SIGUIENTE
let pantallasSiguiente = [1, 2, 4, 5, 7, 8, 10, 11, 12, 13, 15, 17, 18, 19, 20, 22];

function preload() {
  sonidoClick = loadSound("data/clicksiguiente.mp3");
  sonidoOpcion = loadSound("data/botonopcion.mp3");

  for (let i = 0; i < 25; i++) {
    imagenes[i] = loadImage("data/Pantalla" + (i + 1) + ".jpg");
  }
  texto = loadStrings("data/texto.txt");
}

function setup() {
  createCanvas(640, 480);
  textAlign(CENTER, CENTER);
  textSize(18);
  if (sonidoClick) sonidoClick.setVolume(0.5);
  if (sonidoOpcion) sonidoOpcion.setVolume(0.5);
}

function draw() {
  background(220);

  if (imagenes[estado]) {
    image(imagenes[estado], 0, 0, width, height);
  }

  if (estado !== 0 && estado !== 24 && estado !== 25) {
    if (
      estado == 7 || estado == 8 || estado == 9 || estado == 10 || estado == 11 ||
      estado == 12 || estado == 13 || estado == 14 || estado == 18 || estado == 19 ||
      estado == 20 || estado == 21 || estado == 22 || estado == 23
    ) {
      fill(0, 150);
      rect(40, 360, 560, 100, 16);
      fill(255);
      textAlign(LEFT, TOP);
      text(texto[estado], 50, 375, 540, 90);
    } else {
      fill(0, 150);
      rect(40, 45, 560, 100, 16);
      fill(255);
      textAlign(LEFT, TOP);
      text(texto[estado], 50, 60, 540, 90);
    }
  }

  // pantallas con preguntas
  if (estado == 3 || estado == 6 || estado == 16) {
    let estadoFinal;
    switch (estado) {
      case 3: estadoFinal = 0; break;
      case 6: estadoFinal = 1; break;
      case 16: estadoFinal = 2; break;
    }

    let x = 80;
    let y = 300;
    let ancho = 480;
    let alto = 40;

    for (let i = 0; i < preguntas[estadoFinal].length; i++) {
      fill(0, 150);
      rect(x, y, ancho, alto, 16);
      fill(255);
      textAlign(CENTER, CENTER);
      text(preguntas[estadoFinal][i], x + ancho / 2, y + alto / 2);
      y += alto + 20;
    }
  }

  dibujarPantallaDeInicio();
  if (estado == 24) dibujarBotonVolver();
  if (pantallaTieneSiguiente(estado)) dibujarBotonSiguiente();
}

function mousePressed() {
  // clic en INICIAR
  if (estado === 0) {
    if (mouseX > width / 2 - 100 && mouseX < width / 2 + 100 &&
        mouseY > height / 2 - 25 && mouseY < height / 2 + 25) {
    //  sonidoClick.play();
      estado = 1;
    }
    return;
  }

  // clic en VOLVER
  if (estado == 24) {
    let x = width - 160;
    let y = height - 80;
    let w = 120;
    let h = 50;

    if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
      sonidoClick.play();
      estado = 0;
    }
    return;
  }

  // clic en SIGUIENTE
  if (pantallaTieneSiguiente(estado)) {
    if (clicEnBotonSiguiente()) {
      sonidoClick.play();
      estado++;
      if (estado >= imagenes.length) estado = 0;
    }
    return;
  }

  // pantallas con opciones
  if (estado === 3) {
    if (mouseX > 80 && mouseX < 560 && mouseY > 360 && mouseY < 400) {
      sonidoOpcion.play();
      estado = 4;
    } else if (mouseX > 80 && mouseX < 560 && mouseY > 410 && mouseY < 450) {
      sonidoOpcion.play();
      estado = 15;
    }
    return;
  }

  if (estado === 6) {
    if (mouseX > 80 && mouseX < 560 && mouseY > 360 && mouseY < 400) {
      sonidoOpcion.play();
      estado = 7;
    } else if (mouseX > 80 && mouseX < 560 && mouseY > 410 && mouseY < 450) {
      sonidoOpcion.play();
      estado = 10;
    }
    return;
  }

  if (estado === 16) {
    if (mouseX > 80 && mouseX < 560 && mouseY > 360 && mouseY < 400) {
      sonidoOpcion.play();
      estado = 22;
    } else if (mouseX > 80 && mouseX < 560 && mouseY > 410 && mouseY < 450) {
      sonidoOpcion.play();
      estado = 17;
    }
    return;
  }

  // pantallas que redirigen al final
  if (estado == 9 || estado == 14 || estado == 21 || estado == 23) {
    sonidoClick.play();
    estado = 24;
    return;
  }
}
