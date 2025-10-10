//importando express
const express = require('express');
const cors = require('cors')



//Criando minha aplicação
const app = express();


//permitir trabalhar com json
app.use(express.json());
app.use(cors())

//porta onde  a API vai rodar
const PORT = 3001;

let filmes = [
    { id: 1, titulo: "Weapons", diretor: "Zach Cregger", anoLancamento: 2025, urlCapa: "", categoria: "Horror" },
    { id: 2, titulo: "Superman", diretor: "James Gunn", anoLancamento: 2025, urlCapa: "", categoria: "Action/Sci-Fi" },
    { id: 3, titulo: "Fantastic Four: First Steps", diretor: "Matt Shakman", anoLancamento: 2025, urlCapa: "", categoria: "Action/Sci-Fi" },
    { id: 4, titulo: "Batman Ninja vs. Yakuza League", diretor: "Junpei Mizusaki & Shinji Takagi", anoLancamento: 2025, urlCapa: "", categoria: "Action/Sci-Fi" },
    { id: 5, titulo: "Kimetsu no Yaiba: Mugen Castle", diretor: "Haruo Sotozaki & Hikaru Kondo", anoLancamento: 2025, urlCapa: "", categoria: "Action/Adventure" }
]

app.get('/', (req, res) => {
    res.send("PAGINA INICIAL")
})

app.get('/filmes', (req, res) => {
    res.json(filmes);
})

app.get('/filmes/:id', (req, res) => {
    const id = req.params.id
    const filme = filmes.find(u => u.id == id)

    if (filme) {
        res.json(filme)
    }
    else {
        res.status(404).json({ mensagem: "Filme não encontrado" })
    }


})
app.get('/filmes/buscar/:titulo', (req, res) => {
    const buscaNome = req.params.titulo.toLowerCase()
    const resultado = filmes.filter(u => u.titulo.toLowerCase().includes(buscaNome))
    if (resultado.length > 0) {
        res.json(resultado)
    }
    else {
        res.status(404).json({ mensagem: "Filme não encontrado" })
    }

})

app.delete('/filmes/:id', (req, res) => {
    const id = req.params.id
    filmes = filmes.filter(u => u.id != id)
    res.json({ mensagem: "Filme removido com sucesso!" })
})

app.post('/filmes', (req, res) => {

    const ultimoId = filmes.reduce((max, filme) => Math.max(max, filme.id), 0)

    const novoFilme = {
        id: ultimoId + 1,
        titulo: req.body.titulo,
        diretor: req.body.diretor,
        anoLancamento: req.body.anoLancamento,
        urlCapa: req.body.urlCapa,
        categoria: req.body.categoria


    };
    filmes.push(novoFilme)
    res.status(201).json(filmes)
})

app.put('/filmes/:id', (req, res) => {
    const id = req.params.id;
    const titulo = req.body.titulo;
    const diretor = req.body.diretor;
    const anoLancamento = req.body.anoLancamento;
    const urlCapa = req.body.urlCapa
    const categoria = req.body.categoria

    const filme = filmes.find(u => u.id == id)

    if (!filme) {
        return res.status(404).json({ mensagem: "404 error! Movie not found!" })
    }

    filme.titulo = titulo || filme.titulo
    filme.diretor = diretor || filme.diretor
    filme.anoLancamento = anoLancamento || filme.anoLancamento
    filme.urlCapa = urlCapa || filme.urlCapa
    filme.categoria = categoria || filme.categoria
    res.json(filme)
})

app.get('/filmes/ano/:anoLancamento', (req, res) => {
    const anoLancamento = req.params.anoLancamento
    const filme = filmes.filter(u => u.anoLancamento == anoLancamento)

    if (filme.length > 0) {
        res.json(filme)
    }
    else {
        res.status(404).json({ mensagem: "404 error! User not found!" })
    }

})

app.get('/filmes/generos/:categoria', (req, res) => {
    const categoria = req.params.categoria;
    const resultado = filmes.filter(u => u.categoria == categoria);
    if (resultado.length > 0) {
        res.json(resultado)
    } else {
        res.status(404).json({ mensagem: "Filme não encontrado" })
    }
})

//inicia o servidor
app.listen(PORT, () => {
    console.log(`servidor na porta ${PORT}`)
})