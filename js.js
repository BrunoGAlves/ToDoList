let contador; // Define o contador fora de funções

document.addEventListener("DOMContentLoaded",function(){
    function formatarData(data){
        let dia = String(data.getDate()).padStart(2,'0');
        let mes = String(data.getMonth()+1).padStart(2,'0');
        let ano = data.getFullYear(); 
        return  `${dia}/${mes}/${ano}`; 

    }
    let dataHoje = new Date();
    
    document.getElementById("data-atual").textContent = formatarData(dataHoje);
});
document.addEventListener("DOMContentLoaded", function() {
    carregarTarefas(); // Carrega as tarefas ao iniciar a página

    document.getElementById("nova-tarefa").addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            adicionarTarefa();
        }
    });
});

function carregarTarefas() {
    const tarefasLista = document.getElementById("tarefas-lista");
    const tarefasSalvas = JSON.parse(localStorage.getItem("tarefas")) || [];
    
    // Atualiza o contador com o número de tarefas salvas
    contador = tarefasSalvas.length;
    localStorage.setItem("contadorTarefas", contador);

    tarefasSalvas.forEach(tarefa => {
        const novaTarefa = document.createElement("div");
        novaTarefa.classList.add("tarefa");

        const novoCheckbox = document.createElement("input");
        novoCheckbox.type = "checkbox";
        novoCheckbox.id = tarefa.id;
        novoCheckbox.checked = tarefa.checked;

        const novaLabel = document.createElement("label");
        novaLabel.htmlFor = novoCheckbox.id;
        novaLabel.textContent = tarefa.texto;

        const novoBotao = document.createElement("input");
        novoBotao.type = "button";
        novoBotao.value = "Excluir";

        novaTarefa.appendChild(novoCheckbox);
        novaTarefa.appendChild(novaLabel);
        novaTarefa.appendChild(novoBotao);
        tarefasLista.appendChild(novaTarefa);

        novoBotao.addEventListener("click", function() {
            this.parentElement.remove();
            salvarTarefas(); // Atualiza o localStorage ao remover uma tarefa
            contador--; // Decrementa o contador
            localStorage.setItem("contadorTarefas", contador); // Atualiza o contador no localStorage
        });

        novoCheckbox.addEventListener("change", function() {
            salvarTarefas(); // Atualiza o localStorage ao marcar/desmarcar uma tarefa
        });
    });
}

function adicionarTarefa() {
    const maximoExecucoes = 12;

    if (contador < maximoExecucoes) {
        const tarefasLista = document.getElementById("tarefas-lista");
        const novaTarefaTexto = document.getElementById("nova-tarefa").value.trim();

        if (novaTarefaTexto !== "") {
            const novaTarefa = document.createElement("div");
            novaTarefa.classList.add("tarefa");

            const novoCheckbox = document.createElement("input");
            novoCheckbox.type = "checkbox";
            novoCheckbox.id = "tarefa" + (document.querySelectorAll(".tarefa").length + 1);

            const novaLabel = document.createElement("label");
            novaLabel.htmlFor = novoCheckbox.id;
            novaLabel.textContent = novaTarefaTexto;

            const novoBotao = document.createElement("input");
            novoBotao.type = "button";
            novoBotao.value = "Excluir";

            novaTarefa.appendChild(novoCheckbox);
            novaTarefa.appendChild(novaLabel);
            novaTarefa.appendChild(novoBotao);
            tarefasLista.appendChild(novaTarefa);

            salvarTarefas(); // Salva a nova tarefa no localStorage

            novoBotao.addEventListener("click", function() {
                this.parentElement.remove();
                salvarTarefas(); // Atualiza o localStorage ao remover uma tarefa
                contador--; // Decrementa o contador
                localStorage.setItem("contadorTarefas", contador); // Atualiza o contador no localStorage
            });

            novoCheckbox.addEventListener("change", function() {
                salvarTarefas(); // Atualiza o localStorage ao marcar/desmarcar uma tarefa
            });

            document.getElementById("nova-tarefa").value = ""; // Limpa o campo de entrada
            contador++; // Incrementa o contador
            localStorage.setItem("contadorTarefas", contador); // Salva o contador atualizado no localStorage
        }
    } else {
        alert("Limite de tarefas alcançado!");
    }
}

function salvarTarefas() {
    const tarefas = [];
    document.querySelectorAll(".tarefa").forEach(tarefaDiv => {
        const checkbox = tarefaDiv.querySelector("input[type='checkbox']");
        const label = tarefaDiv.querySelector("label");
        tarefas.push({
            id: checkbox.id,
            texto: label.textContent,
            checked: checkbox.checked
        });
    });

    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}
