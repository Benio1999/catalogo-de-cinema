const API_URL = "http://localhost:3001/filmes";
const filmeCardsContainer = document.getElementById("filmeCardsContainer")



function fetchAndRenderFilme() {
    fetch(API_URL)
        .then(response => response.json())
        .then(filme => renderFilme(filme))
        .catch(error => {
            console.error('Erro ao buscar filme', error),
                filmeCardsContainer.innerHTML = `<p class="p modal modal-content">Erro ao carregar filmes!</p>`;
        })
    }
    //criação de cards na div via js
function renderFilme(filme) {
    filmeCardsContainer.innerHTML = '';

    if (filme.length === 0) {
        filmeCardsContainer.innerHTML = `<p>Nenhum filme encontrado</p>`;
        return;
    }
filme.forEach(filme => {
    const filmeCard = document.createElement('div');
    filmeCard.className = 'filme-card'

    filmeCard.innerHTML = `
            <div class="filme">
                <img src="${filme.urlCapa}"alt="Capa do filme ${filme.titulo}" class="filme-capa"></img>
                <p><strong>ID:</strong>${filme.id}</p>
                <p><strong>Titulo:</strong>${filme.titulo}</p>
                <p><strong>Diretor:</strong>${filme.diretor}</p>
                <p><strong>Categoria:</strong>${filme.categoria}</p>
                <p><strong>Ano:</strong>${filme.anoLancamento}</p>
            </div>
        `;
})
    filmeCardsContainer.appendChild(filmeCard)
}

fetchAndRenderFilme();