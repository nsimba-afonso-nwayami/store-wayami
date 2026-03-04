import { api } from "./api";

/**
 * Listar todos os endereços
 */
export async function listarEnderecos() {
  const response = await api.get("enderecos/");
  return response.data;
}

/**
 * Buscar endereço por ID
 */
export async function buscarEnderecoPorId(id) {
  const response = await api.get(`enderecos/${id}/`);
  return response.data;
}

/**
 * Criar novo endereço
 */
export async function criarEndereco(dadosEndereco) {
  const response = await api.post("enderecos/", dadosEndereco);
  return response.data;
}

/**
 * Atualizar endereço
 */
export async function atualizarEndereco(id, dadosEndereco) {
  const response = await api.put(`enderecos/${id}/`, dadosEndereco);
  return response.data;
}

/**
 * Remover endereço
 */
export async function removerEndereco(id) {
  const response = await api.delete(`enderecos/${id}/`);
  return response.data;
}