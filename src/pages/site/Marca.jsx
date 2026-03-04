import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { listarProdutos } from "../../services/produtosService";

export default function Marca() {
  const { nome } = useParams();

  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function carregar() {
      try {
        const data = await listarProdutos();
        setProdutos(data);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      } finally {
        setLoading(false);
      }
    }

    carregar();
  }, []);

  const formatImageUrl = (url) =>
    url ? url.replace("/media/", "/api/media/") : "";

  // Converter slug para nome original da marca
  const marcaFormatada = nome.replaceAll("-", " ").toUpperCase();

  // Filtra produtos pela marca
  const produtosPorMarca = produtos.filter(
    (p) => p.marca && p.marca.toUpperCase() === marcaFormatada,
  );

  // Filtra produtos por pesquisa
  const produtosFiltrados = produtosPorMarca.filter((p) =>
    p.descricao.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    document.title = `${marcaFormatada} | Nwayami Store`;
  }, [marcaFormatada]);

  if (loading) {
    return (
      <section className="w-full bg-neutral-100 py-16 pt-47 text-center">
        <i className="fas fa-spinner fa-spin text-3xl text-orange-500 mb-3"></i>
        <p className="text-neutral-600">Carregando produtos...</p>
      </section>
    );
  }

  return (
    <section className="w-full bg-neutral-100 py-16 pt-47">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-4 capitalize">
          Marca: {marcaFormatada}
        </h1>

        <div className="mb-6">
          <input
            type="search"
            placeholder="Pesquisar produtos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/3 px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {produtosFiltrados.length === 0 ? (
          <div className="max-w-md mx-auto bg-white rounded-xl shadow p-8 text-center">
            <i className="fas fa-box-open text-4xl text-orange-500 mb-4"></i>
            <h2 className="text-xl font-bold text-neutral-800 mb-2">
              Nenhum produto encontrado
            </h2>
            <p className="text-neutral-600 text-sm">
              Não existem produtos desta marca ou correspondentes à pesquisa.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {produtosFiltrados.map((produto) => (
              <div
                key={produto.id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col"
              >
                <div className="w-full overflow-hidden rounded-lg mb-4">
                  <img
                    src={formatImageUrl(produto.imagem)}
                    alt={produto.descricao}
                    className="w-full h-40 object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>

                <h3 className="text-sm font-semibold text-neutral-800 mb-1">
                  {produto.descricao}
                </h3>

                <p className="text-xs text-neutral-500 mb-2">
                  Código: {produto.codigo}
                </p>

                <p className="text-orange-500 text-lg font-bold mb-2">
                  {Number(produto.preco_com_iva).toLocaleString("pt-AO")} Kz
                </p>

                <span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-1 rounded mb-4 w-fit">
                  {produto.stock}
                </span>

                <Link
                  to={`/produtos/${produto.descricao
                    .toLowerCase()
                    .replaceAll(" ", "-")
                    .replaceAll("/", "")}`}
                  className="mt-auto block text-center bg-orange-500 text-white py-2 rounded-lg text-sm font-semibold hover:bg-orange-600 transition"
                >
                  Ver produto
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
