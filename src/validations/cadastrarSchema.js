import * as yup from "yup";

export const cadastrarSchema = yup.object({
  nome: yup
    .string()
    .required("O nome é obrigatório")
    .min(3, "O nome deve ter no mínimo 3 caracteres"),

  email: yup
    .string()
    .required("O email é obrigatório")
    .email("Digite um email válido"),

  telefone: yup
    .string()
    .required("O telefone é obrigatório")
    .min(9, "Digite um telefone válido"),

  senha: yup
    .string()
    .required("A senha é obrigatória")
    .min(8, "A senha deve ter no mínimo 8 caracteres"),

  confirmarSenha: yup
    .string()
    .oneOf([yup.ref("senha")], "As senhas não coincidem")
    .required("Confirme sua senha"),
});
