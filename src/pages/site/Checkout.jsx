import { Link, useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { checkoutSchema } from "../../validations/checkoutSchema";
import { criarPedido } from "../../services/pedidoService";
import logo from "../../assets/img/logo.jpg";

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

  const gerarProforma = (data) => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4"
    });

    const agora = new Date();

    const dataEmissao = agora.toLocaleDateString("pt-AO");
    const dataArquivo = dataEmissao.replaceAll("/", "-");
    const horaArquivo =
      agora.getHours().toString().padStart(2, "0") +
      agora.getMinutes().toString().padStart(2, "0");

    const nomeClienteLimpo = (data.nome || user?.username || "CLIENTE")
      .split(" ")[0]
      .toUpperCase();

    const nomeArquivo = `PROFORMA_${nomeClienteLimpo}_NWAYAMI_${dataArquivo}_${horaArquivo}.pdf`;

    const dataVencimento = new Date(
      agora.getTime() + 5 * 24 * 60 * 60 * 1000
    ).toLocaleDateString("pt-AO");

    // CONFIG GLOBAL
    doc.setDrawColor(0, 0, 0);
    doc.setTextColor(0, 0, 0);

    // =========================
    // LOGO
    // =========================
    try {
      doc.addImage(logo, "JPEG", 15, 10, 22, 12);
    } catch (e) {}

    // =========================
    // CABEÇALHO
    // =========================
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.text("N-WAYAMI STORE", 15, 26);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.text(
      [
        "CENTRALIDADE DO KILAMBA,",
        "QUARTEIRÃO F, EDIFÍCIO 27,",
        "APARTAMENTO Nº91",
        "Contribuinte: 5002061422",
        "E-mail: geral@nwayami.com",
        "Tel: 924054954"
      ],
      15,
      30
    );

    // CLIENTE
    doc.text("Exmo.(s) Sr.(s)", 140, 28);
    doc.setFont("helvetica", "bold");
    doc.text(
      data.nome?.toUpperCase() ||
        user?.username?.toUpperCase() ||
        "CONSUMIDOR FINAL",
      140,
      33
    );

    // =========================
    // TÍTULO
    // =========================
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("FATURA PROFORMA n.º", 15, 58);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.text("Original", 180, 58);

    doc.setLineWidth(0.2);
    doc.line(15, 61, 195, 61);

    // =========================
    // DATAS
    // =========================
    doc.setFontSize(7.5);

    doc.text("Data", 15, 66);
    doc.text("Vencimento", 55, 66);
    doc.text("Contribuinte", 120, 66);
    doc.text("V/ Ref.", 165, 66);

    doc.line(120, 67, 155, 67);

    doc.text(dataEmissao, 15, 71);
    doc.text(dataVencimento, 55, 71);
    doc.text("5002061422", 120, 71);

    // =========================
    // OBSERVAÇÕES
    // =========================
    doc.setFont("helvetica", "bold");
    doc.text("Observações", 15, 80);

    doc.setLineWidth(0.1);
    doc.line(15, 81, 195, 81);

    doc.setFont("helvetica", "normal");
    doc.text(
      "NÃO É UM DOCUMENTO DE VENDA, INVÁLIDO PARA SAÍDA DE MERCADORIA",
      15,
      85
    );

    doc.line(15, 86, 195, 86);

    // =========================
    // TABELA
    // =========================
    autoTable(doc, {
      startY: 88,
      head: [["Código", "Descrição", "P. Uni.", "Uni. Qtd.", "Taxa", "Total"]],
      body: cartItems.map((item) => {
        const pUni = aplicar25Porcento(item.preco_com_iva);

        return [
          item.id.toString().slice(-4),
          item.descricao.toUpperCase(),
          `${pUni.toLocaleString("pt-AO")} Kz`,
          item.quantidade,
          "0 %",
          `${(pUni * item.quantidade).toLocaleString("pt-AO")} Kz`
        ];
      }),
      theme: "plain",
      styles: {
        fontSize: 7.5,
        cellPadding: 1.5,
        textColor: 0
      },
      headStyles: {
        fontStyle: "bold",
        lineWidth: { bottom: 0.1 }
      },
      bodyStyles: {
        lineWidth: { bottom: 0.1 }
      },
      columnStyles: {
        2: { halign: "right" },
        3: { halign: "center" },
        4: { halign: "center" },
        5: { halign: "right" }
      }
    });

    // =========================
    // REGIME / TAXA (FINAL)
    // =========================
    let currentY = doc.lastAutoTable.finalY + 10; // ↑ mais espaço da tabela

    // linha curta com respiro
    doc.setLineWidth(0.2);
    doc.line(15, currentY - 4, 100, currentY - 4);

    // textos
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);

    // esquerda
    doc.text("0 %", 15, currentY);

    // valor MAIS À ESQUERDA (ajustado fino)
    doc.text("0,00 Kz", 92, currentY);

    // subtítulo
    doc.setFontSize(7);
    doc.text("(1) Regime Simplificado", 15, currentY + 4);

    // =========================
    // PAGAMENTO (ESQUERDA)
    // =========================
    const pagamentoY = currentY + 14;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);

    doc.text("Meio de", 15, pagamentoY);
    doc.text("Pagamento", 15, pagamentoY + 5);

    // linha média
    doc.setLineWidth(0.2);
    doc.line(15, pagamentoY + 7, 100, pagamentoY + 7);

    // conteúdo
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);

    doc.text("Transferência", 15, pagamentoY + 13);
    doc.text("Bancária", 15, pagamentoY + 18);

    // =========================
    // DADOS BANCÁRIOS
    // =========================
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);

    doc.text("Dados Bancários", 15, pagamentoY + 28);

    doc.setLineWidth(0.2);
    doc.line(15, pagamentoY + 30, 100, pagamentoY + 30);

    // labels
    doc.text("NIB", 15, pagamentoY + 36);
    doc.text("IBAN", 15, pagamentoY + 43);

    // valores
    doc.setFont("helvetica", "normal");

    doc.text("BANCO BIC", 50, pagamentoY + 36);
    doc.text("0051 0000 2251 7229 10156", 50, pagamentoY + 43);

    // linha inferior curta
    doc.line(15, pagamentoY + 46, 100, pagamentoY + 46);

    // =========================
    // LINHA GRANDE CENTRAL
    // =========================
    const linhaY = pagamentoY + 55;

    doc.setLineWidth(0.4);
    doc.line(15, linhaY, 195, linhaY);

    // =========================
    // RESUMO (DIREITA MAIS ABAIXO)
    // =========================
    const resumoX = 120;
    const resumoY = linhaY + 12;

    // topo (linha fina)
    doc.setLineWidth(0.2);
    doc.line(resumoX, resumoY - 4, 195, resumoY - 4);

    // títulos
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);

    doc.text("Taxa Base", resumoX, resumoY);
    doc.text("IVA", resumoX + 32, resumoY);
    doc.text("Sumário", resumoX + 50, resumoY);

    // =========================
    // CONTEÚDO
    // =========================
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);

    // linha 1
    doc.text(`S/IVA : ${totalPrice.toLocaleString("pt-AO")} Kz`, resumoX, resumoY + 7);
    doc.text("IVA:", resumoX + 32, resumoY + 7);

    // linha 2
    doc.setFont("helvetica", "bold");
    doc.text("Total Descontos", resumoX, resumoY + 15);

    doc.setFont("helvetica", "normal");
    doc.text("%", resumoX + 32, resumoY + 15);

    // linha final valores
    doc.text("00,00 kz", resumoX, resumoY + 23);
    doc.text("0", resumoX + 32, resumoY + 23);

    doc.text(
      `${totalPrice.toLocaleString("pt-AO")} kz`,
      195,
      resumoY + 23,
      { align: "right" }
    );

    // linha inferior resumo
    doc.setLineWidth(0.3);
    doc.line(resumoX, resumoY + 27, 195, resumoY + 27);

    // =========================
    // TOTAL FINAL (MAIS AFASTADO)
    // =========================
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);

    doc.text("Total", resumoX, resumoY + 38);

    // =========================
    // RODAPÉ
    // =========================
    const footerY = 280;

    doc.setFontSize(7);
    doc.setFont("helvetica", "normal");

    doc.text("N. WAYAMI STORE", 15, footerY);
    doc.text("Tel. +244 924 054 954", 15, footerY + 3);

    doc.text(
      "Centralidade do Kilamba, Quarteirão F27, Apt n.91",
      50,
      footerY
    );
    doc.text("geral@nwayami.com", 50, footerY + 3);

    doc.text(
      "Município de Kilamba, Luanda, República de Angola",
      120,
      footerY
    );
    doc.text("www.store.nwayami.com", 120, footerY + 3);

    // SALVAR
    doc.save(nomeArquivo);
  };

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
                      className={`w-full resize-none border rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500 ${
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

              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={handleSubmit(gerarProforma)}
                  className="w-full bg-neutral-800 text-white py-3 rounded-lg font-semibold hover:bg-neutral-900 transition cursor-pointer"
                >
                  Gerar Fatura Proforma
                </button>

                <button
                  type="submit"
                  className="w-full bg-orange-500 text-neutral-50 py-3 rounded-lg font-semibold hover:bg-orange-600 transition cursor-pointer"
                >
                  Confirmar Pedido
                </button>
              </div>
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
