import { mostrarTempo } from "./funcaoTimers.js";
import { iniciarPausar } from "./funcoesIniciarPausar.js";

const html = document.querySelector("html");
const focoBtn = document.querySelector(".appCardButton--foco");
const descansoCurtoBtn = document.querySelector(".appCardButton--curto");
const descansoLongoBtn = document.querySelector(".appCardButton--longo");
const imgBanner = document.querySelector(".appImage");
const titulo = document.querySelector(".appTitle");
const startPause = document.getElementById("startPause");
const btns = document.querySelectorAll(".appCardButton");
const btnMusica = document.getElementById("alternarMusica");
const btnTeste = document.getElementById('modoTeste');
const musica = new Audio("/sons/lunaRisePartOne.mp3");
musica.loop = true;

function alterarContexto(contexto) {
  html.setAttribute("dataContexto", contexto);
  imgBanner.src = `/imagens/${contexto}.png`;
  switch (contexto) {
    case "foco":
      titulo.innerHTML = `Otimize sua produtividade,<br>
                <strong class="appTitleStrong">mergulhe no que importa.</strong>`;
      if (btnTeste.checked) {
        mostrarTempo(30);
        startPause.onclick = () => iniciarPausar(30);
      }
      else {
        mostrarTempo(1500);
        startPause.onclick = () => iniciarPausar(1500);
      }
      break;
    case "descansoCurto":
      titulo.innerHTML = `Que tal dar uma respirada?<br>
                <strong class="appTitleStrong">Faça uma pausa curta.</strong>`;
      mostrarTempo(300);
      startPause.onclick = () => iniciarPausar(300);
      break;
    case "descansoLongo":
      titulo.innerHTML = `Hora de voltar à superficie.<br>
                <strong class="appTitleStrong">Faça uma pausa longa.</strong>`;
      mostrarTempo(900);
      startPause.onclick = () => iniciarPausar(900);
  }
  btns.forEach((contexto) => {
    contexto.classList.remove("active");
  });
}

focoBtn.addEventListener("click", () => {
  alterarContexto("foco");
  focoBtn.classList.toggle("active");
});

descansoCurtoBtn.addEventListener("click", () => {
  alterarContexto("descansoCurto");
  descansoCurtoBtn.classList.toggle("active");
});

descansoLongoBtn.addEventListener("click", () => {
  alterarContexto("descansoLongo");
  mostrarTempo(900);
  descansoLongoBtn.classList.toggle("active");
});

btnMusica.addEventListener("change", () => {
  if (musica.paused) {
    musica.play();
  } else {
    musica.pause();
  }
});
