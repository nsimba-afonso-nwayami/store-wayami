import * as yup from "yup";

export const enderecoSchema = yup.object().shape({
  rua: yup
    .string()
    .required("A rua é obrigatória.")
    .min(5, "A rua deve ter pelo menos 5 caracteres."),

  cidade: yup
    .string()
    .required("A cidade é obrigatória."),

  provincia: yup
    .string()
    .required("A província é obrigatória."),

  codigo_postal: yup
    .string()
    .required("O código postal é obrigatório.")
    .min(4, "Código postal inválido."),

  pais: yup
    .string()
    .required("O país é obrigatório."),
});