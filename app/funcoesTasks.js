const btnAddTarefa = document.querySelector(".appButton--addTask");
const form = document.querySelector(".appForm--addTask");
const textArea = document.querySelector(".appFormTextarea");
const btnCancelarAddTask = document.querySelector(".appFormFooterButtonCancel");
const listaTarefas = document.querySelector(".appSectionTaskList");
const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

function atualizarTask() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

btnAddTarefa.addEventListener("click", () => {
    form.classList.toggle("hidden");
});

btnCancelarAddTask.addEventListener("click", () => {
    textArea.value = "";
    form.classList.add("hidden");
});

function criarTarefa(tarefa) {
    const li = document.createElement("li");
    li.classList.add("appSectionTaskListItem");

    const svg = document.createElement("svg");
    svg.innerHTML = `
    <svg class="appSectionTaskIconStatus" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="12"></circle>
        <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
    </svg>`;

    const paragrafo = document.createElement("p");
    paragrafo.classList.add("appSectionTaskListItemDescription");
    paragrafo.textContent = tarefa.descricao;

    const botao = document.createElement("button");
    botao.classList.add("appButtonEdit");
    botao.onclick = () => {
        const novoNome = prompt("Qual o novo nome da Tarefa?");
        if (novoNome === null || novoNome.trim() === "") {
            alert("Digite um nome válido para a tarefa!");
        } else {
            paragrafo.textContent = novoNome;
            tarefa.descricao = novoNome;
            atualizarTask();
        }
    };

    const imgBotao = document.createElement("img");
    imgBotao.setAttribute("src", "./imagens/edit.png");

    botao.append(imgBotao);
    li.append(svg, paragrafo, botao);
    return li;
}

form.addEventListener("submit", (evento) => {
    evento.preventDefault();
    if (textArea.value.trim() === "") {
        alert("Digite uma tarefa válida!");
    } else {
        const tarefa = {
            descricao: textArea.value,
        };
        tarefas.push(tarefa);
        atualizarTask();
    }
});

tarefas.forEach((tarefa) => {
    const elementoTarefa = criarTarefa(tarefa);
    listaTarefas.append(elementoTarefa);
});
