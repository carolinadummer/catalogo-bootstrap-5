const CATALOG_ITEMS = [
    {
        id: 1,
        titulo: "Clarice Bean, Não Olhe Agora!",
        categoria: "Livros",
        detalhes: "Clarice Bean enfrenta problemas inesperados: a possível separação dos pais, a mudança da melhor amiga e confusões em casa. Ela aprende a lidar com imprevistos com humor, coragem e imaginação.",
        preco: "R$ 90,00",
        estoque: 88,
        autor: "Lauren Child",
        lancamento: "2006"  
    },
    {
        id: 2,
        titulo: "Tipo Assim, Clarice Bean",
        categoria: "Livros",
        detalhes: "Clarice Bean enfrenta problemas com sua professora exigente, que não gosta dos livros de detetive que ela adora. Para o trabalho da escola, Clarice precisa mostrar o que aprendeu com essas leituras.",
        preco: "R$ 90,00",
        estoque: 88,
        autor: "Lauren Child",
        lancamento: "2002"   
    },
    {
        id: 3,
        titulo: "Clarice Bean Tem um Problema",
        categoria: "Livros",
        detalhes: "Clarice Bean tem dificuldades com ortografia e concentração. Quando a professora anuncia um concurso de redação, ela fica preocupada, mas, com o apoio de sua família e inspirada por Ruby Redfort, aprende a encarar os erros com humor e a ver o aprendizado de forma criativa.",
        preco: "R$ 90,00",
        estoque: 88,
        autor: "Lauren Child",
        lancamento: "2004"   
    },
    {
        id: 4,
        titulo: "Marca Página de Gatinho",
        categoria: "Artesanato",
        detalhes: "Marca página com um gatinho na ponta",
        preco: "R$ 5,00",
        estoque: 88,
        material: "Papel Couché e designs gráficos",
        dimensoes: "20cm x 7cm"   
    },
];

const formatCurrency = (value) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const modalElement = document.querySelector('#detalheModal');
const modalTitle = modalElement.querySelector('.modal-title');
const modalBody = modalElement.querySelector('.modal-body');
const modalAction = modalElement.querySelector('.btn-success');

// 1. Ouvinte para popular o modal ANTES de ser exibido
modalElement.addEventListener('show.bs.modal', function (event) {
    const button = event.relatedTarget;
    const itemId = parseInt(button.getAttribute('data-item-id'));
    const item = CATALOG_ITEMS.find(i => i.id === itemId);
    
    if (item) {
        modalTitle.textContent = item.titulo;
        
        let detailsHTML = `
            <p class="mb-1"><strong>Categoria:</strong> <span class="badge bg-secondary">${item.categoria}</span></p>
            <p class="fs-4 fw-bold text-success mb-3">Preço: ${item.preco}</p>
            <hr>
            <p>${item.detalhes}</p>
        `;
        
        if (item.categoria === 'Livros') {
            detailsHTML += `<p><strong>Autor:</strong> ${item.autor}</p>`;
            detailsHTML += `<p><strong>Lançamento:</strong> ${item.lancamento}</p>`;
            detailsHTML += `<p class="text-dark"><strong>Estoque Disponível:</strong> ${item.estoque} unidades</p>`;
        } else if (item.categoria === 'Artesanato') {
            detailsHTML += `<p><strong>Material:</strong> ${item.material}</p>`;
            detailsHTML += `<p><strong>Dimensões/Comprimento:</strong> ${item.dimensoes || item.comprimento}</p>`;
            detailsHTML += `<p class="text-dark"><strong>Peças Exclusivas em Estoque:</strong> ${item.estoque}</p>`;
        }
        
        modalBody.innerHTML = detailsHTML;
        
        modalAction.onclick = () => {
            adicionarItemCarrinho(item.id);
            console.log(`Ação: Item '${item.titulo}' (ID: ${item.id}) adicionado ao carrinho.`);
            
            const bsModal = bootstrap.Modal.getInstance(modalElement);
            if(bsModal) bsModal.hide();
        };
    }
});

// 2. Ouvinte para a funcionalidade de busca (simples)
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const items = document.querySelectorAll('.item-catalogo');

function executarPesquisa(event) {
    event.preventDefault();
    
    const query = searchInput.value.toLowerCase().trim();
    
    items.forEach(item => {
        
        const title = item.querySelector('.card-title').textContent.toLowerCase();
        const category = item.getAttribute('data-categoria').toLowerCase();
        
        if (title.includes(query) || category.includes(query) || query === "") {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

searchButton.addEventListener('click', executarPesquisa);

searchInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        executarPesquisa(event);
    } else if (searchInput.value.trim() === "") {
        executarPesquisa(event);
    }
});

// 3. Atualiza os itens do catálogo ao carregar o HTML da página
items.forEach((card, index) => {
    const img = card.querySelector('img');
    const title = card.querySelector('.card-title');
    const category = card.querySelectorAll('.card-text')[0];
    const description = card.querySelectorAll('.card-text')[1];
    
    const item = CATALOG_ITEMS.find(i => i.id === (index + 1));
    
    if (item) {
        img.src = img.src.replace(/\?text=(.*)/, "?text=" + item.categoria.toUpperCase());
        
        title.textContent = item.titulo;
        
        category.textContent = "Categoria: " + item.categoria;
        description.textContent = item.detalhes;
        
    }
});

// 4. Adiciona funconalidade de cookies (persistência) dos itens adicionados ao carrinho
// (mantém os produtos adicionados ao carrinho mesmo ao fechar ou atualizar a página)
const CART_STORAGE_KEY = 'shopping_cart';

function obterCarrinhoDoNavegador() {
    try {
        const cookie = localStorage.getItem(CART_STORAGE_KEY);
        if (cookie) {
            return JSON.parse(cookie);
        }
    } catch (e) {
        console.error("Falha ao ler o cookie do armazenamento local.");
    }
    
    return [];
}

function salvarCookieCarrinho(itensCarrinho) {
    try {
        // Salva os itens do carrinho em formato JSON no navegador
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(itensCarrinho));
    } catch (e) {
        console.error("ERRO: Falha ao salvar carrinho no navegador. Erro: ", e);
    }
}

function atualizarContadorCarrinho() {
    // Obtém itens existentes no carrinho
    const carrinho = obterCarrinhoDoNavegador();
    // Obtém o elemento HTML que exibe o número de itens no carrinho (Badge)
    const carrinhoBadge = document.getElementById("cart-count");
    
    // Se o elemento que exibe o número de itens no carrinho existe 
    if (carrinhoBadge) {
        // Atualiuza o badge do carrinho com o número de itens no carrinho
        carrinhoBadge.textContent = carrinho.length;
        
        if (carrinho.length > 0) {
            // Remove a classe Boostrap 'd-none' para exibir o badge
            carrinhoBadge.classList.remove('d-none');
        } else {
            // Adiciona a classe Boostrap 'd-none' para ocultar o badge
            carrinhoBadge.classList.add('d-none');
        }
    }
}

function adicionarItemCarrinho(itemId) {
    // Obtém os itens atuais do carrinho
    const carrinho = obterCarrinhoDoNavegador();
    carrinho.push(itemId); // Adicionar o ID do item recebido como parâmetro da função ao carrinho
    salvarCookieCarrinho(carrinho); // Atualiza o cookie do carrinho
    atualizarContadorCarrinho(); // Atualiza o número de itens no HTML do carrinho navbar
}

atualizarContadorCarrinho();

// 5. Renderiza o conteúdo do carrinho
const carrinho_btn = document.getElementById("cart-button");

carrinho_btn.addEventListener("click", function() {
    const carrinho_secao = document.getElementById("cart-section");
    carrinho_secao.classList.toggle("d-none");
    
    if (carrinho_secao.classList.contains("d-none")) {
        return;
    }
    
    const carrinho_recibo = document.getElementById("cart-list");
    carrinho_recibo.innerHTML = "";
    
    const itensCarrinho = obterCarrinhoDoNavegador();
    
    itensCarrinho.forEach(itemId => {
        
        const item = CATALOG_ITEMS.find(i => i.id === itemId);
        const li = document.createElement("li");
        li.classList.add("list-group-item", "border-secondary", "d-flex", "justify-content-between", "align-items-center");
        li.innerHTML = `
        <div>
        <h6 class="mb-1">${item.titulo}</h6>
        </div>
        <span class="fw-bold text-success">${formatCurrency(item.preco)}</span>
        `;
        
        carrinho_recibo.appendChild(li);
    });
});