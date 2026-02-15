const html = document.querySelector("html");
const focoBtn = document.querySelector(".appCardButton--foco");
const descansoCurtoBtn = document.querySelector(".appCardButton--curto");
const descansoLongoBtn = document.querySelector(".appCardButton--longo");
const imgBanner = document.querySelector(".appImage");
const titulo = document.querySelector(".appTitle");
const btns = document.querySelectorAll('.appCardButton')
const btnMusica = document.getElementById('alternarMusica')
const musica = new Audio('/sons/lunaRisePartOne.mp3')
musica.loop = true

function alterarContexto(contexto) {
  html.setAttribute("dataContexto", contexto);
  imgBanner.src = `/imagens/${contexto}.png`;
  switch (contexto) {
    case "foco":
      titulo.innerHTML = `Otimize sua produtividade,<br>
                <strong class="appTitleStrong">mergulhe no que importa.</strong>`;
      break;
    case "descansoCurto":
      titulo.innerHTML = `Que tal dar uma respirada?<br>
                <strong class="appTitleStrong">Faça uma pausa curta.</strong>`;
      break;
    case "descansoLongo":
      titulo.innerHTML = `Hora de voltar à superficie.<br>
                <strong class="appTitleStrong">Faça uma pausa longa.</strong>`;
  }
  btns.forEach((contexto) => {
    contexto.classList.remove('active')
  })
}

focoBtn.addEventListener("click", () => {
  alterarContexto("foco");
  focoBtn.classList.toggle('active')
});

descansoCurtoBtn.addEventListener("click", () => {
  alterarContexto("descansoCurto");
  descansoCurtoBtn.classList.toggle('active')
});

descansoLongoBtn.addEventListener("click", () => {
  alterarContexto("descansoLongo");
  descansoLongoBtn.classList.toggle('active')
});

btnMusica.addEventListener('change', () => {
  if (musica.paused) {
    musica.play()
  }
  else {
    musica.pause()
  }
})
