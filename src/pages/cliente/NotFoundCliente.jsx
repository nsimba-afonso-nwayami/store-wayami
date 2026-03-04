import { Link } from "react-router-dom";
import ClienteLayout from "./components/ClienteLayout";

export default function NotFoundCliente() {
  return (
    <>
      <title>Página não encontrada | Wayami Store</title>

      <ClienteLayout title="Página não encontrada">
        <main className="flex flex-col items-center justify-center min-h-[70vh] bg-neutral-50 px-6 text-center py-24">
          {/* Ícone animado */}
          <i className="fa-solid fa-user text-orange-500 text-5xl mb-4 fa-beat"></i>

          {/* Número 404 */}
          <h1 className="text-6xl font-extrabold text-orange-500 mb-4">404</h1>

          {/* Título */}
          <h2 className="text-xl md:text-2xl font-bold text-neutral-800 mb-2">
            Oops! Página não encontrada
          </h2>

          {/* Descrição */}
          <p className="text-neutral-400 mb-6 max-w-md text-sm md:text-base">
            A página que você está tentando acessar não existe ou foi movida.
            Verifique o endereço ou volte para o dashboard.
          </p>

          {/* Botão */}
          <Link
            to="/dashboard/cliente"
            className="inline-block px-6 py-3 bg-orange-500 text-neutral-50 font-semibold rounded-lg hover:bg-orange-600 transition cursor-pointer text-sm"
          >
            Voltar para o Dashboard
          </Link>
        </main>
      </ClienteLayout>
    </>
  );
}
