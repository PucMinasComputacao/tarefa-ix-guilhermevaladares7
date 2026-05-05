const data = {
  produtos: [
    {
      id: 1,
      nome: "iPhone 13",
      preco: 5000,
      categoria: "Celulares",
      imagem: "https://picsum.photos/200?random=1",
      descricao: "Celular Apple com bom desempenho.",
      emEstoque: true
    },
    {
      id: 2,
      nome: "Galaxy S22",
      preco: 4200,
      categoria: "Celulares",
      imagem: "https://picsum.photos/200?random=2",
      descricao: "Celular Samsung moderno.",
      emEstoque: true
    },
    {
      id: 3,
      nome: "Notebook Acer",
      preco: 3500,
      categoria: "Notebooks",
      imagem: "https://picsum.photos/200?random=3",
      descricao: "Notebook para estudos e trabalho.",
      emEstoque: false
    },
    {
      id: 4,
      nome: "Mouse Gamer",
      preco: 150,
      categoria: "Acessórios",
      imagem: "https://picsum.photos/200?random=4",
      descricao: "Mouse gamer com boa precisão.",
      emEstoque: true
    },
    {
      id: 5,
      nome: "Teclado Mecânico",
      preco: 300,
      categoria: "Acessórios",
      imagem: "https://picsum.photos/200?random=5",
      descricao: "Teclado mecânico para jogos.",
      emEstoque: true
    },
    {
      id: 6,
      nome: "PS5",
      preco: 4500,
      categoria: "Games",
      imagem: "https://picsum.photos/200?random=6",
      descricao: "Console Playstation 5.",
      emEstoque: false
    },
    {
      id: 7,
      nome: "Xbox Series S",
      preco: 2800,
      categoria: "Games",
      imagem: "https://picsum.photos/200?random=7",
      descricao: "Console Xbox Series S.",
      emEstoque: true
    },
    {
      id: 8,
      nome: "Dell Inspiron",
      preco: 4000,
      categoria: "Notebooks",
      imagem: "https://picsum.photos/200?random=8",
      descricao: "Notebook Dell para uso geral.",
      emEstoque: true
    }
  ]
};

const lista = document.getElementById("product-list");
const detalhes = document.getElementById("product-details");
const search = document.querySelector("#search");
const category = document.querySelector("#category");
const btnRender = document.getElementById("btnRender");

function formatPrice(preco) {
  return "R$ " + preco.toFixed(2);
}

function showProductDetails(produto) {
  detalhes.innerHTML = `
    <h2>${produto.nome}</h2>
    <p><strong>Preço:</strong> ${formatPrice(produto.preco)}</p>
    <p><strong>Categoria:</strong> ${produto.categoria}</p>
    <p><strong>Estoque:</strong> ${produto.emEstoque ? "Disponível" : "Esgotado"}</p>
    <p><strong>Descrição:</strong> ${produto.descricao}</p>
  `;

  detalhes.scrollIntoView({ behavior: "smooth" });
}

function createProductCard(produto) {
  const card = document.createElement("div");

  card.setAttribute("data-id", produto.id);
  card.classList.add("card");

  card.style.padding = "10px";

  const img = document.createElement("img");
  img.setAttribute("src", produto.imagem);
  img.setAttribute("alt", produto.nome);

  const nome = document.createElement("h3");
  nome.innerText = produto.nome;

  const preco = document.createElement("p");
  preco.innerText = formatPrice(produto.preco);

  const categoria = document.createElement("p");
  categoria.innerText = produto.categoria;

  const btnDetalhes = document.createElement("button");
  btnDetalhes.innerText = "Ver detalhes";

  const btnDestacar = document.createElement("button");
  btnDestacar.innerText = "Destacar";

  btnDetalhes.addEventListener("click", function () {
    showProductDetails(produto);
  });

  btnDestacar.addEventListener("click", function () {
    card.classList.toggle("highlight");
  });

  card.appendChild(img);
  card.appendChild(nome);
  card.appendChild(preco);
  card.appendChild(categoria);
  card.appendChild(btnDetalhes);
  card.appendChild(btnDestacar);

  return card;
}

function renderProducts(produtos) {
  lista.innerHTML = "";

  produtos.forEach(function (produto) {
    const card = createProductCard(produto);
    lista.appendChild(card);
  });

  const cards = document.querySelectorAll(".card");

  cards.forEach(function (card) {
    console.log("Card ID:", card.getAttribute("data-id"));
  });
}

function renderCategories() {
  category.innerHTML = "";

  const optionTodas = document.createElement("option");
  optionTodas.value = "Todas";
  optionTodas.innerText = "Todas";
  category.appendChild(optionTodas);

  data.produtos.forEach(function (produto) {
    const categorias = document.querySelectorAll("#category option");
    let existe = false;

    categorias.forEach(function (option) {
      if (option.value === produto.categoria) {
        existe = true;
      }
    });

    if (!existe) {
      const option = document.createElement("option");
      option.value = produto.categoria;
      option.innerText = produto.categoria;
      category.appendChild(option);
    }
  });
}

function filterProducts() {
  const texto = search.value.toLowerCase();
  const categoriaSelecionada = category.value;

  const filtrados = data.produtos.filter(function (produto) {
    const nomeBate = produto.nome.toLowerCase().includes(texto);
    const categoriaBate = categoriaSelecionada === "Todas" || produto.categoria === categoriaSelecionada;

    return nomeBate && categoriaBate;
  });

  return filtrados;
}

search.addEventListener("input", function () {
  renderProducts(filterProducts());
});

category.addEventListener("change", function () {
  renderProducts(filterProducts());
});

btnRender.addEventListener("click", function () {
  renderProducts(filterProducts());
});

renderCategories();
renderProducts(data.produtos);