import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { listarProdutos } from "../../services/produtosService";

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [visibleCount, setVisibleCount] = useState(16);
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const formatImageUrl = (url) =>
    url ? url.replace("/media/", "/api/media/") : "";

  function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  // Carregar produtos da API
  useEffect(() => {
    async function carregarProdutos() {
      try {
        const data = await listarProdutos();
        const produtosAleatorios = shuffleArray(data);
        setProdutos(produtosAleatorios);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      } finally {
        setLoading(false);
      }
    }
    carregarProdutos();
  }, []);

  // Listas únicas para filtros
  const categorias = Array.from(new Set(produtos.map((p) => p.categoria_nome)));
  const subcategorias = selectedCategory
    ? Array.from(
        new Set(
          produtos
            .filter((p) => p.categoria_nome === selectedCategory)
            .map((p) => p.subcategoria_nome),
        ),
      )
    : [];

  // Filtragem dos produtos
  const produtosFiltrados = produtos
    .filter((p) => !selectedCategory || p.categoria_nome === selectedCategory)
    .filter(
      (p) =>
        !selectedSubcategory || p.subcategoria_nome === selectedSubcategory,
    )
    .filter(
      (p) =>
        p.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.codigo.toLowerCase().includes(searchTerm.toLowerCase()),
    );

  return (
    <section className="w-full bg-neutral-100 pt-47 pb-16">
      <div className="max-w-7xl mx-auto px-4 flex flex-col gap-6">
        {/* Controles de pesquisa e filtros */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center mb-6">
          {/* Input de pesquisa */}
          <input
            type="text"
            placeholder="Buscar produtos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/3 px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          {/* Select de categorias */}
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setSelectedSubcategory("");
            }}
            className="w-full md:w-1/4 px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Todas as categorias</option>
            {categorias.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Select de subcategorias */}
          {subcategorias.length > 0 && (
            <select
              value={selectedSubcategory}
              onChange={(e) => setSelectedSubcategory(e.target.value)}
              className="w-full md:w-1/4 px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Todas as subcategorias</option>
              {subcategorias.map((sub, idx) => (
                <option key={idx} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Conteúdo de produtos */}
        {loading ? (
          <div className="flex flex-col justify-center items-center h-64 gap-4">
            <i className="fas fa-spinner fa-spin text-3xl text-orange-500"></i>
            <p className="text-neutral-600">Carregando produtos...</p>
          </div>
        ) : produtosFiltrados.length === 0 ? (
          <div className="max-w-md mx-auto bg-white rounded-xl shadow p-8 text-center">
            <i className="fas fa-box-open text-4xl text-orange-500 mb-4"></i>
            <h2 className="text-xl font-bold text-neutral-800 mb-2">
              Nenhum produto encontrado
            </h2>
            <p className="text-neutral-600 text-sm">
              Não existem produtos correspondentes aos filtros.
            </p>
          </div>
        ) : (
          <>
            <p className="text-neutral-600 mb-2">
              Mostrando {Math.min(visibleCount, produtosFiltrados.length)} de{" "}
              {produtosFiltrados.length} produtos
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {produtosFiltrados.slice(0, visibleCount).map((produto) => (
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

                  <h3 className="text-sm font-semibold text-neutral-800 mb-1 line-clamp-2">
                    {produto.descricao}
                  </h3>

                  <p className="text-xs text-neutral-500 mb-2">
                    Código: {produto.codigo}
                  </p>

                  <p className="text-orange-500 text-lg font-bold mb-2">
                    {Number(produto.preco_com_iva).toLocaleString("pt-AO")} Kz
                  </p>

                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded mb-4 w-fit ${
                      produto.stock === "Disponível"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
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

            {visibleCount < produtosFiltrados.length && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 8)}
                  className="px-6 py-3 cursor-pointer bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition"
                >
                  Ver Mais
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
