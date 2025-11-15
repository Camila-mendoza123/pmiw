class Personaje {
  constructor() {
    this.x = width / 2;
    this.y = height - 60;
    this.ancho = 140;  // tamaño del personaje
    this.alto = 140;
    this.xInicial = this.x;
    this.yInicial = this.y;
  }

  dibujar() {
    image(imgPersonaje1, this.x - this.ancho / 2, this.y - this.alto / 2, this.ancho, this.alto);
  }

  reiniciarPosicion() {
    this.x = this.xInicial;
    this.y = this.yInicial;
  }
}
