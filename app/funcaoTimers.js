const timer = document.getElementById("timer");

export function mostrarTempo(tempoSegundos) {
  const minutos = Math.floor(tempoSegundos / 60);
  const segundos = tempoSegundos % 60;
  const minutosFormatado = String(minutos).padStart(2, "0");
  const segundosFormatado = String(segundos).padStart(2, "0");
  timer.innerHTML = `${minutosFormatado}:${segundosFormatado}`;
}
