import { api } from "./api";

/**
 * Listar todos os produtos
 */
export async function listarProdutos() {
  const response = await api.get("produtos/");
  return response.data;
}

/**
 * Buscar produto por ID
 */
export async function buscarProdutoPorId(id) {
  const response = await api.get(`produtos/${id}/`);
  return response.data;
}

/**
 * Buscar produto por slug (nome)
 */
export async function buscarProdutoPorSlug(slug) {
  const response = await api.get("produtos/");
  const produtos = response.data;

  const produto = produtos.find(
    (p) =>
      p.descricao
        .toLowerCase()
        .replaceAll(" ", "-")
        .replaceAll("/", "") === slug
  );

  return produto || null;
}