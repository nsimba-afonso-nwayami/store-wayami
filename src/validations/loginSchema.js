import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string()
    .required("O email é obrigatório")
    .email("Digite um email válido"),

  senha: yup
    .string()
    .required("A senha é obrigatória")
    .min(8, "A senha deve ter no mínimo 8 caracteres"),
});
