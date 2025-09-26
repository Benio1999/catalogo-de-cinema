//importando express
const express = require('express');
const cors = require('cors')



//Criando minha aplicação
const app = express();


//permitir trabalhar com json
app.use(express.json());
app.use(cors())

//porta onde  a API vai rodar
const PORT = 3000;

let usuarios = [
    { id: 1, nome: "Ana", idade: 25 },
    { id: 2, nome: "Carlos", idade: 30 },
    { id: 3, nome: "Maria", idade: 22 },
    { id: 4, nome: "Carlos Eduardo", idade: 19 }
]

app.get('/', (req, res) => {
    res.send("PAGINA INICIAL")
})

app.get('/usuarios', (req, res) => {
    res.json(usuarios);
})

app.get('/usuarios/:id', (req, res) => {
    const id = req.params.id
    const usuario = usuarios.find(u => u.id == id)
    res.json(usuario)

    if (usuario) {
        res.json(usuario)
    }
    else {
        res.status(404).json({ mensagem: "Usuário não encontrado" })
    }


})
app.get('/usuarios/buscar/:nome', (req, res) => {
    const buscaNome = req.params.nome.toLowerCase()
    const resultado = usuarios.filter(u => u.nome.toLowerCase().includes(buscaNome))
    if (resultado.length > 0) {
        res.json(resultado)
    }
    else {
        res.status(404).json({ mensagem: "Usuário não encontrado" })
    }

})
    
app.delete('/usuarios/:id', (req,res) => {
    const id = req.params.id
    usuarios = usuarios.filter (u => u.id !=id)
    res.json({mensagem: "usuario removido com sucesso!"})
})

app.post('/usuarios', (req,res) => {

    const ultimoId = usuarios.reduce((max, usuario) => Math.max(max, usuario.id),0)

    const novoUsuario = {
        id: ultimoId + 1,
        nome: req.body.nome,
        idade: req.body.idade
    };
    usuarios.push(novoUsuario)
    res.status(201).json(usuarios)
})

app.put('/usuarios/:id', (req,res) => {
    const id = req.params.id;
    const nome = req.body.nome
    const idade = req.body.idade

    const usuario = usuarios.find(u => u.id ==id)

    if(!usuario){
        return res.status(404).json({mensagem: "404 error! User not found!"})
    }

    usuario.nome = nome || usuario.nome
    usuario.idade = idade || usuario.idade
    res.json(usuario)
})

app.get('/usuarios/idade/:idade', (req,res) => {
    const idade = req.params.idade
    const usuario = usuarios.filter(u => u.idade == idade)
    
    if(usuario.length > 0 ){
        res.json(usuario)
    }
    else{
        res.status(404).json({mensagem: "404 error! User not found!"})
    }

    usuario.nome = nome || usuario.nome
    usuario.idade = idade || usuario.idade

})


//inicia o servidor
app.listen(PORT, () => {
    console.log(`servidor na porta ${PORT}`)
})