import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { listarProdutos } from "../../services/produtosService";
import "swiper/css";

// SUAS IMAGENS
import EletrodomesticosImg from "../../assets/img/eletrodomesticos.png";
import EnergiaImg from "../../assets/img/energia.png";
import EscritorioeEscolaImg from "../../assets/img/escritorio-e-escola.png";
import ImagemeSomImg from "../../assets/img/imagem-e-som.png";
import ImpressorasImg from "../../assets/img/impressoras.png";
import InformaticaImg from "../../assets/img/informatica.png";
import RedeseInternetImg from "../../assets/img/redes-e-internet.png";
import SegurancaEletronicaImg from "../../assets/img/seguranca-eletronica.png";
import SmartphonesImg from "../../assets/img/smartphones.png";
import SoftwareImg from "../../assets/img/software.png";

export default function Categorias() {
  const [categorias, setCategorias] = useState([]);

  // Mapeamento nome -> imagem
  const imagensCategorias = {
    Electrodomésticos: EletrodomesticosImg,
    Energia: EnergiaImg,
    "Material de Escritório e Escolar": EscritorioeEscolaImg,
    "Imagem e Som": ImagemeSomImg,
    "Impressão": ImpressorasImg,
    Informática: InformaticaImg,
    "Redes, Internet e Telecomunicações": RedeseInternetImg,
    "Segurança Electrónica": SegurancaEletronicaImg,
    "Smartphones, Tablets e Telemóveis": SmartphonesImg,
    Software: SoftwareImg,
  };

  useEffect(() => {
    async function carregarCategorias() {
      try {
        const data = await listarProdutos();

        const categoriasUnicas = [
          ...new Set(data.map((p) => p.categoria_nome)),
        ];

        //Filtrar apenas categorias que têm imagem definida
        const categoriasComImagem = categoriasUnicas.filter((categoria) => {
          if (!imagensCategorias[categoria]) {
            //console.warn("Categoria sem imagem:", categoria);
            return false;
          }
          return true;
        });

        setCategorias(categoriasComImagem);
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
      }
    }

    carregarCategorias();
  }, []);

  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-8">
          Categorias
        </h2>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={2}
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 5 },
            1024: { slidesPerView: 6 },
            1280: { slidesPerView: 8 },
          }}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
        >
          {categorias.map((categoria, index) => {
            const slug = categoria.toLowerCase().replaceAll(" ", "-");

            return (
              <SwiperSlide key={index}>
                <Link
                  to={`/categoria/${slug}`}
                  className="flex flex-col items-center justify-center bg-neutral-100 rounded-xl p-6 hover:shadow-lg transition"
                >
                  <img
                    src={imagensCategorias[categoria]}
                    alt={categoria}
                    className="w-16 h-16 object-contain mb-3"
                  />

                  <span className="text-sm font-semibold text-neutral-800 text-center">
                    {categoria}
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
