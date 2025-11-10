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

const modalElement = document.querySelector('#detalheModal');
const modalTitle = modalElement.querySelector('.modal-title');
const modalBody = modalElement.querySelector('.modal-body');

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
            <p>{item.detalhes}</p>
        `;
    }
});