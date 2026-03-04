import { useEffect, useState } from "react";
import ClienteLayout from "./components/ClienteLayout";
import Modal from "./components/Modal";
import { listarPedidos, buscarPedidoPorId } from "../../services/pedidoService";

export default function MeusPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [busca, setBusca] = useState("");
  const [openDetalhes, setOpenDetalhes] = useState(false);
  const [pedidoSelecionado, setPedidoSelecionado] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarPedidos() {
      try {
        const data = await listarPedidos();
        setPedidos(data || []);
      } catch (error) {
        console.error("Erro ao carregar pedidos:", error);
      } finally {
        setLoading(false);
      }
    }

    carregarPedidos();
  }, []);

  const pedidosFiltrados = pedidos.filter((item) => {
    if (!busca) return true;

    return (
      String(item.id).includes(busca) ||
      (item.produto?.nome || "").toLowerCase().includes(busca.toLowerCase())
    );
  });

  const abrirDetalhes = async (item) => {
    try {
      const detalhes = await buscarPedidoPorId(item.id);
      setPedidoSelecionado(detalhes);
      setOpenDetalhes(true);
    } catch (error) {
      console.error("Erro ao buscar detalhes:", error);
    }
  };

  if (loading) {
    return (
      <ClienteLayout title="Meus Pedidos">
        <section className="w-full bg-neutral-100 py-16 pt-47 text-center">
          <i className="fas fa-spinner fa-spin text-3xl text-orange-500 mb-3"></i>
          <p className="text-neutral-600">Carregando...</p>
        </section>
      </ClienteLayout>
    );
  }

  return (
    <>
      <title>Meus Pedidos | Nwayami Store</title>

      <ClienteLayout title="Meus Pedidos">
        {/* BUSCA */}
        <section className="bg-white p-6 rounded-xl shadow-sm mb-6">
          <input
            type="text"
            placeholder="Buscar por número do pedido ou produto..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="p-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-orange-500 w-full"
          />
        </section>

        {/* LISTA */}
        <section className="flex flex-col gap-4">
          {pedidosFiltrados.length === 0 ? (
            <div className="bg-white p-6 rounded-xl shadow-sm text-center text-neutral-500">
              Nenhum pedido encontrado.
            </div>
          ) : (
            pedidosFiltrados.map((item) => (
              <div
                key={item.id}
                className="bg-neutral-50 border border-neutral-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
              >
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <p className="font-semibold text-neutral-900">
                      Pedido #{item.id}
                    </p>
                    <p className="text-neutral-500 text-sm">
                      {item.produto?.nome || "Produto"}
                    </p>
                  </div>
                </div>

                <p className="text-neutral-600 text-sm">
                  Data:{" "}
                  <strong>
                    {item.criado_em
                      ? new Date(item.criado_em).toLocaleDateString()
                      : "-"}
                  </strong>
                </p>

                <p className="text-neutral-600 text-sm">
                  Valor:{" "}
                  <strong>
                    {item.total
                      ? `${Number(item.total).toLocaleString()} AKZ`
                      : "-"}
                  </strong>
                </p>

                <div className="flex justify-end items-center mt-4">
                  <button
                    onClick={() => abrirDetalhes(item)}
                    className="text-orange-500 hover:text-orange-600 cursor-pointer flex items-center gap-1 text-sm font-semibold"
                  >
                    <i className="fas fa-eye"></i> Ver Detalhes
                  </button>
                </div>
              </div>
            ))
          )}
        </section>

        {/* MODAL DETALHES */}
        <Modal
          isOpen={openDetalhes}
          onClose={() => setOpenDetalhes(false)}
          title="Detalhes do Pedido"
          icon="fas fa-box"
        >
          {pedidoSelecionado && (
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-6">
                <h2 className="text-xl font-bold text-neutral-800">
                  Pedido #{pedidoSelecionado.id}
                </h2>
                <p className="text-neutral-500">Detalhes do pedido</p>
              </div>

              <div className="bg-white border border-neutral-200 rounded-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-neutral-500">Número do Pedido</p>
                  <p className="font-semibold text-neutral-800">
                    {pedidoSelecionado.id}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-neutral-500">Data</p>
                  <p className="font-semibold text-neutral-800">
                    {pedidoSelecionado.criado_em
                      ? new Date(pedidoSelecionado.criado_em).toLocaleString()
                      : "-"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-neutral-500">Valor Total</p>
                  <p className="font-semibold text-neutral-800">
                    {pedidoSelecionado.total
                      ? `${Number(
                          pedidoSelecionado.total,
                        ).toLocaleString()} AKZ`
                      : "-"}
                  </p>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setOpenDetalhes(false)}
                  className="px-6 py-2 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 rounded-lg cursor-pointer"
                >
                  Fechar
                </button>
              </div>
            </div>
          )}
        </Modal>
      </ClienteLayout>
    </>
  );
}
