var lista = []

window.onload = mostrarObejeto(receberObejeto());

function armazenarObjeto() {
    if (localStorage.getItem('jogos')) {
        lista = JSON.parse(localStorage.getItem('jogos'))
    }

    const input1 = document.getElementById("campo1");
    const input2 = document.getElementById("campo2");

    if (input1.value && input2.value) {
        lista.push({ x: input1.value, y: input2.value }) // Armazena objeto na lista
        const myObjAsJSON = JSON.stringify(lista); // Convertendo lista de objetos para string
        localStorage.jogos = myObjAsJSON; // Armazenando a lista em jogos

        // Limpando os campos
        input1.value = '';
        input2.value = '';
    } else {
        alert("Preencha os dois campos");
    }
}

function receberObejeto() {
    const recebeString = localStorage.jogos; // Recebe a chave
    return JSON.parse(recebeString); // Converte para objeto
}

function funcoesCompiladas() {
    armazenarObjeto();
    mostrarObejeto(receberObejeto());
}

function mostrarObejeto(objeto) {
    const destino = document.getElementById("inserir");
    destino.innerHTML = "";

    for (let i in objeto) {
        const novoElemento = document.createElement("div");
        novoElemento.className = "elemento";

        const h2 = document.createElement("h2");
        const p = document.createElement("p");

        p.innerHTML = objeto[i].x;
        h2.innerHTML = objeto[i].y;

        novoElemento.appendChild(h2);
        novoElemento.appendChild(p);

        const botao = document.createElement('button'); // Criando o elemento <button>
        const imagem = document.createElement('img'); // Criando o elemento <img>
        imagem.id = 'lixeiro';
        imagem.src = 'lixeiro.png'; // Definindo o atributo src da imagem
        botao.appendChild(imagem); // Adicionando a imagem como filho do botão

        novoElemento.appendChild(botao);

        let retiraElemento = guardarElemento(objeto[i]);
        novoElemento.querySelector("button").addEventListener("click", retiraElemento);
        document.getElementById("inserir").appendChild(novoElemento); // Adicionando o botão ao documento na div inserir
    }
}

function guardarElemento(elemento) { // Guarda o elemento que vai ser excluído
    function botaoLixeiro(event) { // Exclui o elemento
        let divPai = event.target.parentNode; // Recebe o pai do objeto que disparou o evento
        let numFilhos = divPai.childElementCount;
        if (numFilhos == 1) { // Indica que selecionou a imagem ao invés do botão
            divPai = divPai.parentNode;
            numFilhos = divPai.childElementCount;
        }

        let listaJogos = JSON.parse(localStorage.jogos);
        // Essa linha encontra a posição do elemento no localStorage
        const posicao = listaJogos.findIndex(objeto => objeto.x === elemento.x && objeto.y === elemento.y);
        if (listaJogos[posicao]) {
            listaJogos.splice(posicao, 1); // Retirando o elemento de listaJogos
        }
        // Remove o elemento do localStorage
        localStorage.jogos = JSON.stringify(listaJogos);

        // Remove o elemento do HTML
        while (divPai.firstChild != null) { // Continua enquanto houver um primeiro filho
            divPai.firstChild.remove(); // Remove o primeiro filho
        }
        divPai.remove(); // Exclui divPai
    }
    return botaoLixeiro;
}
