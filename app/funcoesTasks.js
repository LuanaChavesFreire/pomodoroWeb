const btnAddTarefa = document.querySelector(".appButton--addTask");
const form = document.querySelector(".appForm--addTask");
const textArea = document.querySelector(".appFormTextarea");
const btnCancelarAddTask = document.querySelector(".appFormFooterButtonCancel");
const listaTarefas = document.querySelector(".appSectionTaskList");
const taskEmAndamento = document.querySelector(
    ".appSectionActiveTaskDescription",
);
const showMore = document.querySelector(".appButtonMore");
const limparTudo = document.getElementById("btnRemoverTodas");
const limparConcluidas = document.getElementById('btnRemoverConcluidas');
const opcoes = document.querySelector('.appSectionTaskHeaderUl')
const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

let tarefaSelecionada = null;
let liTarefaSelecionada = null;

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
    if (tarefa.completa) {
        li.classList.add("appSectionTaskListItemComplete");
        botao.setAttribute("disabled", "disabled");
    } else {
        li.onclick = () => {
            document
                .querySelectorAll(".appSectionTaskListItem")
                .forEach((item) =>
                    item.classList.remove("appSectionTaskListItemActive"),
                );
            if (tarefaSelecionada === tarefa.descricao) {
                taskEmAndamento.textContent = "";
                tarefaSelecionada = null;
                liTarefaSelecionada = null;
                return;
            }
            tarefaSelecionada = tarefa.descricao;
            liTarefaSelecionada = li;
            taskEmAndamento.textContent = tarefa.descricao;

            li.classList.add("appSectionTaskListItemActive");
        };
    }

    return li;
}

form.addEventListener("submit", (evento) => {
    evento.preventDefault();
    if (textArea.value.trim() === "") {
        alert("Digite uma tarefa válida!");
    } else {
        const tarefa = {
            descricao: textArea.value,
            completa: false,
        };
        textArea.value = '';
        form.classList.add("hidden");
        tarefas.push(tarefa);
        atualizarTask();
        const elementoTarefa = criarTarefa(tarefa);
        listaTarefas.append(elementoTarefa);
    }
});

tarefas.forEach((tarefa) => {
    const elementoTarefa = criarTarefa(tarefa);
    listaTarefas.append(elementoTarefa);
});

document.addEventListener("focoFinalizado", () => {
    if (tarefaSelecionada && liTarefaSelecionada) {
        liTarefaSelecionada.classList.remove("appSectionTaskListItemActive");
        liTarefaSelecionada.classList.add("appSectionTaskListItemComplete");
        liTarefaSelecionada
            .querySelector("button")
            .setAttribute("disabled", "disabled");
        const tarefa = tarefas.find((t) => t.descricao === tarefaSelecionada);
        if (tarefa) {
            tarefa.completa = true;
            atualizarTask();
        }
    }
});

showMore.addEventListener('click', () => {
    opcoes.style.display = opcoes.style.display === 'block' ? 'none' : 'block';
})

limparTudo.addEventListener('click', () => {
    tarefas.length = 0;
    atualizarTask();
    listaTarefas.innerHTML = '';
    opcoes.style.display = opcoes.style.display === 'block' ? 'none' : 'block';
})

limparConcluidas.addEventListener('click', () => {
    tarefas.forEach(t => {
        if (t.completa === true) {
            tarefas.splice(tarefas.indexOf(t), 1);
            document.querySelectorAll('.appSectionTaskListItemComplete').forEach(t => t.remove())
        }
    })
    console.log(tarefas);
    atualizarTask();
})
