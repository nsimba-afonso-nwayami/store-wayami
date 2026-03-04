import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ClienteLayout from "./components/ClienteLayout";

import { listarPedidos } from "../../services/pedidoService";
import { listarEnderecos } from "../../services/enderecoService";

export default function DashboardCliente() {
  const [pedidos, setPedidos] = useState([]);
  const [enderecos, setEnderecos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      try {
        const [pedidosData, enderecosData] = await Promise.all([
          listarPedidos(),
          listarEnderecos(),
        ]);

        setPedidos(pedidosData || []);
        setEnderecos(enderecosData || []);
      } catch (error) {
        console.error("Erro ao carregar dashboard:", error);
      } finally {
        setLoading(false);
      }
    }

    carregarDados();
  }, []);

  if (loading) {
    return (
      <ClienteLayout title="Minha Conta">
        <section className="w-full bg-neutral-100 py-16 pt-47 text-center">
          <i className="fas fa-spinner fa-spin text-3xl text-orange-500 mb-3"></i>
          <p className="text-neutral-600">Carregando...</p>
        </section>
      </ClienteLayout>
    );
  }

  return (
    <>
      <title>Dashboard Cliente | Nwayami Store</title>

      <ClienteLayout title="Minha Conta">
        {/* RESUMO */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Total Pedidos */}
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-orange-500">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-neutral-500">Total de Pedidos</p>
                <h3 className="text-2xl font-bold text-neutral-900">
                  {pedidos.length}
                </h3>
              </div>
              <i className="fas fa-box text-orange-500 text-2xl"></i>
            </div>
          </div>

          {/* Total Endereços */}
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-neutral-500">Meus Endereços</p>
                <h3 className="text-2xl font-bold text-neutral-900">
                  {enderecos.length}
                </h3>
              </div>
              <i className="fas fa-map-marker-alt text-blue-500 text-2xl"></i>
            </div>
          </div>
        </section>

        {/* PEDIDOS + AÇÕES */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* ÚLTIMOS PEDIDOS */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-bold text-neutral-800 mb-4">
              Últimos Pedidos
            </h2>

            {pedidos.length === 0 ? (
              <p className="text-sm text-neutral-500">
                Você ainda não realizou nenhum pedido.
              </p>
            ) : (
              <ul className="divide-y divide-neutral-200">
                {pedidos.slice(0, 5).map((pedido) => (
                  <li key={pedido.id} className="py-3 flex justify-between">
                    <div>
                      <p className="font-medium text-neutral-900">
                        Pedido #{pedido.id}
                      </p>
                      <p className="text-sm text-neutral-500">
                        Total: {pedido.total || "—"}
                      </p>
                    </div>
                    <span className="text-sm text-neutral-500">
                      {pedido.criado_em
                        ? new Date(pedido.criado_em).toLocaleDateString()
                        : ""}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            <Link
              to="/dashboard/cliente/pedidos"
              className="mt-4 inline-block text-sm font-semibold text-orange-500 hover:text-orange-600"
            >
              Ver todos os pedidos →
            </Link>
          </div>

          {/* AÇÕES RÁPIDAS */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-bold text-neutral-800 mb-4">
              Ações Rápidas
            </h2>

            <ul className="divide-y divide-neutral-200">
              <li className="py-3 flex justify-between items-center">
                <div>
                  <p className="font-medium text-neutral-900">Meus Pedidos</p>
                  <p className="text-sm text-neutral-500">
                    Acompanhe suas compras
                  </p>
                </div>
                <Link
                  to="/dashboard/cliente/pedidos"
                  className="px-3 py-1 text-sm bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold"
                >
                  Acessar
                </Link>
              </li>

              <li className="py-3 flex justify-between items-center">
                <div>
                  <p className="font-medium text-neutral-900">Meus Endereços</p>
                  <p className="text-sm text-neutral-500">
                    Gerencie seus endereços
                  </p>
                </div>
                <Link
                  to="/dashboard/cliente/enderecos"
                  className="px-3 py-1 text-sm bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold"
                >
                  Acessar
                </Link>
              </li>

              <li className="py-3 flex justify-between items-center">
                <div>
                  <p className="font-medium text-neutral-900">Editar Perfil</p>
                  <p className="text-sm text-neutral-500">
                    Atualize seus dados
                  </p>
                </div>
                <Link
                  to="/dashboard/cliente/perfil"
                  className="px-3 py-1 text-sm bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold"
                >
                  Acessar
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </ClienteLayout>
    </>
  );
}
