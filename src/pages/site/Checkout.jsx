import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { checkoutSchema } from "../../validations/checkoutSchema";
import { criarPedido } from "../../services/pedidoService";

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, totalPrice, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(checkoutSchema),
    defaultValues: {
      nome: user?.username || "",
      endereco: "",
      referencia: "",
      instrucoes: "",
      pagamento: "",
    },
  });

  useEffect(() => {
    if (cartItems.length === 0) {
      toast.error("Seu carrinho está vazio!");
      navigate("/carrinho");
    }
  }, [cartItems, navigate]);

  const round2 = (n) => Math.round((Number(n) + Number.EPSILON) * 100) / 100;

  const aplicar25Porcento = (preco) => round2(Number(preco || 0) * 1.25);

  const onSubmit = async (data) => {
    if (!isAuthenticated) {
      toast.error("Faça login para continuar.");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Não é possível finalizar. O carrinho está vazio.");
      return;
    }

    // mesma lógica do ConfirmarEncomenda
    const linhas = cartItems.map((item) => {
      const quantidade = item.quantidade || 1;
      const precoUnitario25 = aplicar25Porcento(item.preco_com_iva);

      return {
        id: item.id,
        preco_com_iva: precoUnitario25,
        quantity: quantidade,
      };
    });

    const pedido = {
      endereco: data.endereco, // se backend espera ID, aqui deve ser ID
      pontoReferencia: data.referencia,
      instrucoesEntrega: data.instrucoes,
      metodoPagamento: data.pagamento,
      cart: linhas,
    };

    const toastId = toast.loading("Criando pedido...");

    try {
      const response = await criarPedido(pedido);

      const emailStatus = response?.email;

      if (emailStatus === "enviado") {
        toast.success("Pedido confirmado e e-mail enviado!", {
          id: toastId,
        });
      } else {
        toast.success("Pedido confirmado!", { id: toastId });
      }

      clearCart();
      navigate("/");
    } catch (error) {
      console.error("Erro detalhado:", error.response?.data);
      toast.error("Erro ao criar pedido. Tente novamente.", {
        id: toastId,
      });
    }
  };

  return (
    <>
      <title>Checkout | Nwayami Store</title>
      <section className="w-full bg-neutral-50 py-16 pt-47">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-10">
            Finalizar Compra
          </h1>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* FORMULÁRIO */}
            <form
              className="flex-1 flex flex-col gap-8"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* Dados de Entrega */}
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-lg font-bold text-neutral-800 mb-6">
                  Dados de Entrega
                </h2>

                <div className="flex flex-col gap-4">
                  {/* Nome */}
                  <div className="flex flex-col gap-1">
                    <label className="text-sm text-neutral-800">
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      {...register("nome")}
                      className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500 ${
                        errors.nome ? "border-red-500" : "border-neutral-400"
                      }`}
                    />
                    {errors.nome && (
                      <p className="text-red-500 text-sm">
                        {errors.nome.message}
                      </p>
                    )}
                  </div>

                  {/* Endereço */}
                  <div className="flex flex-col gap-1">
                    <label className="text-sm text-neutral-800">
                      Endereço Completo
                    </label>
                    <input
                      type="text"
                      {...register("endereco")}
                      className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500 ${
                        errors.endereco
                          ? "border-red-500"
                          : "border-neutral-400"
                      }`}
                    />
                    {errors.endereco && (
                      <p className="text-red-500 text-sm">
                        {errors.endereco.message}
                      </p>
                    )}
                  </div>

                  {/* Referência */}
                  <div className="flex flex-col gap-1">
                    <label className="text-sm text-neutral-800">
                      Ponto de Referência
                    </label>
                    <input
                      type="text"
                      {...register("referencia")}
                      className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500 ${
                        errors.referencia
                          ? "border-red-500"
                          : "border-neutral-400"
                      }`}
                    />
                    {errors.referencia && (
                      <p className="text-red-500 text-sm">
                        {errors.referencia.message}
                      </p>
                    )}
                  </div>

                  {/* Instruções */}
                  <div className="flex flex-col gap-1">
                    <label className="text-sm text-neutral-800">
                      Instruções de Entrega
                    </label>
                    <textarea
                      rows="3"
                      {...register("instrucoes")}
                      className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500 ${
                        errors.instrucoes
                          ? "border-red-500"
                          : "border-neutral-400"
                      }`}
                    />
                    {errors.instrucoes && (
                      <p className="text-red-500 text-sm">
                        {errors.instrucoes.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Método de Pagamento */}
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-lg font-bold text-neutral-800 mb-6">
                  Método de Pagamento
                </h2>
                <div className="flex flex-col gap-3">
                  {["multicaixa", "transferencia", "entrega"].map((metodo) => (
                    <label
                      key={metodo}
                      className="flex items-center gap-3 border border-neutral-400 rounded-lg p-3 cursor-pointer hover:border-orange-500"
                    >
                      <input
                        type="radio"
                        {...register("pagamento")}
                        value={metodo}
                      />
                      <span className="text-neutral-800">
                        {metodo === "multicaixa"
                          ? "Multicaixa Express"
                          : metodo === "transferencia"
                            ? "Transferência Bancária"
                            : "Pagamento na Entrega"}
                      </span>
                    </label>
                  ))}
                  {errors.pagamento && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.pagamento.message}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-orange-500 text-neutral-50 py-3 rounded-lg font-semibold hover:bg-orange-600 transition cursor-pointer"
              >
                Confirmar Pedido
              </button>
            </form>

            {/* RESUMO */}
            <aside className="w-full lg:w-80">
              <div className="bg-white rounded-xl shadow p-6 sticky top-40">
                <h2 className="text-lg font-bold text-neutral-800 mb-4">
                  Resumo do Pedido
                </h2>

                <div className="flex flex-col gap-3 mb-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between text-sm text-neutral-600"
                    >
                      <span>
                        {item.descricao} x{item.quantidade}
                      </span>
                      <span>
                        {(item.preco_com_iva * item.quantidade).toLocaleString(
                          "pt-AO",
                        )}{" "}
                        Kz
                      </span>
                    </div>
                  ))}
                </div>

                <hr className="mb-4" />

                <div className="flex justify-between text-sm text-neutral-400 mb-2">
                  <span>Subtotal</span>
                  <span>{totalPrice.toLocaleString("pt-AO")} Kz</span>
                </div>

                <div className="flex justify-between text-lg font-bold text-neutral-800 mb-6">
                  <span>Total</span>
                  <span className="text-orange-500">
                    {totalPrice.toLocaleString("pt-AO")} Kz
                  </span>
                </div>

                <Link
                  to="/carrinho"
                  className="block text-center mt-4 text-sm text-neutral-400 hover:text-orange-500 transition"
                >
                  Voltar ao Carrinho
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
