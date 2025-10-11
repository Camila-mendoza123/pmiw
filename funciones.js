function dibujarPantallaDeInicio() {
  if (estado == 0) {
    fill(0, 150);
    rect(width / 2 - 100, height / 2 - 25, 200, 50, 16);
    fill(255);
    text("INICIAR", width / 2, height / 2);
  }
}

function dibujarBotonVolver() {
  let x = width - 160;
  let y = height - 80;
  let w = 120;
  let h = 50;

  fill(0, 150);
  rect(x, y, w, h, 16);
  fill(255);
  textAlign(CENTER, CENTER);
  text("VOLVER", x + w / 2, y + h / 2);
}

function dibujarBotonSiguiente() {
  let x = width - 160;
  let y = height - 80;
  let w = 120;
  let h = 50;

  fill(0, 150);
  rect(x, y, w, h, 16);
  fill(255);
  textAlign(CENTER, CENTER);
  text("SIGUIENTE", x + w / 2 - 5, y + h / 2); 
}

function clicEnBotonSiguiente() {
  let x = width - 160;
  let y = height - 80;
  let w = 120;
  let h = 50;
  return mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h;
}

function pantallaTieneSiguiente(estadoActual) {
  for (let i = 0; i < pantallasSiguiente.length; i++) {
    if (pantallasSiguiente[i] === estadoActual) return true;
  }
  return false;
}
