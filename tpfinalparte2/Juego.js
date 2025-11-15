class Juego {
  constructor() {
    this.estado = "titulo";
    this.personaje = new Personaje();
    this.mover = new MoverPersonaje(this.personaje);
    this.pantallas = new Pantallas();
    this.contador = 0;
    this.tiempoTitulo = 0;

    // Piedras (pantalla de piedras)
    this.piedras = [
      { x: 224, y: 408, ancho: 50, alto: 30, correcta: false },
      { x: 192, y: 384, ancho: 50, alto: 30, correcta: false },
      { x: 352, y: 372, ancho: 50, alto: 30, correcta: false },
      { x: 320, y: 100, ancho: 50, alto: 30, correcta: true },
      { x: 311, y: 135, ancho: 50, alto: 30, correcta: false },
      { x: 350, y: 276, ancho: 50, alto: 30, correcta: true }
    ];

    // Troncos (pantalla de troncos)
    this.troncos = [
      { x: 480, y: 444, ancho: 60, alto: 25 },
      { x: 300, y: 334.8, ancho: 60, alto: 25 },
      { x: 480, y: 260, ancho: 80, alto: 30 },
      { x: 516, y: 130.8, ancho: 60, alto: 25 },
      { x: 241, y: 48, ancho: 60, alto: 25 }
    ];
  }

  mostrar() {
    if (this.estado === "titulo") this.pantallas.mostrarTitulo();
    else if (this.estado === "instrucciones") this.pantallas.mostrarInstrucciones();
    else if (this.estado === "caminos") { 
      this.pantallas.mostrarCaminos();
      let posOriginal = this.personaje.y;
      this.personaje.y = posOriginal - 100;
      this.mover.dibujar();
      this.personaje.y = posOriginal;
    } 
    else if (this.estado === "troncos") {
      this.pantallas.mostrarTroncos();
      this.mover.mover(this.estado);  //para actualizar la posición del personaje según las teclas 
      this.mover.dibujar();
      this.verificarColisionTroncos();
    }
    else if (this.estado === "piedras") {
      this.pantallas.mostrarPiedras();
      this.mover.mover(this.estado);
      this.verificarColisionPiedras();
      this.mover.dibujar();
    }
    else if (this.estado === "SinObstaculos") {
      this.pantallas.mostrarSinObstaculos();
      this.mover.mover(this.estado);
      this.mover.dibujar();
    }
    else if (this.estado === "pantalla7") {
      this.pantallas.mostrarPantalla7();
      this.mover.mover(this.estado);
      this.mover.dibujar();
    }
    else if (this.estado === "ganaste") this.pantallas.mostrarGanaste();
    else if (this.estado === "perdiste") this.pantallas.mostrarPerdiste();
    else if (this.estado === "creditos") this.pantallas.mostrarCreditos();
  
    // Mostrar tiempo en pantallas de juego
    if (
      this.estado === "caminos" ||
      this.estado === "troncos" ||
      this.estado === "piedras" ||
      this.estado === "SinObstaculos"||
      this.estado === "pantalla7"
    ) {
      this.mostrarTiempo();
    }

    // Llegada a pantalla7 si personaje toca la parte superior
    if (
      (this.estado === "troncos" || this.estado === "piedras" || this.estado === "SinObstaculos") &&
      this.personaje.y - this.personaje.alto / 2 <= 0
    ) {
      this.estado = "pantalla7";
      this.personaje.reiniciarPosicion();
    }
  }

  verificarColisionPiedras() {
    let piesX = this.personaje.x;
    let piesY = this.personaje.y + this.personaje.alto / 2;
    for (let p of this.piedras) {
      let izq = p.x - p.ancho / 2;
      let der = p.x + p.ancho / 2;
      let arriba = p.y - p.alto / 2;
      let abajo = p.y + p.alto / 2;
      if (piesX > izq && piesX < der && piesY > arriba && piesY < abajo) {
        if (!p.correcta) this.personaje.reiniciarPosicion();
        return;
      }
    }
  }

  verificarColisionTroncos() {
    let piesX = this.personaje.x;
    let piesY = this.personaje.y + this.personaje.alto / 2;
    for (let t of this.troncos) {
      let izq = t.x - t.ancho / 2;
      let der = t.x + t.ancho / 2;
      let arriba = t.y - t.alto / 2;
      let abajo = t.y + t.alto / 2;
      if (piesX > izq && piesX < der && piesY > arriba && piesY < abajo) {
        this.personaje.reiniciarPosicion();
        return;
      }
    }
  }

  mostrarTiempo() {
  let tiempoRestante = 2700 - this.contador;

  let segundosTotales = tiempoRestante / 60;

  let minutos = 0;
  while (segundosTotales >= 60) {
    segundosTotales -= 60;
    minutos++;
  }

  let segundos = segundosTotales;

  let s = segundos;
  let segundosEnteros = 0;
  while (s >= 1) {
    s -= 1;
    segundosEnteros++;
  }

  let minTexto = minutos < 10 ? "0" + minutos : "" + minutos;
  let segTexto = segundosEnteros < 10 ? "0" + segundosEnteros : "" + segundosEnteros;

  let textoTiempo = minTexto + ":" + segTexto;

  fill(255);
  textSize(19);
  textAlign(RIGHT, TOP);
  text(textoTiempo, width - 13, 35);
}


  actualizar() {
    if (this.estado === "titulo") {
      this.tiempoTitulo++;
      if (this.tiempoTitulo > 180) this.estado = "instrucciones";
    }

    if (
      this.estado === "caminos" ||
      this.estado === "troncos" ||
      this.estado === "piedras" ||
      this.estado === "SinObstaculos" ||
      this.estado === "pantalla7"
    ) {
      this.contador++;
      if (this.contador > 2700) this.estado = "perdiste";
    }

    if (this.estado === "ganaste" || this.estado === "perdiste") {
      this.tiempoTitulo++;
      if (this.tiempoTitulo > 400) this.estado = "creditos";
    }
  }

  mousePresionado(mx, my) {
    // Pantalla 2 → botón INICIAR
    if (this.estado === "instrucciones") {
      let botonX = width - 110;
      let botonY = height - 60;
      let botonAncho = 90;
      let botonAlto = 35;

      if (mx > botonX && mx < botonX + botonAncho &&
          my > botonY && my < botonY + botonAlto) {
        this.estado = "caminos";
      }
    }

    // Pantalla 3 → elegir camino
    if (this.estado === "caminos") {
      if (mx > 32 && mx < 96 && my > 240 && my < 288) this.estado = "piedras";
      else if (mx > 192 && mx < 256 && my > 144 && my < 192) this.estado = "troncos";
      else if (mx > 496 && mx < 560 && my > 264 && my < 312) this.estado = "SinObstaculos";
    }

    // Pantalla 7 lección final
if (this.estado === "pantalla7") {
   // Camino 1 pierde
   if (mx > 190.4 - 30 && mx < 190.4 + 30 && my > 322.8 - 30 && my < 322.8 + 30) {
      this.estado = "perdiste";
      if (sonidoperdiste && !sonidoperdiste.isPlaying()) {
          sonidoperdiste.play();
      }
   }
   
   // Camino 2 → gana
   if (mx > 350.4 - 30 && mx < 350.4 + 30 && my > 206.4 - 30 && my < 206.4 + 30) {
      this.estado = "ganaste";
      if (sonidoganaste && !sonidoganaste.isPlaying()) {
          sonidoganaste.play();
      }
   }
}

    // Pantalla 10 → Créditos → botón reiniciar
    if (this.estado === "creditos") {
      let px = this.pantallas.botonX;
      let py = this.pantallas.botonY;
      let ancho = this.pantallas.botonAncho;
      let alto = this.pantallas.botonAlto;

      if (mx > px && mx < px + ancho && my > py && my < py + alto) {
        this.estado = "titulo";
        this.contador = 0;
        this.tiempoTitulo = 0;
        this.personaje.reiniciarPosicion();
      }
    }
  }
}
