console.log(conteudos);
console.log(materias);
console.log(speechSynthesis.getVoices());

let nivel = 0;
let indiceMateria = 0;
let indiceTopico = 0;
let velocidadeFala = 1;

let indiceModo = 0;

let conteudoAtual = "";



const modos = [
    "Resumo Rápido",
    "Aula Completa"
];

const velocidades = [
    0.8,
    1,
    1.25,
    1.5,
    1.75,
    2
];

let indiceVelocidade = 1;

function mudarVelocidade() {

    indiceVelocidade++;

    if (indiceVelocidade >= velocidades.length)
        indiceVelocidade = 0;

    velocidadeFala = velocidades[indiceVelocidade];

    falar(
        "Velocidade " +
        velocidadeFala +
        " vezes"
    );
}

localStorage.setItem(
    "velocidadeFala",
    velocidadeFala
);

velocidadeFala =
Number(
    localStorage.getItem("velocidadeFala")
) || 1;

const titulo = document.getElementById("titulo");

function falar(texto) {

    speechSynthesis.cancel();

    const msg = new SpeechSynthesisUtterance();
    msg.text = texto;
    msg.lang = "pt-BR";
    msg.rate = velocidadeFala;

    speechSynthesis.speak(msg);
}

function atualizarTela() {

    if (nivel === 0) {

        titulo.innerText =
            materias[indiceMateria].nome;
    }

    else if (nivel === 1) {

        titulo.innerText =
            materias[indiceMateria]
            .topicos[indiceTopico];
    }

    else if (nivel === 2) {

        titulo.innerText =
            modos[indiceModo];
    }
    else if (nivel === 3) {

    titulo.innerText = "🔊 Reproduzindo...";
}
}

function gerarConteudo() {

    const materia = materias[indiceMateria].nome;

    const topico =
        materias[indiceMateria]
        .topicos[indiceTopico];

    const modo =
        modos[indiceModo];

    conteudoAtual =
        conteudos[materia][topico][modo];

    atualizarTela();

    falar(conteudoAtual);
}

function proximo() {

    if (nivel === 0) {

        indiceMateria++;

        if (indiceMateria >= materias.length)
            indiceMateria = 0;

        atualizarTela();
        falar(materias[indiceMateria].nome);
    }

    else if (nivel === 1) {

        indiceTopico++;

        if (
            indiceTopico >=
            materias[indiceMateria].topicos.length
        )
            indiceTopico = 0;

        atualizarTela();

        falar(
            materias[indiceMateria]
            .topicos[indiceTopico]
        );
    }

    else if (nivel === 2) {

        indiceModo++;

        if (indiceModo >= modos.length)
            indiceModo = 0;

        atualizarTela();

        falar(
            modos[indiceModo]
        );
    }
}

function anterior() {

    if (nivel === 0) {

        indiceMateria--;

        if (indiceMateria < 0)
            indiceMateria = materias.length - 1;

        atualizarTela();
        falar(materias[indiceMateria].nome);
    }

    else if (nivel === 1) {

        indiceTopico--;

        if (indiceTopico < 0)
            indiceTopico =
                materias[indiceMateria].topicos.length - 1;

        atualizarTela();
        falar(materias[indiceMateria].topicos[indiceTopico]);
    }

    else if (nivel === 2) {

        indiceModo--;

        if (indiceModo < 0)
            indiceModo = modos.length - 1;

        atualizarTela();
        falar(modos[indiceModo]);
    }
}

function entrar() {

    if (nivel === 0) {

        nivel = 1;
        indiceTopico = 0;

        atualizarTela();

        falar(
            materias[indiceMateria]
            .topicos[0]
        );
    }

    else if (nivel === 1) {

        nivel = 2;
        indiceModo = 0;

        atualizarTela();

        falar(
            modos[0]
        );
    }
    else if (nivel === 2) {

    nivel = 3;

    atualizarTela();

    gerarConteudo();
}

}

function voltarNivel() {

    if (nivel === 3) {

        nivel = 2;

        atualizarTela();

        falar(modos[indiceModo]);
    }

    else if (nivel === 2) {

        nivel = 1;

        atualizarTela();

        falar(
            materias[indiceMateria]
            .topicos[indiceTopico]
        );
    }

    else if (nivel === 1) {

        nivel = 0;

        atualizarTela();

        falar(
            materias[indiceMateria].nome
        );
    }
}
function ouvirNovamente() {

    falar(conteudoAtual);

}

function pararFala() {

    speechSynthesis.cancel();

}

async function maisDetalhes() {

    const materia = materias[indiceMateria].nome;

    const topico =
        materias[indiceMateria]
        .topicos[indiceTopico];

    const prompt = `
Explique com mais detalhes o tópico:

${topico}

da matéria

${materia}

Inclua exemplos.
`;

    // chamar API do GPT

}

function repetir() {
    falar(conteudoAtual);
}

function parar() {
    speechSynthesis.cancel();
}

atualizarTela();

