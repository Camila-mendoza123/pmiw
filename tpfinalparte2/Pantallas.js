class Pantallas {
  constructor() {
    this.imgPantalla7 = imgCaminos2; //para que aparescas cunado llegues arriba 
  }

  // Pantalla 1: Título del juego
  mostrarTitulo() {
    image(imgTitulo, 0, 0, width, height);
  }

  // Pantalla 2: Instrucciones + botón INICIAR
  mostrarInstrucciones() {
    image(imgInstrucciones, 0, 0, width, height);

    // botón "INICIAR"
    let botonX = width - 110;
    let botonY = height - 60;
    let botonAncho = 90;
    let botonAlto = 35;

    fill(255); // fondo blanco
    rect(botonX, botonY, botonAncho, botonAlto, 8); // esquinas redondeadas
    fill(0); // texto negro
    textSize(18);
    textAlign(CENTER, CENTER);
    text("INICIAR", botonX + botonAncho / 2, botonY + botonAlto / 2);
  }

  // Pantalla 3: Caminos
  mostrarCaminos() {
    image(imgCaminos, 0, 0, width, height);
  }

  // Pantalla 4: Troncos
  mostrarTroncos() {
    image(imgTroncos, 0, 0, width, height);
  }

  // Pantalla 5: Piedras
  mostrarPiedras() {
    image(imgPiedras, 0, 0, width, height);
  }

  // Pantalla 6: Sin obstáculos
  mostrarSinObstaculos() {
    image(imgSinObstaculos, 0, 0, width, height);
  }

  // Pantalla 7: imagen final que aparece al llegar arriba
  mostrarPantalla7() {
    if (this.imgPantalla7) image(this.imgPantalla7, 0, 0, width, height);
    else background(0);
  }

  // Pantalla 8: Ganaste
  mostrarGanaste() {
    image(imgGanaste, 0, 0, width, height);
  }

  // Pantalla 9: Perdiste
  mostrarPerdiste() {
    image(imgPerdiste, 0, 0, width, height);
  }

  // Pantalla 10: Créditos
 mostrarCreditos() {
  image(imgCreditos, 0, 0, width, height);

  // Dibujar botón retornar
  let botonX = 270;  // ajustar si querés
  let botonY = 400;
  let botonAncho = 100;
  let botonAlto = 50;

  image(imgretornar, botonX, botonY, botonAncho, botonAlto);

  // Guardar coordenadas para el mousePressed
  this.botonX = botonX;
  this.botonY = botonY;
  this.botonAncho = botonAncho;
  this.botonAlto = botonAlto;
}
}
