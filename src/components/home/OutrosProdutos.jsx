import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { listarProdutos } from "../../services/produtosService";

import "swiper/css";

export default function OutrosProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  // mesma função usada no destaque
  const formatImageUrl = (url) => {
    if (!url) return "";
    return url.replace("/media/", "/api/media/");
  };

  useEffect(() => {
    async function carregarProdutos() {
      try {
        const data = await listarProdutos();

        // aqui você pode decidir a regra:
        // exemplo: pegar do 8 ao 16 para não repetir os destaques
        setProdutos(data.slice(8, 16));
      } catch (error) {
        console.error("Erro ao carregar outros produtos:", error);
      } finally {
        setLoading(false);
      }
    }

    carregarProdutos();
  }, []);

  if (loading) {
    return (
      <section className="w-full py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-neutral-600">Carregando produtos...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-16 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-800">
            Outros Produtos
          </h2>

          <Link
            to="/produtos"
            className="text-orange-500 font-semibold hover:text-orange-600 transition"
          >
            Ver mais
          </Link>
        </div>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          grabCursor={true}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            0: { slidesPerView: 1.2 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {produtos.map((produto) => (
            <SwiperSlide key={produto.id}>
              <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col h-full">
                <div className="w-full overflow-hidden rounded-lg mb-4">
                  <img
                    src={formatImageUrl(produto.imagem)}
                    alt={produto.descricao}
                    className="w-full h-40 object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>

                <h3 className="text-sm font-semibold text-neutral-800 mb-2 line-clamp-2">
                  {produto.descricao}
                </h3>

                <p className="text-orange-500 text-lg font-bold mb-4">
                  {Number(produto.preco_com_iva).toLocaleString("pt-AO")} Kz
                </p>

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
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
