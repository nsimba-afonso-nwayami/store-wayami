import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import HeroImg1 from "../../assets/img/hero1.png";
import HeroImg2 from "../../assets/img/hero2.png";
import HeroImg3 from "../../assets/img/hero3.png";
import HeroImg4 from "../../assets/img/hero4.png";

export default function Hero() {
  return (
    <section className="relative w-full-screen h-full-scree pt-[160px}">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        grabCursor={true}
        loop
        className="h-full relative"
      >
        {/* Slide 1 — Eletrodomésticos */}
        <SwiperSlide>
          <div className="relative w-full h-full">
            <img
              src={HeroImg1}
              alt="Eletrodomésticos"
              className="w-full h-full object-cover"
            />
          </div>
        </SwiperSlide>

        {/* Slide 2 — Energia */}
        <SwiperSlide>
          <div className="relative w-full h-full">
            <img
              src={HeroImg2}
              alt="Energia"
              className="w-full h-full object-cover"
            />
          </div>
        </SwiperSlide>

        {/* Slide 3 — Imagem & Som */}
        <SwiperSlide>
          <div className="relative w-full h-full">
            <img
              src={HeroImg3}
              alt="Imagem e Som"
              className="w-full h-full object-cover"
            />
          </div>
        </SwiperSlide>

        {/* Slide 4 — Impressão */}
        <SwiperSlide>
          <div className="relative w-full h-full">
            <img
              src={HeroImg4}
              alt="Impressão"
              className="w-full h-full object-cover"
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
}
