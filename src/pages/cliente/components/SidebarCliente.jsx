import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

export default function SidebarCliente({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <>
      <aside
        className={`
          bg-neutral-900
          w-64 fixed top-0 left-0 h-screen p-6
          transition-transform duration-300 overflow-y-auto
          ${sidebarOpen ? "translate-x-0" : "-translate-x-64"}
          md:translate-x-0
          z-50 flex flex-col
        `}
      >
        {/* Botão fechar mobile */}
        <button
          className="md:hidden absolute top-4 right-4 text-2xl text-neutral-50 hover:text-orange-500 transition"
          onClick={() => setSidebarOpen(false)}
          title="Fechar Menu"
        >
          <i className="fas fa-times"></i>
        </button>

        {/* Cabeçalho */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-1 tracking-wide mt-6 md:mt-0 text-neutral-50">
            Nwayami<span className="text-orange-500">Store</span>
          </h1>
          <p className="text-sm text-neutral-400 mb-8 truncate">
            Área do Cliente
          </p>

          {/* Navegação */}
          <nav className="space-y-3 text-sm">
            <Link
              to="/"
              className="block p-3 rounded-lg text-neutral-50 hover:bg-neutral-800 transition font-medium"
            >
              <i className="fas fa-desktop mr-3 text-orange-500"></i>
              Ver Site
            </Link>
            <Link
              to="/dashboard/cliente"
              className="block p-3 rounded-lg text-neutral-50 hover:bg-neutral-800 transition font-medium"
            >
              <i className="fas fa-gauge-high mr-3 text-orange-500"></i>
              Dashboard
            </Link>

            <Link
              to="/dashboard/cliente/pedidos"
              className="block p-3 rounded-lg text-neutral-50 hover:bg-neutral-800 transition font-medium"
            >
              <i className="fas fa-box mr-3 text-orange-500"></i>
              Meus Pedidos
            </Link>

            <Link
              to="/dashboard/cliente/enderecos"
              className="block p-3 rounded-lg text-neutral-50 hover:bg-neutral-800 transition font-medium"
            >
              <i className="fas fa-location-dot mr-3 text-orange-500"></i>
              Endereços
            </Link>

            <Link
              to="/dashboard/cliente/perfil"
              className="block p-3 rounded-lg text-neutral-50 hover:bg-neutral-800 transition font-medium"
            >
              <i className="fas fa-user mr-3 text-orange-500"></i>
              Meu Perfil
            </Link>

            <Link
              to="/dashboard/cliente/notificacoes"
              className="block p-3 rounded-lg text-neutral-50 hover:bg-neutral-800 transition font-medium"
            >
              <i className="fas fa-bell mr-3 text-orange-500"></i>
              Notificações
            </Link>
          </nav>
        </div>

        {/* Logout */}
        <div className="pt-6 border-t border-neutral-800">
          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="flex items-center cursor-pointer w-full p-3 rounded-lg text-neutral-50 hover:bg-red-500/20 transition font-semibold"
            title="Terminar sessão"
          >
            <i className="fas fa-sign-out-alt mr-3"></i>
            Sair
          </button>
        </div>
      </aside>

      {/* Overlay mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm md:hidden z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
}
