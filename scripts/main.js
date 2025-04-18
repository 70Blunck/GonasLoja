import { buscarProdutos, buscarCategorias, buscarPorCategoria } from "./api.js";
import { renderizarProdutos, popularFiltro } from "./dom.js";
import { User } from "./classes.js";

document.addEventListener("DOMContentLoaded", async () => {
  const produtos = await buscarProdutos();
  const categorias = await buscarCategorias();

  renderizarProdutos(produtos);
  popularFiltro(categorias);

  const filtro = document.getElementById("filtro-categoria");
  filtro.addEventListener("change", async () => {
    const categoria = filtro.value;
    const filtrados = await buscarPorCategoria(categoria);
    renderizarProdutos(filtrados);
  });

  const savedUser = localStorage.getItem("usuario");
  if (savedUser) {
    const { name, email } = JSON.parse(savedUser);
    const user = new User(name, email);
    exibirUsuarioLogado(user);
  }
});

const modal = document.getElementById("modal-cadastro");
const btnIcon = document.getElementById("user-icon");
const spanFechar = document.querySelector(".fechar");
const form = document.getElementById("form-cadastro");

btnIcon.addEventListener("click", () => {
  modal.style.display = "block";
});

spanFechar.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target == modal) {
    modal.style.display = "none";
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;

  const usuario = new User(nome, email);
  localStorage.setItem("usuario", JSON.stringify(usuario));

  modal.style.display = "none";
  exibirUsuarioLogado(usuario);
});

function exibirUsuarioLogado(usuario) {
  const container = document.getElementById("usuario-logado");

  const hash = md5(usuario.email.trim().toLowerCase());
  const gravatar = `https://www.gravatar.com/avatar/${hash}?s=40`;

  container.innerHTML = `
    <img src="${gravatar}" alt="Foto de perfil" style="border-radius: 50%; margin-right: 8px;" />
    <span>${usuario.name}</span>
  `;
}
