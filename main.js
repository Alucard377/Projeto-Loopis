var lista = []

window.onload = mostrarObejeto(receberObejeto());

function armazenarObjeto() {
    if (localStorage.getItem('jogos')) {
        lista = JSON.parse(localStorage.getItem('jogos'))
    }

    const input1 = document.getElementById("campo1");
    const input2 = document.getElementById("campo2");
    const sim = document.querySelector('input[value="sim"]');
    const nao = document.querySelector('input[value="nao"]');

    if (input1.value && input2.value &&(sim.checked || nao.checked)) {
        lista.push({ x: input1.value, y: input2.value, z: sim.checked}) // Armazena objeto na lista
        const myObjAsJSON = JSON.stringify(lista); // Convertendo lista de objetos para string
        localStorage.jogos = myObjAsJSON; // Armazenando a lista em jogos
        sim.checked = false;
        nao.checked = false;

        // Limpando os campos
        input1.value = '';
        input2.value = '';
    } else {
        alert("Preencha os três campos");
    }
}

function receberObejeto() {
    return JSON.parse(localStorage.jogos); // Busca a chave e converte para objeto
}

function funcoesCompiladas() {
    armazenarObjeto();
    mostrarObejeto(receberObejeto());
}

function criarElemento(objeto){
    const novoElemento = document.createElement("div");
    novoElemento.className = "elemento";

    const h2 = document.createElement("h2");
    h2.style.color = "white";

    const p = document.createElement("p");
    p.style.color = "white";

    h2.innerHTML = objeto.x;
    p.innerHTML = objeto.y;

    novoElemento.appendChild(h2);
    novoElemento.appendChild(p);

    const imagem = document.createElement('img'); // Criando o elemento <img>
    imagem.className = 'lixeiro';
    imagem.src = 'Imagens/lixeiro.png'; // Definindo o atributo src da imagem

    novoElemento.appendChild(imagem);

    let retiraElemento = guardarElemento(objeto);
    novoElemento.querySelector(".lixeiro").addEventListener("click", retiraElemento);

    const estrela = document.createElement('img');
    estrela.className = 'estrela';
    if(objeto.z){
        estrela.src = 'Imagens/favorito_true.png';
        novoElemento.style.background = "#10086A";
    }
    else{
        estrela.src = 'Imagens/favorito_false.png';
        novoElemento.style.background = "#3C4EFF";
    }

    let favoritaElemento = guardarFavorito(objeto);
    
    novoElemento.appendChild(estrela);

    novoElemento.querySelector(".estrela").addEventListener("click", favoritaElemento);
    

    // console.log(novoElemento); //Retire o comentario para verificar como funciona a div da classe elemento

    return novoElemento;
}

function mostrarObejeto(objeto) {
    const destino = document.getElementById("inserir");
    destino.innerHTML = "";
    
    for (let i in objeto) {
        if(objeto[i].z){//Se o elemento for favorito
            const novoElemento = criarElemento(objeto[i]);
            document.getElementById("inserir").appendChild(novoElemento); // Adicionando o botão ao documento na div inserir
        }
    }

    for (let i in objeto) {
        if(objeto[i].z == false){//Se o elemento não for favorito
            const novoElemento = criarElemento(objeto[i]);
            document.getElementById("inserir").appendChild(novoElemento); // Adicionando o botão ao documento na div inserir
        }
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

        let listaJogos = receberObejeto();
        // Essa linha encontra a posição do elemento no localStorage
        let posicao = listaJogos.findIndex(objeto => objeto.x === elemento.x && objeto.y === elemento.y);
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

function guardarFavorito(elemento) { // Guarda o elemento que vai ser favoritado
    function toqueFavorito(event) { 
        let listaJogos = receberObejeto();
        let posicao = listaJogos.findIndex(objeto => objeto.x === elemento.x && objeto.y === elemento.y);
        if(listaJogos[posicao]){
            listaJogos[posicao].z = !listaJogos[posicao].z;
        }
        localStorage.jogos = JSON.stringify(listaJogos);

        mostrarObejeto(receberObejeto()); //Reseta a div[id="inserir"]
    }
    return toqueFavorito;
}
