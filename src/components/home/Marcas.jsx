import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { listarProdutos } from "../../services/produtosService";
import "swiper/css";

// IMAGENS DAS MARCAS
import DellImg from "../../assets/img/dell.png";
import HpImg from "../../assets/img/hp.png";
import KingstonImg from "../../assets/img/kingston.png";
import LenovoImg from "../../assets/img/lenovo.png";
import LogiTechImg from "../../assets/img/logitech.png";
import MicrosoftImg from "../../assets/img/microsoft.png";
import SamsungImg from "../../assets/img/samsung.png";
import ToshibaImg from "../../assets/img/toshiba.png";
import WestwernDigitalImg from "../../assets/img/westwern-digital.png";
import XiaomiImg from "../../assets/img/xiaomi.png";

export default function Marcas() {
  const [marcas, setMarcas] = useState([]);

  // Mapeamento nome -> imagem
  const imagensMarcas = {
    DELL: DellImg,
    HP: HpImg,
    KINGSTON: KingstonImg,
    LENOVO: LenovoImg,
    LOGITECH: LogiTechImg,
    MICROSOFT : MicrosoftImg,
    SAMSUNG: SamsungImg,
    TOSHIBA: ToshibaImg,
    "WESTERN DIGITAL": WestwernDigitalImg,
    XIAOMI: XiaomiImg,
  };

  useEffect(() => {
    async function carregarMarcas() {
      try {
        const produtos = await listarProdutos();

        // Extrair marcas únicas
        const marcasUnicas = [...new Set(produtos.map((p) => p.marca))];

        // Filtrar apenas marcas que possuem imagem, com aviso das que não têm
        const marcasComImagem = marcasUnicas.filter((marca) => {
          if (!imagensMarcas[marca]) {
            //console.warn("Marca sem imagem:", marca);
            return false;
          }
          return true;
        });

        setMarcas(marcasComImagem);
      } catch (error) {
        console.error("Erro ao carregar marcas:", error);
      }
    }

    carregarMarcas();
  }, []);

  return (
    <section className="w-full py-16 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-8">
          Marcas Mais Pesquisadas
        </h2>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={3}
          breakpoints={{
            640: { slidesPerView: 4 },
            768: { slidesPerView: 5 },
            1024: { slidesPerView: 6 },
            1280: { slidesPerView: 6 },
          }}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
        >
          {marcas.map((marca, index) => {
            const slug = marca.toLowerCase().replaceAll(" ", "-");

            return (
              <SwiperSlide key={index}>
                <Link
                  to={`/marca/${slug}`}
                  className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow hover:shadow-lg transition"
                >
                  <img
                    src={imagensMarcas[marca]}
                    alt={marca}
                    className="w-16 h-16 object-contain mb-3"
                  />
                  <span className="text-sm font-semibold text-neutral-800 text-center">
                    {marca}
                  </span>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
