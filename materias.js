const materias = Object.keys(conteudos).map(nomeMateria => ({
    nome: nomeMateria,
    topicos: Object.keys(conteudos[nomeMateria])
}));