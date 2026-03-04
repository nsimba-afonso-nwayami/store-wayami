import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <title>Página não encontrada | Nwayami Store</title>

      <section className="w-full min-h-[70vh] bg-neutral-100 pt-47 pb-16 flex items-center">
        <div className="max-w-xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow p-8 text-center">
            {/* Ícone */}
            <div className="text-orange-500 text-5xl mb-4">
              <i className="fa-solid fa-triangle-exclamation"></i>
            </div>

            {/* Código 404 */}
            <h1 className="text-5xl font-bold text-neutral-800 mb-2">404</h1>

            {/* Mensagem */}
            <h2 className="text-xl font-semibold text-neutral-700 mb-3">
              Página não encontrada
            </h2>
            <p className="text-sm text-neutral-500 mb-6">
              A página que você está procurando não existe ou foi movida.
            </p>

            {/* Botões */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/"
                className="px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition flex items-center justify-center gap-2"
              >
                <i className="fa-solid fa-house"></i>
                Página inicial
              </Link>

              <Link
                to="/produtos"
                className="px-6 py-3 border border-neutral-400 text-neutral-700 rounded-lg font-semibold hover:bg-neutral-200 transition flex items-center justify-center gap-2"
              >
                <i className="fa-solid fa-bag-shopping"></i>
                Ver produtos
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
