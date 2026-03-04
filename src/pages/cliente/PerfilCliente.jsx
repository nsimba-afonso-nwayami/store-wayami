import ClienteLayout from "./components/ClienteLayout";

export default function PerfilCliente() {
  return (
    <>
      <title>Meu Perfil | Wayami Store</title>

      <ClienteLayout title="Meu Perfil">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* ===== Informações do Cliente ===== */}
          <section className="bg-neutral-50 border border-neutral-400 rounded-xl shadow-sm p-6 md:p-8 space-y-4">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Foto */}
              <div className="shrink-0">
                <img
                  src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSgJ1FO3FHIR9B-BULDxnMCDBg19lJSDqozeZ9GvQyMZVwc1D01Ck1GVRNjOCUW"
                  alt="Cliente"
                  className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-orange-400 object-cover"
                />
              </div>

              {/* Informações */}
              <div className="flex-1 space-y-1">
                <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">
                  João da Silva
                </h2>
                <p className="text-sm md:text-base text-neutral-400">
                  Cliente registrado desde: 10/06/2023
                </p>
                <p className="text-sm md:text-base text-neutral-400">
                  Email: joao@email.com
                </p>
                <p className="text-sm md:text-base text-neutral-400">
                  Telefone: +244 923 111 222
                </p>
              </div>
            </div>
          </section>

          {/* ===== Formulário de Editar Perfil ===== */}
          <div className="bg-neutral-50 border border-neutral-400 rounded-xl shadow-sm p-6 md:p-8 space-y-4">
            <h3 className="text-xl font-semibold text-orange-600 mb-4">
              Editar Perfil
            </h3>

            <form className="space-y-4">
              {/* Foto */}
              <div>
                <label className="block text-sm text-neutral-800 font-medium mb-1">
                  Foto de Perfil
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full border border-neutral-400 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {/* Campos */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-neutral-800 font-medium mb-1">
                    Nome
                  </label>
                  <input
                    type="text"
                    defaultValue="João da Silva"
                    className="w-full border border-neutral-400 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-neutral-800 font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue="joao@email.com"
                    className="w-full border border-neutral-400 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-neutral-800 font-medium mb-1">
                    Telefone
                  </label>
                  <input
                    type="text"
                    defaultValue="+244 923 111 222"
                    className="w-full border border-neutral-400 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-6 py-2 cursor-pointer bg-orange-500 hover:bg-orange-600 text-neutral-50 font-semibold rounded-lg transition"
              >
                Salvar Alterações
              </button>
            </form>
          </div>

          {/* ===== Formulário Alterar Senha ===== */}
          <div className="bg-neutral-50 border border-neutral-400 rounded-xl shadow-sm p-6 md:p-8 space-y-4">
            <h3 className="text-xl font-semibold text-orange-600 mb-4">
              Alterar Senha
            </h3>

            <form className="space-y-4">
              <div>
                <label className="block text-sm text-neutral-800 font-medium mb-1">
                  Senha Atual
                </label>
                <input
                  type="password"
                  placeholder="********"
                  className="w-full border border-neutral-400 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm text-neutral-800 font-medium mb-1">
                  Nova Senha
                </label>
                <input
                  type="password"
                  placeholder="********"
                  className="w-full border border-neutral-400 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm text-neutral-800 font-medium mb-1">
                  Confirmar Nova Senha
                </label>
                <input
                  type="password"
                  placeholder="********"
                  className="w-full border border-neutral-400 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2 cursor-pointer bg-orange-500 hover:bg-orange-600 text-neutral-50 font-semibold rounded-lg transition"
              >
                Alterar Senha
              </button>
            </form>
          </div>
        </div>
      </ClienteLayout>
    </>
  );
}
