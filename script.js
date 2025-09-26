//servidor
const API_URL = "http://localhost:3000/usuarios";

//Elementos Container
const userCardsContainer = document.getElementById('user-cards-container');
const addUserForm = document.getElementById('addUserForm');
const btnListUsers = document.getElementById('btnListUsers');

//Elementos Modal
const editModal = document.getElementById('editModal');
const editUserForm = document.getElementById('editUserForm');
const btncancelEdit = document.getElementById('btnCancelEdit');
const editIdInput = document.getElementById('editId');
const editNameInput = document.getElementById('editName');
const editAgeInput = document.getElementById('editAge')
const btnSair = document.querySelector('.sair')

//Funções

//Requisição de usuarios
function fetchAndRenderUser() {
    fetch(API_URL)
        .then(response => response.json())
        .then(users => renderUsers(users))
        .catch(error => {
            console.error('Erro ao buscar usuários', error),
                userCardsContainer.innerHTML = `<p class="p modal modal-content">Erro ao carregar usuários!</p>`;
        })
}

//Função para Adicionar Ususários 
function addUser(userData) {
    fetch(API_URL, {
        method: 'POST',
        headers: {
            'content-Type': 'application/json'
        },
        body: JSON.stringify(userData)

    })
        .then(response => response.json())
        .then(() => {
            addUserForm.reset();
            fetchAndRenderUser();
        })
        .catch(error => console.error("Erro ao adicionar usuários", error))
}

//Função para editar usuários
function editUser(userId, userData) {
    fetch(`${API_URL}/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
        .then(response => response.json())
        .then(() => {
            editModal.style.display = 'none';
            fetchAndRenderUser();
        })
        .catch(error => console.error("Erro ao editar o usuário", error))
}

//função do botão deletar
function deleteUser(userId) {
    fetch(`${API_URL}/${userId}`, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(() => {
            fetchAndRenderUser();
        })
        .catch(error => console.error("Erro ao excluir usuário", error))
}


//criação de cards na div via js
function renderUsers(users) {
    userCardsContainer.innerHTML = '';

    if (userCardsContainer.length === 0) {
        userCardsContainer.innerHTML = `<p>Nunhum usuário encontrado</p>`;
        return;
    }

//loop que faz criar um card para cada usuários
    users.forEach(user => {
        const userCard = document.createElement('div');
        userCard.className = 'user-card'

        userCard.innerHTML = `
            <div class="user-info">
                <p><strong>ID:</strong>${user.id}</p>
                <p><strong>Nome:</strong>${user.nome}</p>
                <p><strong>Idade:</strong>${user.idade}</p>
            </div>
            <div class="card-buttons">
                <button class="btn-edit">Editar</button>
                <button class="btn-delete">Excluir</button>
            </div>
        `;

        //dando funções para os botões dos cards
        const editBtn = userCard.querySelector('.btn-edit')
        const deleteBtn = userCard.querySelector('.btn-delete')

        editBtn.addEventListener('click', () => {
            editIdInput.value = user.id;
            editNameInput.value = user.nome;
            editAgeInput.value = user.idade;
            editModal.style.display = 'flex'
        })

        deleteBtn.addEventListener('click', () => {
            if(confirm(`Tem certeza que deseja excluir o usuário ${user.id}?`)){
                deleteUser(user.id);
            }
        })

        userCardsContainer.appendChild(userCard)
    })
}
//dando funcionalidade para o botão listar usuários
btnListUsers.addEventListener('click', fetchAndRenderUser);

//dando função para o botão de add usuarios
addUserForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const newUserName = document.getElementById('addName').value;
    const newUserAge = parseInt(document.getElementById('addAge').value);

    addUser({nome: newUserName, idade: newUserAge})
});

editUserForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const userId = editIdInput.value;
    const newName = editNameInput.value;
    const newAge = editAgeInput.value;

    editUser(userId, {nome: newName, idade: newAge});
})

btncancelEdit.addEventListener('click', () => {
    editModal.style.display = 'none';
})

btnSair.addEventListener('click', () =>{
    editModal.style.display = 'none';
})

window.addEventListener('click', (e) => {
    if(e.target === editModal){
        editModal.style.display = "none";
    }
})

fetchAndRenderUser();



