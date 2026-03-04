import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

export default function HeaderCliente({ sidebarOpen, setSidebarOpen, title }) {
  const { user } = useAuth();

  return (
    <header
      className="
        bg-neutral-900
        fixed top-0 right-0 left-0 md:left-64
        h-16 flex items-center justify-between
        px-4 sm:px-6
        z-30
      "
    >
      <button
        className="md:hidden text-2xl text-neutral-50 hover:text-orange-500 transition"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <i className="fas fa-bars"></i>
      </button>

      <h2 className="text-lg sm:text-xl font-bold text-neutral-50">
        {title}
      </h2>

      <div className="flex items-center gap-4">
        <Link
          to="/dashboard/cliente/notificacoes"
          className="relative text-xl text-neutral-50 hover:text-orange-500 transition"
        >
          <i className="fas fa-bell"></i>
          <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
            3
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <span className="text-sm text-neutral-200 hidden sm:block">
            Olá, {user?.username || user?.nome}
          </span>
          <Link
            to="/dashboard/cliente/perfil"
            className="w-9 h-9 bg-orange-500 rounded-full flex items-center justify-center"
          >
            <i className="fas fa-user text-white"></i>
          </Link>
        </div>
      </div>
    </header>
  );
}
