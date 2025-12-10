class Personaje {
  constructor() {
    this.x = width / 2;
    this.y = height - 60;
    this.ancho = 140;
    this.alto = 140;
    this.xInicial = this.x;
    this.yInicial = this.y;

    this.vel = 4;
    this.izquierda = false;
    this.derecha = false;
    this.arriba = false;
    this.abajo = false;
  }

  dibujar() {
    image(imgPersonaje1, this.x - this.ancho / 2, this.y - this.alto / 2, this.ancho, this.alto);
  }

  mover(estado) {
    let x = this.x;
    let y = this.y;

    if (estado === "troncos" || estado === "piedras") {
      if (this.izquierda) x -= this.vel;
      if (this.derecha) x += this.vel;
      if (this.arriba) y -= this.vel;
      if (this.abajo) y += this.vel;

      
      if (x < 150) x = 150;
      if (x > width - 150) x = width - 150;
      if (y < 0) y = 0;
      if (y > height - 60) y = height - 60;
    }

    
    else if (estado === "SinObstaculos") {
      if (this.arriba) y -= this.vel;
      if (y < 50) y = 50;
    }

    
    else if (estado === "pantalla7") {
      
    }

    // asignar nueva posición
    this.x = x;
    this.y = y;
  }

  reiniciarPosicion() {
    this.x = this.xInicial;
    this.y = this.yInicial;
  }
}
