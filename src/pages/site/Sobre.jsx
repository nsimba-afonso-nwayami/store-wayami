export default function Sobre() {
  return (
    <>
      <title>Sobre | Nwayami Store</title>

      <section className="w-full bg-neutral-100 pt-47 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          {/* Título */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-800">
              Sobre a NWAYAMI STORE
            </h1>
            <p className="text-neutral-600 mt-4 max-w-2xl mx-auto">
              A sua loja de confiança para produtos de tecnologia,
              eletrodomésticos e soluções de energia.
            </p>
          </div>

          {/* Conteúdo principal */}
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Texto */}
            <div className="space-y-4 text-neutral-700 leading-relaxed">
              <p>
                A <strong>NWAYAMI STORE</strong> é uma loja dedicada a oferecer
                produtos de qualidade com preços competitivos, atendendo às
                necessidades do dia a dia dos nossos clientes.
              </p>

              <p>Trabalhamos com uma variedade de produtos nas áreas de:</p>

              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <i className="fa-solid fa-plug text-orange-500"></i>
                  Eletrodomésticos
                </li>
                <li className="flex items-center gap-2">
                  <i className="fa-solid fa-bolt text-orange-500"></i>
                  Energia
                </li>
                <li className="flex items-center gap-2">
                  <i className="fa-solid fa-tv text-orange-500"></i>
                  Imagem e Som
                </li>
                <li className="flex items-center gap-2">
                  <i className="fa-solid fa-print text-orange-500"></i>
                  Impressão
                </li>
                <li className="flex items-center gap-2">
                  <i className="fa-solid fa-laptop text-orange-500"></i>
                  Informática
                </li>
              </ul>

              <p>
                Nosso compromisso é oferecer atendimento de qualidade, produtos
                confiáveis e uma experiência de compra simples e segura.
              </p>
            </div>

            {/* Destaques */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-xl shadow text-center">
                <i className="fa-solid fa-truck-fast text-3xl text-orange-500 mb-3"></i>
                <h3 className="font-semibold text-neutral-800">
                  Entrega Rápida
                </h3>
              </div>

              <div className="bg-white p-6 rounded-xl shadow text-center">
                <i className="fa-solid fa-shield-halved text-3xl text-orange-500 mb-3"></i>
                <h3 className="font-semibold text-neutral-800">
                  Produtos Garantidos
                </h3>
              </div>

              <div className="bg-white p-6 rounded-xl shadow text-center">
                <i className="fa-solid fa-credit-card text-3xl text-orange-500 mb-3"></i>
                <h3 className="font-semibold text-neutral-800">
                  Pagamento Seguro
                </h3>
              </div>

              <div className="bg-white p-6 rounded-xl shadow text-center">
                <i className="fa-solid fa-headset text-3xl text-orange-500 mb-3"></i>
                <h3 className="font-semibold text-neutral-800">
                  Suporte ao Cliente
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
