import { api } from "./api";

/**
 * ==========================
 * TOKEN HELPERS
 * ==========================
 */

export function salvarTokens(tokens) {
  localStorage.setItem("access_token", tokens.access);
  localStorage.setItem("refresh_token", tokens.refresh);
}

export function obterAccessToken() {
  return localStorage.getItem("access_token");
}

export function obterRefreshToken() {
  return localStorage.getItem("refresh_token");
}

export function removerTokens() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}

/**
 * ==========================
 * REGISTRO
 * ==========================
 */

export async function registrarUsuario(dados) {
  const response = await api.post("register/", dados);
  return response.data;
}

/**
 * ==========================
 * LOGIN (JWT)
 * ==========================
 */

export async function loginUsuario(credentials) {
  const response = await api.post("token/", credentials);

  // salva tokens automaticamente
  salvarTokens(response.data);

  return response.data;
}

/**
 * ==========================
 * DADOS DO USUÁRIO
 * ==========================
 */

export async function obterUsuario() {
  const response = await api.get("user/", {
    headers: {
      Authorization: `Bearer ${obterAccessToken()}`,
    },
  });

  return response.data;
}

/**
 * ==========================
 * LOGOUT
 * ==========================
 */

export function logoutUsuario() {
  removerTokens();
}