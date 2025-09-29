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
    { id: 1, titulo: "Weapons", diretor: "Zach Cregger", anoLancamento: 2025, urlCapa: "https://m.media-amazon.com/images/S/pv-target-images/762870abd32c3d64c7cabb9775dbee4a83d3d9f73f923d2a2bd531cc4a27cc0d.jpg", categoria: "Horror" },
    { id: 2, titulo: "Superman", diretor: "James Gunn", anoLancamento: 2025, urlCapa: "https://m.media-amazon.com/images/S/pv-target-images/c077277fb805649bb6785aabe2472a706b8e51a8dd629533a95cac955778d65a.jpg", categoria: "Action/Sci-Fi" },
    { id: 3, titulo: "Fantastic Four: First Steps", diretor: "Matt Shakman", anoLancamento: 2025, urlCapa: "https://m.media-amazon.com/images/M/MV5BOGM5MzA3MDAtYmEwMi00ZDNiLTg4MDgtMTZjOTc0ZGMyNTIwXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg", categoria: "Action/Sci-Fi" },
    { id: 4, titulo: "Batman Ninja vs. Yakuza League", diretor: "Junpei Mizusaki & Shinji Takagi", anoLancamento: 2025, urlCapa: "https://m.media-amazon.com/images/S/pv-target-images/d49dc4d058ade082d087c827891a5903d62faa7fef26a793a9da9607d7d551ac.jpg", categoria: "Action/Sci-Fi" },
    { id: 5, titulo: "Kimetsu no Yaiba: Mugen Castle", diretor: "Haruo Sotozaki & Hikaru Kondo", anoLancamento: 2025, urlCapa: "https://maceioshopping.com/app/uploads/2025/09/demon-slayer-kimetsu-no-yaiba-infinity-castle.jpg", categoria: "Action/Adventure" }
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
        return res.status(404).json({ mensagem: "404 error! User not found!" })
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