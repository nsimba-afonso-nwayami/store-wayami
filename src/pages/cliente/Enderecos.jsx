import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import ClienteLayout from "./components/ClienteLayout";
import Modal from "./components/Modal";
import {
  listarEnderecos,
  criarEndereco,
  atualizarEndereco,
  removerEndereco,
} from "../../services/enderecoService";
import { enderecoSchema } from "../../validations/enderecoSchema";

export default function Enderecos() {
  const [enderecos, setEnderecos] = useState([]);
  const [busca, setBusca] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [enderecoSelecionado, setEnderecoSelecionado] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(enderecoSchema),
  });

  useEffect(() => {
    async function carregar() {
      try {
        const data = await listarEnderecos();
        setEnderecos(data || []);
      } catch (error) {
        console.error("Erro ao carregar endereços:", error);
        toast.error("Erro ao carregar endereços.");
      } finally {
        setLoading(false);
      }
    }

    carregar();
  }, []);

  const enderecosFiltrados = enderecos.filter((item) => {
    if (!busca) return true;

    return (
      item.rua?.toLowerCase().includes(busca.toLowerCase()) ||
      item.cidade?.toLowerCase().includes(busca.toLowerCase()) ||
      item.provincia?.toLowerCase().includes(busca.toLowerCase()) ||
      item.pais?.toLowerCase().includes(busca.toLowerCase())
    );
  });

  const abrirModal = (endereco = null) => {
    setEnderecoSelecionado(endereco);

    if (endereco) {
      reset({
        rua: endereco.rua || "",
        cidade: endereco.cidade || "",
        provincia: endereco.provincia || "",
        codigo_postal: endereco.codigo_postal || "",
        pais: endereco.pais || "",
      });
    } else {
      reset({
        rua: "",
        cidade: "",
        provincia: "",
        codigo_postal: "",
        pais: "",
      });
    }

    setOpenModal(true);
  };

  const salvarEndereco = async (data) => {
    setSaving(true);
    const toastId = toast.loading(
      enderecoSelecionado ? "Atualizando endereço..." : "Salvando endereço...",
    );

    try {
      if (enderecoSelecionado) {
        await atualizarEndereco(enderecoSelecionado.id, data);
        toast.success("Endereço atualizado com sucesso!", { id: toastId });
      } else {
        await criarEndereco(data);
        toast.success("Endereço criado com sucesso!", { id: toastId });
      }

      const novos = await listarEnderecos();
      setEnderecos(novos || []);
      setOpenModal(false);
    } catch (error) {
      console.error("Erro ao salvar endereço:", error);
      toast.error("Erro ao salvar endereço. Tente novamente.", { id: toastId });
    } finally {
      setSaving(false);
    }
  };

  const excluirEndereco = async (id) => {
    if (!window.confirm("Deseja remover este endereço?")) return;

    try {
      await removerEndereco(id);
      const data = await listarEnderecos();
      setEnderecos(data || []);
      toast.success("Endereço removido com sucesso!");
    } catch (error) {
      console.error("Erro ao remover endereço:", error);
      toast.error("Erro ao remover endereço.");
    }
  };

  if (loading) {
    return (
      <ClienteLayout title="Meus Endereços">
        <section className="w-full bg-neutral-100 py-16 pt-47 text-center">
          <i className="fas fa-spinner fa-spin text-3xl text-orange-500 mb-3"></i>
          <p className="text-neutral-600">Carregando...</p>
        </section>
      </ClienteLayout>
    );
  }

  return (
    <>
      <title>Meus Endereços | Dashboard Cliente</title>

      <ClienteLayout title="Meus Endereços">
        <div className="flex justify-end mb-6">
          <button
            onClick={() => abrirModal()}
            className="px-5 py-3 cursor-pointer bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold flex items-center gap-2"
          >
            <i className="fas fa-plus"></i> Novo Endereço
          </button>
        </div>

        <section className="bg-white p-6 rounded-xl shadow-sm mb-6">
          <input
            type="text"
            placeholder="Buscar por rua, cidade, província ou país..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="p-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-orange-500 w-full"
          />
        </section>

        {enderecosFiltrados.length === 0 ? (
          <div className="bg-white p-6 rounded-xl shadow-sm text-center text-neutral-500">
            Endereços não encontrados.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {enderecosFiltrados.map((endereco) => (
              <div
                key={endereco.id}
                className="bg-white p-6 rounded-xl shadow-sm border border-orange-200 hover:shadow-md transition"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold text-neutral-900">
                    {endereco.rua}
                  </h3>

                  <div className="flex gap-3">
                    <button
                      onClick={() => abrirModal(endereco)}
                      className="text-orange-500 cursor-pointer hover:text-orange-600 text-sm flex items-center gap-1"
                    >
                      <i className="fas fa-edit"></i> Editar
                    </button>

                    <button
                      onClick={() => excluirEndereco(endereco.id)}
                      className="text-red-500 cursor-pointer hover:text-red-600 text-sm flex items-center gap-1"
                    >
                      <i className="fas fa-trash"></i> Remover
                    </button>
                  </div>
                </div>

                <p className="text-neutral-500 text-sm">
                  {endereco.cidade} • {endereco.provincia}
                </p>

                <p className="text-neutral-500 text-sm">
                  {endereco.codigo_postal} • {endereco.pais}
                </p>
              </div>
            ))}
          </div>
        )}

        <Modal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          title={enderecoSelecionado ? "Editar Endereço" : "Novo Endereço"}
          icon="fas fa-map-marker-alt"
        >
          <form
            onSubmit={handleSubmit(salvarEndereco)}
            className="max-w-3xl mx-auto space-y-4"
          >
            {["rua", "cidade", "provincia", "codigo_postal", "pais"].map(
              (campo) => (
                <div key={campo} className="flex flex-col gap-1">
                  <input
                    type="text"
                    placeholder={
                      campo === "codigo_postal"
                        ? "Código Postal"
                        : campo.charAt(0).toUpperCase() + campo.slice(1)
                    }
                    {...register(campo)}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                      errors[campo] ? "border-red-500" : "border-neutral-300"
                    }`}
                    disabled={saving} // desabilita enquanto salva
                  />
                  {errors[campo] && (
                    <p className="text-red-500 text-sm">
                      {errors[campo].message}
                    </p>
                  )}
                </div>
              ),
            )}

            <div className="flex justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={() => setOpenModal(false)}
                className="px-6 py-3 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 rounded-lg cursor-pointer"
                disabled={saving}
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg cursor-pointer"
                disabled={saving} // desabilita enquanto salva
              >
                {saving
                  ? enderecoSelecionado
                    ? "Atualizando..."
                    : "Salvando..."
                  : "Salvar Endereço"}
              </button>
            </div>
          </form>
        </Modal>
      </ClienteLayout>
    </>
  );
}
