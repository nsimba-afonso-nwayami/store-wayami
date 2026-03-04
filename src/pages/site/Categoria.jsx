import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { listarProdutos } from "../../services/produtosService";
import { useCart } from "../../contexts/CartContext";

export default function Categoria() {
  const { nome } = useParams();

  const { addToCart } = useCart();

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

  // Converter slug para nome original
  const categoriaFormatada = nome.replaceAll("-", " ").toLowerCase();

  // Filtra produtos por categoria
  const produtosPorCategoria = produtos.filter(
    (p) =>
      p.categoria_nome && p.categoria_nome.toLowerCase() === categoriaFormatada,
  );

  // Filtra produtos por pesquisa
  const produtosFiltrados = produtosPorCategoria.filter((p) =>
    p.descricao.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    document.title = `${categoriaFormatada} | Nwayami Store`;
  }, [categoriaFormatada]);

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
          Categoria: {categoriaFormatada}
        </h1>

        <div className="mb-6">
          <input
            type="text"
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
              Não existem produtos nesta categoria ou correspondentes à
              pesquisa.
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

                <div className="mt-auto flex flex-col gap-2">
                  <button
                    disabled={produto.stock !== "Disponível"}
                    onClick={() =>
                      addToCart({
                        id: produto.id,
                        descricao: produto.descricao,
                        codigo: produto.codigo,
                        preco_com_iva: Number(produto.preco_com_iva),
                        imagem: produto.imagem,
                      })
                    }
                    className={`py-2 rounded-lg text-sm font-semibold transition cursor-pointer ${
                      produto.stock === "Disponível"
                        ? "bg-neutral-900 text-white hover:bg-neutral-800"
                        : "bg-neutral-400 text-white cursor-not-allowed"
                    }`}
                  >
                    {produto.stock === "Disponível"
                      ? "Adicionar ao carrinho"
                      : "Indisponível"}
                  </button>

                  <Link
                    to={`/produtos/${produto.descricao
                      .toLowerCase()
                      .replaceAll(" ", "-")
                      .replaceAll("/", "")}`}
                    className="block text-center border border-orange-500 text-orange-500 py-2 rounded-lg text-sm font-semibold hover:bg-orange-500 hover:text-white transition"
                  >
                    Ver produto
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
