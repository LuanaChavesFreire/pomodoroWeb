import { mostrarTempo } from "./funcaoTimers.js";

const startPause = document.getElementById("startPause");
let intervaloId = null;
let tempoRestante = 0;

export function iniciarPausar(tempoSegundos) {
  const playAudio = new Audio("/sons/play.wav");
  if (intervaloId) {
    startPause.querySelector("span").textContent = "Começar";
    startPause.querySelector("img").src = "/imagens/playArrow.png";
    const pauseAudio = new Audio("/sons/pause.mp3");
    pauseAudio.play();
    zerar();
    return;
  }
  tempoRestante = tempoSegundos;
  mostrarTempo(tempoRestante);
  startPause.querySelector("span").textContent = "Pausar";
  startPause.querySelector("img").src = "/imagens/pause.png";
  intervaloId = setInterval(contagem, 1000);
  playAudio.play();
}

function zerar() {
  clearInterval(intervaloId);
  intervaloId = null;
}

const contagem = () => {
  const endAudio = new Audio("/sons/beep.mp3");
  if (tempoRestante === 0) {
    endAudio.play();
    zerar();
    startPause.querySelector("span").textContent = "Começar";
    startPause.querySelector("img").src = "/imagens/playArrow.png";
    return;
  }
  tempoRestante -= 1;
  mostrarTempo(tempoRestante);
};
