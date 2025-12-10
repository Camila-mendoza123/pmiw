class Juego {
  constructor() {
    this.estado = "titulo";
    this.personaje = new Personaje();
    this.manager = new ManagerDePantalla();


    this.contador = 0;
    this.tiempoTitulo = 0;
  }

  // COLISIONES 
  colisiones() {

    // PIEDRAS 
    if (this.estado === "piedras") {
      let px = this.personaje.x;
      let py = this.personaje.y + this.personaje.alto / 2;

      for (let i = 0; i < this.manager.piedras.length; i++) {
        let p = this.manager.piedras[i];

        let izq = p.x - p.ancho / 2;
        let der = p.x + p.ancho / 2;
        let arriba = p.y - p.alto / 2;
        let abajo = p.y + p.alto / 2;

        if (px > izq && px < der && py > arriba && py < abajo) {
          this.personaje.reiniciarPosicion();
          return;
        }
      }
    }

    // ---- TRONCOS ----
    if (this.estado === "troncos") {
      let px = this.personaje.x;
      let py = this.personaje.y + this.personaje.alto / 2;

      for (let i = 0; i < this.manager.troncos.length; i++) {
        let t = this.manager.troncos[i];

        let izq = t.x - t.ancho / 2;
        let der = t.x + t.ancho / 2;
        let arriba = t.y - t.alto / 2;
        let abajo = t.y + t.alto / 2;

        if (px > izq && px < der && py > arriba && py < abajo) {
          this.personaje.reiniciarPosicion();
          return;
        }
      }
    }
  }

  // MOSTRAR
  mostrar() {

    if (this.estado === "titulo") {
      this.manager.mostrarTitulo();
    }

    else if (this.estado === "instrucciones") {
      this.manager.mostrarInstrucciones();
    }

    else if (this.estado === "caminos") {
      this.manager.mostrarCaminos();
    }

    else if (this.estado === "troncos") {
      this.manager.mostrarTroncos();
      this.personaje.mover(this.estado);
      this.personaje.dibujar();
      this.colisiones();
    }

    else if (this.estado === "piedras") {
      this.manager.mostrarPiedras();
      this.personaje.mover(this.estado);
      this.personaje.dibujar();
      this.colisiones();
    }

    else if (this.estado === "SinObstaculos") {
      this.manager.mostrarSinObstaculos();
      this.personaje.mover(this.estado);
      this.personaje.dibujar();
    }

    else if (this.estado === "pantalla7") {
      this.manager.mostrarPantalla7();
      this.personaje.mover(this.estado);
      this.personaje.dibujar();
    }

    else if (this.estado === "ganaste") {
      this.manager.mostrarGanaste();
    }

    else if (this.estado === "perdiste") {
      this.manager.mostrarPerdiste();
    }

    else if (this.estado === "creditos") {
      this.manager.mostrarCreditos();
    }

    //  TIEMPO 
    if (
      this.estado === "caminos" ||
      this.estado === "troncos" ||
      this.estado === "piedras" ||
      this.estado === "SinObstaculos" ||
      this.estado === "pantalla7"
    ) {
      this.mostrarTiempo();
    }

    //  LLEGADA A PANTALLA 7 
    if (
      (this.estado === "troncos" ||
       this.estado === "piedras" ||
       this.estado === "SinObstaculos") &&
      this.personaje.y - this.personaje.alto / 2 <= 0
    ) {
      this.estado = "pantalla7";
      this.personaje.reiniciarPosicion();
    }
  }

  // TIEMPO
  mostrarTiempo() {
    let tiempoRestante = 2700 - this.contador;
    let minutos = 0;
    let segundos = 0;

    for (let i = 1; i <= tiempoRestante; i++) {
      segundos++;
      if (segundos === 60) {
        segundos = 0;
        minutos++;
      }
    }

    let minTexto = minutos < 10 ? "0" + minutos : minutos;
    let segTexto = segundos < 10 ? "0" + segundos : segundos;

    fill(255);
    textSize(19);
    textAlign(RIGHT, TOP);
    text(minTexto + ":" + segTexto, width - 13, 35);
  }

  // ACTUALIZAR
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

    // Botón INICIAR
    if (this.estado === "instrucciones") {
      let bx = width - 110;
      let by = height - 60;

      if (mx > bx && mx < bx + 90 && my > by && my < by + 35) {
        this.estado = "caminos";
      }
    }

    // Elegir camino
    if (this.estado === "caminos") {
      if (mx > 32 && mx < 96 && my > 240 && my < 288) this.estado = "piedras";
      else if (mx > 192 && mx < 256 && my > 144 && my < 192) this.estado = "troncos";
      else if (mx > 496 && mx < 560 && my > 264 && my < 312) this.estado = "SinObstaculos";
    }

    // Pantalla 7
    if (this.estado === "pantalla7") {

      if (mx > 160 && mx < 220 && my > 292 && my < 352) {
        this.estado = "perdiste";
        if (sonidoperdiste && !sonidoperdiste.isPlaying()) sonidoperdiste.play();
      }

      if (mx > 320 && mx < 380 && my > 176 && my < 236) {
        this.estado = "ganaste";
        if (sonidoganaste && !sonidoganaste.isPlaying()) sonidoganaste.play();
      }
    }

    // Créditos → reiniciar
    if (this.estado === "creditos") {
      let p = this.manager;
      if (mx > p.botonX && mx < p.botonX + p.botonAncho &&
          my > p.botonY && my < p.botonY + p.botonAlto) {

        this.estado = "titulo";
        this.contador = 0;
        this.tiempoTitulo = 0;
        this.personaje.reiniciarPosicion();
      }
    }
  }
}
