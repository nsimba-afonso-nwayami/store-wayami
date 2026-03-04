import { api } from "./api";

/**
 * Listar todos os pedidos
 */
export async function listarPedidos() {
  const response = await api.get("pedidos/");
  return response.data;
}

/**
 * Buscar pedido por ID
 */
export async function buscarPedidoPorId(id) {
  const response = await api.get(`pedidos/${id}/`);
  return response.data;
}

/**
 * Criar novo pedido
 */
export async function criarPedido(dadosPedido) {
  const response = await api.post("pedidos/criar/", dadosPedido);
  return response.data;
}