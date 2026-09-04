// VARIÁVEIS DE CONTROLE DO QUIZ
let perguntasData = {};
let serieAtual = [];
let perguntaAtualIndex = 0;
let pontuacao = 0;

// ELEMENTOS DA TELA
const telaInicio = document.getElementById("tela-inicio");
const telaQuiz = document.getElementById("tela-quiz");
const telaResultado = document.getElementById("tela-resultado");

const contadorPergunta = document.getElementById("contador-pergunta");
const perguntaTexto = document.getElementById("pergunta-texto");
const alternativasContainer = document.getElementById("alternativas-container");
const explicacaoContainer = document.getElementById("explicacao-container");
const explicacaoTexto = document.getElementById("explicacao-texto");
const btnProximo = document.getElementById("btn-proximo");
const btnReiniciar = document.getElementById("btn-reiniciar");

// CARREGAR AS PERGUNTAS DO ARQUIVO JSON E DO LOCALSTORAGE
async function carregarPerguntas() {
    try {
        const resposta = await fetch("dados/perguntas.json");
        perguntasData = await resposta.json();
    } catch (erro) {
        console.error("Erro ao carregar as perguntas do JSON:", erro);
        perguntasData = {};
    }

    // Mescla as perguntas salvas pelo painel do professor (localStorage)
    let perguntasAdmin = JSON.parse(localStorage.getItem('admin_quizzes')) || [];
    perguntasAdmin.forEach(q => {
        if (!perguntasData[q.serie]) {
            perguntasData[q.serie] = [];
        }
        // Descobre o índice da alternativa correta com base no texto salvo
        let indiceCorreto = q.alternativas.indexOf(q.correta);
        if (indiceCorreto === -1) indiceCorreto = 0; // Fallback de segurança

        perguntasData[q.serie].push({
            pergunta: q.pergunta,
            alternativas: q.alternativas,
            resposta: indiceCorreto,
            explicacao: q.explicacao || "Sem explicação cadastrada."
        });
    });
}

carregarPerguntas();

// EVENTO DE CLIQUE NOS BOTÕES DE SÉRIE
document.querySelectorAll(".btn-serie").forEach(botao => {
    botao.addEventListener("click", (e) => {
        const serie = e.target.getAttribute("data-serie");
        
        if (!perguntasData[serie] || perguntasData[serie].length === 0) {
            alert("Ainda não há perguntas cadastradas para esta série!");
            return;
        }

        serieAtual = perguntasData[serie];
        perguntaAtualIndex = 0;
        pontuacao = 0;

        // Mudar de tela
        telaInicio.classList.add("oculto");
        telaQuiz.classList.remove("oculto");

        mostrarPergunta();
    });
});

// EXIBIR A PERGUNTA ATUAL
function mostrarPergunta() {
    resetarEstado();
    const currentPergunta = serieAtual[perguntaAtualIndex];

    contadorPergunta.innerText = `Pergunta ${perguntaAtualIndex + 1} de ${serieAtual.length}`;
    perguntaTexto.innerText = currentPergunta.pergunta;

    currentPergunta.alternativas.forEach((alternativa, index) => {
        const btn = document.createElement("button");
        btn.classList.add("btn-alternativa");
        btn.innerText = alternativa;
        btn.addEventListener("click", () => selecionarAlternativa(btn, index, currentPergunta));
        alternativasContainer.appendChild(btn);
    });
}

// RESETAR ESTADO DOS BOTÕES E EXPLICAÇÃO ENTRE AS PERGUNTAS
function resetarEstado() {
    btnProximo.classList.add("oculto");
    explicacaoContainer.classList.add("oculto");
    alternativasContainer.innerHTML = "";
}

// VERIFICAR SE A RESPOSTA ESTÁ CORRETA E MOSTRAR EXPLICAÇÃO
function selecionarAlternativa(botaoSelecionado, indiceEscolhido, perguntaObj) {
    const botoes = alternativasContainer.querySelectorAll(".btn-alternativa");
    const indiceCorreto = perguntaObj.resposta;

    // Desativar todos os botões após a escolha
    botoes.forEach(btn => btn.disabled = true);

    if (indiceEscolhido === indiceCorreto) {
        botaoSelecionado.classList.add("correta");
        pontuacao++;
        explicacaoTexto.innerHTML = `<strong>✨ Resposta Correta!</strong><br>${perguntaObj.explicacao}`;
        explicacaoContainer.style.background = "#d4edda";
        explicacaoContainer.style.borderColor = "#28a745";
        explicacaoContainer.style.color = "#155724";
    } else {
        botaoSelecionado.classList.add("errada");
        // Destacar a alternativa correta em verde
        if(botoes[indiceCorreto]) {
            botoes[indiceCorreto].classList.add("correta");
        }
        
        explicacaoTexto.innerHTML = `<strong>❌ Resposta Incorreta!</strong><br>A alternativa certa era: <em>"${perguntaObj.alternativas[indiceCorreto]}"</em><br><br><strong>💡 Explicação:</strong> ${perguntaObj.explicacao}`;
        explicacaoContainer.style.background = "#f8d7da";
        explicacaoContainer.style.borderColor = "#dc3545";
        explicacaoContainer.style.color = "#721c24";
    }

    // Mostrar a caixa de explicação e o botão de próximo
    explicacaoContainer.classList.remove("oculto");
    btnProximo.classList.remove("oculto");

    if (perguntaAtualIndex === serieAtual.length - 1) {
        btnProximo.innerText = "Ver Resultado";
    } else {
        btnProximo.innerText = "Próxima Pergunta";
    }
}

// BOTÃO DE PRÓXIMA PERGUNTA
btnProximo.addEventListener("click", () => {
    perguntaAtualIndex++;
    if (perguntaAtualIndex < serieAtual.length) {
        mostrarPergunta();
    } else {
        mostrarResultado();
    }
});

// EXIBIR TELA DE RESULTADO FINAL
function mostrarResultado() {
    telaQuiz.classList.add("oculto");
    telaResultado.classList.remove("oculto");

    const resultadoTexto = document.getElementById("resultado-texto");
    resultadoTexto.innerText = `Você acertou ${pontuacao} de ${serieAtual.length} perguntas!`;
}

// BOTÃO DE REINICIAR QUIZ
btnReiniciar.addEventListener("click", () => {
    telaResultado.classList.add("oculto");
    telaInicio.classList.remove("oculto");
});