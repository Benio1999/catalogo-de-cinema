//servidor
const API_URL = "http://localhost:3001/filmes";

//Elementos Container
const filmeCardsContainer = document.getElementById('filme-cards-container');
const addFilmeForm = document.getElementById('addFilmeForm');
const btnListFilme = document.getElementById('btnListFilme');


//Elementos Modal
const editModal = document.getElementById('editModal');
const editFilmeForm = document.getElementById('editFilmeForm');
const btncancelEdit = document.getElementById('btnCancelEdit');
const editIdInput = document.getElementById('editId');
const editTituloInput = document.getElementById('editTitulo');
const editDiretorInput = document.getElementById('editDiretor');
const editAnoLancamentoInput = document.getElementById('editAnoLancamento');
const editCapaInput = document.getElementById('editCapa');
const editCategoriaInput = document.getElementById('editCategoria');
const btnSair = document.querySelector('.sair')

//Funções

//Requisição de usuarios
function fetchAndRenderFilme() {
    fetch(API_URL)
        .then(response => response.json())
        .then(filme => renderFilme(filme))
        .catch(error => {
            console.error('Erro ao buscar filme', error),
                filmeCardsContainer.innerHTML = `<p class="p modal modal-content">Erro ao carregar filmes!</p>`;
        })
}

//Função para Adicionar Ususários 
function addFilme(filmeData) {
    fetch(API_URL, {
        method: 'POST',
        headers: {
            'content-Type': 'application/json'
        },
        body: JSON.stringify(filmeData)

    })
        .then(response => response.json())
        .then(() => {
            addFilmeForm.reset();
            fetchAndRenderFilme();
        })
        .catch(error => console.error("Erro ao adicionar filmes", error))
}

//Função para editar usuários
function editFilme(filmeId, filmeData) {
    fetch(`${API_URL}/${filmeId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(filmeData)
    })
        .then(response => response.json())
        .then(() => {
            editModal.style.display = 'none';
            fetchAndRenderFilme();
        })
        .catch(error => console.error("Erro ao editar o filme", error))
}

//função do botão deletar
function deleteFilme(filmeId) {
    fetch(`${API_URL}/${filmeId}`, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(() => {
            fetchAndRenderFilme();
        })
        .catch(error => console.error("Erro ao excluir filme", error))
}


//criação de cards na div via js
function renderFilme(filme) {
    filmeCardsContainer.innerHTML = '';

    if (filme.length === 0) {
        filmeCardsContainer.innerHTML = `<p>Nenhum filme encontrado</p>`;
        return;
    }

    //loop que faz criar um card para cada usuários
    filme.forEach(filme => {
        const filmeCard = document.createElement('div');
        filmeCard.className = 'filme-card'

        filmeCard.innerHTML = `
            <div class="filme-info">
                <img src="${filme.urlCapa}"alt="Capa do filme ${filme.titulo}" class="filme-capa"></img>
                <p><strong>ID:</strong>${filme.id}</p>
                <p><strong>Titulo:</strong>${filme.titulo}</p>
                <p><strong>Diretor:</strong>${filme.diretor}</p>
                <p><strong>Categoria:</strong>${filme.categoria}</p>
                <p><strong>Ano:</strong>${filme.ano_lancamento}</p>
            </div>
            <div class="card-buttons">
                <button class="btn-edit">Editar</button>
                <button class="btn-delete">Excluir</button>
            </div>
        `;

        //dando funções para os botões dos cards
        const editBtn = filmeCard.querySelector('.btn-edit')
        const deleteBtn = filmeCard.querySelector('.btn-delete')

        editBtn.addEventListener('click', () => {
            editIdInput.value = filme.id;
            editTituloInput.value = filme.titulo;
            editDiretorInput.value = filme.diretor;
            editAnoLancamentoInput.value = filme.ano_lancamento;
            editCategoriaInput.value = filme.categoria;
            editCapaInput.value = filme.urlCapa;
            editModal.style.display = 'flex'
        })

        deleteBtn.addEventListener('click', () => {
            if (confirm(`Tem certeza que deseja excluir o filme ${filme.id}?`)) {
                deleteFilme(filme.id);
            }
        })

        filmeCardsContainer.appendChild(filmeCard)
    })
}
//dando funcionalidade para o botão listar usuários
btnListFilme.addEventListener('click', fetchAndRenderFilme);

//dando função para o botão de add usuarios
addFilmeForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const newFilmeTitulo = document.getElementById('addTitulo').value;
    const newFilmeDiretor = document.getElementById('addDiretor').value;
    const newFilmeCategoria = document.getElementById('addCategoria').value;
    const newFilmeCapa = document.getElementById('addCapa').value;
    const newFilmeAno = parseInt(document.getElementById('addAno').value);

    addFilme({ titulo: newFilmeTitulo,
    diretor: newFilmeDiretor,
    categoria: newFilmeCategoria,
    urlCapa: newFilmeCapa,
    anoLancamento: newFilmeAno })
});

editFilmeForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const filmeId = editIdInput.value;
    const newCapa = editCapaInput.value;
    const newTitulo = editTituloInput.value;
    const newDiretor = editDiretorInput.value;
    const newCategoria = editCategoriaInput.value;
    const newAno = editAnoLancamentoInput.value;

    editFilme(filmeId, { urlCapa: newCapa, titulo: newTitulo, diretor: newDiretor, categoria: newCategoria, anoLancamento: newAno });
})

btncancelEdit.addEventListener('click', () => {
    editModal.style.display = 'none';
})

btnSair.addEventListener('click', () => {
    editModal.style.display = 'none';
})

window.addEventListener('click', (e) => {
    if (e.target === editModal) {
        editModal.style.display = "none";
    }
})

fetchAndRenderFilme();



