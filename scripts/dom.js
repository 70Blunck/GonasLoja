import { Product, Cart } from "./classes.js";

export function renderizarProdutos(produtos) {
  const container = document.getElementById("produtos");
  container.innerHTML = "";

  const cart = new Cart();

  produtos.forEach(produto => {
    const product = new Product(produto.id, produto.title, produto.price, produto.image, produto.category);

    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}" />
      <h3>${product.title}</h3>
      <p>Preço: R$ ${product.price.toFixed(2)}</p>
      <button class="btn-add" data-id="${product.id}">Adicionar ao carrinho</button>
    `;

    container.appendChild(card);

    card.querySelector(".btn-add").addEventListener("click", () => {
      cart.addItem(product);
      alert("Produto adicionado ao carrinho!");
    });
  });
}

export function popularFiltro(categorias) {
  const filtro = document.getElementById("filtro-categoria");
  categorias.forEach(categoria => {
    const option = document.createElement("option");
    option.value = categoria;
    option.textContent = categoria;
    filtro.appendChild(option);
  });
}
