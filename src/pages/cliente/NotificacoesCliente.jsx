import { useState } from "react";
import ClienteLayout from "./components/ClienteLayout";

export default function NotificacoesCliente() {
  // Estados dos switches
  const [pedidos, setPedidos] = useState(true);
  const [promocoes, setPromocoes] = useState(true);
  const [mensagens, setMensagens] = useState(true);

  // Notificações dummy
  const notificacoes = [
    {
      id: 1,
      tipo: "Pedido",
      descricao: "Seu pedido #NW-1001 foi enviado com sucesso.",
      data: "12/02/2026",
      icone: "fas fa-box",
      cor: "text-orange-500",
    },
    {
      id: 2,
      tipo: "Promoção",
      descricao:
        "Desconto de 15% em produtos selecionados neste fim de semana!",
      data: "10/02/2026",
      icone: "fas fa-tag",
      cor: "text-orange-500",
    },
    {
      id: 3,
      tipo: "Mensagem",
      descricao: "Suporte respondeu à sua dúvida sobre o pagamento.",
      data: "09/02/2026",
      icone: "fas fa-envelope",
      cor: "text-orange-500",
    },
  ];

  return (
    <>
      <title>Notificações | Wayami Store</title>

      <ClienteLayout title="Notificações">
        {/* CONFIGURAÇÕES DE NOTIFICAÇÃO */}
        <div className="bg-neutral-50 p-6 rounded-xl shadow-sm mb-6">
          <h2 className="text-xl font-bold text-orange-600 mb-4">
            Configurações de Notificação
          </h2>
          <p className="text-neutral-400 mb-6">
            Ative ou desative os tipos de notificações que deseja receber.
          </p>

          <div className="grid gap-4">
            {/* Pedidos */}
            <div className="flex justify-between items-center border-b border-neutral-400 pb-3">
              <div>
                <p className="font-medium text-neutral-800">
                  Notificações de Pedidos
                </p>
                <p className="text-sm text-neutral-400">
                  Receba alertas sobre seus pedidos
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={pedidos}
                  onChange={() => setPedidos(!pedidos)}
                />
                <div
                  className={`w-11 h-6 rounded-full transition-colors ${
                    pedidos ? "bg-orange-500" : "bg-neutral-400"
                  }`}
                ></div>
                <div
                  className={`absolute left-1 top-1 w-4 h-4 bg-neutral-50 rounded-full shadow transform transition-transform ${
                    pedidos ? "translate-x-5" : "translate-x-0"
                  }`}
                ></div>
              </label>
            </div>

            {/* Promoções */}
            <div className="flex justify-between items-center border-b border-neutral-400 pb-3">
              <div>
                <p className="font-medium text-neutral-800">
                  Notificações de Promoções
                </p>
                <p className="text-sm text-neutral-400">
                  Receba novidades e descontos especiais
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={promocoes}
                  onChange={() => setPromocoes(!promocoes)}
                />
                <div
                  className={`w-11 h-6 rounded-full transition-colors ${
                    promocoes ? "bg-orange-500" : "bg-neutral-400"
                  }`}
                ></div>
                <div
                  className={`absolute left-1 top-1 w-4 h-4 bg-neutral-50 rounded-full shadow transform transition-transform ${
                    promocoes ? "translate-x-5" : "translate-x-0"
                  }`}
                ></div>
              </label>
            </div>

            {/* Mensagens */}
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-neutral-800">
                  Notificações de Mensagens
                </p>
                <p className="text-sm text-neutral-400">
                  Receba respostas e avisos do suporte
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={mensagens}
                  onChange={() => setMensagens(!mensagens)}
                />
                <div
                  className={`w-11 h-6 rounded-full transition-colors ${
                    mensagens ? "bg-orange-500" : "bg-neutral-400"
                  }`}
                ></div>
                <div
                  className={`absolute left-1 top-1 w-4 h-4 bg-neutral-50 rounded-full shadow transform transition-transform ${
                    mensagens ? "translate-x-5" : "translate-x-0"
                  }`}
                ></div>
              </label>
            </div>
          </div>
        </div>

        {/* LISTA DE NOTIFICAÇÕES */}
        <div className="bg-neutral-50 p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-bold text-orange-600 mb-4">
            Notificações Recentes
          </h2>
          <ul className="divide-y divide-neutral-400">
            {notificacoes.map((noti) => (
              <li
                key={noti.id}
                className="flex justify-between items-center py-4"
              >
                <div className="flex gap-4 items-start">
                  <i className={`${noti.icone} ${noti.cor} text-lg mt-1`}></i>
                  <div>
                    <p className="font-medium text-neutral-800">{noti.tipo}</p>
                    <p className="text-sm text-neutral-400">{noti.descricao}</p>
                  </div>
                </div>
                <span className="text-sm text-neutral-400">{noti.data}</span>
              </li>
            ))}
          </ul>
        </div>
      </ClienteLayout>
    </>
  );
}
