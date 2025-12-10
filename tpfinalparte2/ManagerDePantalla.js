class ManagerDePantalla {
  constructor() {

    // PIEDRAS 
    this.piedras = [];

    let piedrasX = [210, 415, 220, 330, 265, 450];
    let piedrasY = [445, 425, 350, 245, 140, 100];

    for (let i = 0; i < piedrasX.length; i++) {
      this.piedras[i] = new Piedra(piedrasX[i], piedrasY[i]);
    }

    // TRONCOS 
    this.troncos = [];

    let troncosX = [480, 300, 500];
    let troncosY = [444, 350, 220];

    let anchos = [120, 160, 180];
    let altos  = [25, 20, 25];

    for (let i = 0; i < troncosX.length; i++) {
      this.troncos[i] = new Tronco(
        troncosX[i],
        troncosY[i],
        anchos[i],
        altos[i]
      );
    }
  }

  // PANTALLAS
  mostrarTitulo() {
    image(imgTitulo, 0, 0, width, height);
  }

  mostrarInstrucciones() {
    image(imgInstrucciones, 0, 0, width, height);

    let botonX = width - 110;
    let botonY = height - 60;

    fill(255);
    rect(botonX, botonY, 90, 35, 8);
    fill(0);
    textSize(18);
    textAlign(CENTER, CENTER);
    text("INICIAR", botonX + 45, botonY + 18);
  }

  mostrarCaminos() {
    image(imgCaminos, 0, 0, width, height);
  }

  mostrarTroncos() {
    image(imgTroncos, 0, 0, width, height);

    for (let i = 0; i < this.troncos.length; i++) {
      this.troncos[i].dibujar();
    }
  }

  mostrarPiedras() {
    image(imgPiedras, 0, 0, width, height);

    for (let i = 0; i < this.piedras.length; i++) {
      this.piedras[i].dibujar();
    }
  }

  mostrarSinObstaculos() {
    image(imgSinObstaculos, 0, 0, width, height);
  }

  mostrarPantalla7() {
    image(imgCaminos2, 0, 0, width, height);
  }

  mostrarGanaste() {
    image(imgGanaste, 0, 0, width, height);
  }

  mostrarPerdiste() {
    image(imgPerdiste, 0, 0, width, height);
  }

  mostrarCreditos() {
    image(imgCreditos, 0, 0, width, height);

    let botonX = 270;
    let botonY = 400;
    let botonAncho = 100;
    let botonAlto = 50;

    image(imgretornar, botonX, botonY, botonAncho, botonAlto);

    this.botonX = botonX;
    this.botonY = botonY;
    this.botonAncho = botonAncho;
    this.botonAlto = botonAlto;
  }
}
