const API_URL = "http://localhost:3001/filmes";



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
                <p><strong>Ano:</strong>${filme.anoLancamento}</p>
            </div>
            <div class="card-buttons">
                <button class="btn-edit">Editar</button>
                <button class="btn-delete">Excluir</button>
            </div>
        `;
})