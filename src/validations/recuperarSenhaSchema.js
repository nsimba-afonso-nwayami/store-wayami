import * as yup from "yup";

export const recuperarSenhaSchema = yup.object({
  email: yup
    .string()
    .required("O email é obrigatório")
    .email("Digite um email válido"),
});
