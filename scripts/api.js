const BASE_URL = "https://fakestoreapi.com";

export async function buscarProdutos() {
  const res = await fetch(`${BASE_URL}/products`);
  return await res.json();
}

export async function buscarCategorias() {
  const res = await fetch(`${BASE_URL}/products/categories`);
  return await res.json();
}

export async function buscarPorCategoria(categoria) {
  if (categoria === "all") {
    return buscarProdutos();
  }
  const res = await fetch(`${BASE_URL}/products/category/${categoria}`);
  return await res.json();
}