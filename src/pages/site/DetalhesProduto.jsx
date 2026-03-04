import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { buscarProdutoPorSlug } from "../../services/produtosService";
import { useCart } from "../../contexts/CartContext";

export default function DetalhesProduto() {
  const { slug } = useParams();

  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();

  const formatImageUrl = (url) => {
    if (!url) return "";
    return url.replace("/media/", "/api/media/");
  };

  useEffect(() => {
    async function carregarProduto() {
      try {
        const data = await buscarProdutoPorSlug(slug);
        setProduto(data);
      } catch (error) {
        console.error("Erro ao buscar produto:", error);
        setProduto(null);
      } finally {
        setLoading(false);
      }
    }

    carregarProduto();
  }, [slug]);

  useEffect(() => {
    if (produto) {
      document.title = `${produto.descricao} | Nwayami Store`;
    } else {
      document.title = "Produto não encontrado | Nwayami Store";
    }
  }, [produto]);

  if (loading) {
    return (
      <section className="w-full bg-neutral-100 py-16 pt-47 text-center">
        <i className="fas fa-spinner fa-spin text-3xl text-orange-500 mb-3"></i>
        <p className="text-neutral-600">Carregando produto...</p>
      </section>
    );
  }

  return (
    <section className="w-full bg-neutral-100 py-16 pt-47">
      <div className="max-w-7xl mx-auto px-4">
        {!produto ? (
          <div className="max-w-md mx-auto bg-white rounded-xl shadow p-8 text-center">
            <h2 className="text-xl font-bold text-neutral-800 mb-2">
              Produto não encontrado
            </h2>
            <p className="text-neutral-600 text-sm">
              O produto que você procura não existe ou foi removido.
            </p>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="lg:w-1/2">
              <img
                src={formatImageUrl(produto.imagem)}
                alt={produto.descricao}
                className="w-full rounded-xl shadow-lg"
              />
            </div>

            <div className="lg:w-1/2 flex flex-col">
              <h1 className="text-3xl font-bold text-neutral-800 mb-4">
                {produto.descricao}
              </h1>

              <p className="text-sm text-neutral-500 mb-2">
                Código: {produto.codigo}
              </p>

              <p className="text-2xl text-orange-500 font-bold mb-4">
                {Number(produto.preco_com_iva).toLocaleString("pt-AO")} Kz
              </p>

              <span
                className={`text-xs font-semibold px-2 py-1 rounded w-fit mb-6 ${
                  produto.stock === "Disponível"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {produto.stock}
              </span>

              <button
                onClick={() =>
                  addToCart({
                    id: produto.id,
                    descricao: produto.descricao,
                    codigo: produto.codigo,
                    preco_com_iva: Number(produto.preco_com_iva),
                    imagem: produto.imagem,
                  })
                }
                className="bg-orange-500 cursor-pointer text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition mb-6"
              >
                Adicionar ao carrinho
              </button>

              <div className="bg-white p-4 rounded-xl shadow">
                <h2 className="text-lg font-bold text-neutral-800 mb-2">
                  Descrição do Produto
                </h2>
                <p className="text-neutral-700 text-sm">
                  {produto.descricao_detalhada || "Sem descrição disponível."}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
