import * as yup from "yup";

export const checkoutSchema = yup.object({
  nome: yup.string().required("O nome é obrigatório"),
  endereco: yup.string().required("O endereço é obrigatório"),
  referencia: yup.string().required("O ponto de referência é obrigatório"),
  instrucoes: yup.string().required("As instruções de entrega são obrigatórias"),
  pagamento: yup.string().required("Selecione um método de pagamento"),
});