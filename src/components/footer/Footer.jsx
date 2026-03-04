import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-50 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo e descrição */}
        <div className="md:col-span-1">
          <h3 className="text-3xl font-bold text-orange-500 mb-4">
            NWAYAMI STORE
          </h3>
          <p className="text-neutral-400 leading-relaxed">
            Centralidade do Kilamba, Quarteirão F, edifício F27, apartamento 91,
            Kilamba, Luanda - Angola
          </p>
          <p className="text-neutral-400 mt-2">
            <a
              href="mailto:geral@nwayami.com"
              className="hover:text-orange-500 transition"
            >
              geral@nwayami.com
            </a>
          </p>
          <p className="text-neutral-400">(+244) 972 614 886 / 921 909 103</p>
        </div>

        {/* Informações */}
        <div>
          <h4 className="text-xl font-semibold text-orange-500 mb-4">
            INFORMAÇÕES
          </h4>
          <ul className="space-y-2 text-neutral-400">
            <li>
              <Link
                to="/politica-privacidade"
                className="hover:text-orange-500 transition"
              >
                Politicas e Privacidade
              </Link>
            </li>
            <li>
              <Link
                to="https://nwayami.vercel.app"
                className="hover:text-orange-500 transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                Prestação de Serviços
              </Link>
            </li>
            <li>
              <Link to="/contato" className="hover:text-orange-500 transition">
                Contactos
              </Link>
            </li>
          </ul>
        </div>

        {/* Categorias com links */}
        <div>
          <h4 className="text-xl font-semibold text-orange-500 mb-4">
            CATEGORIAS
          </h4>
          <ul className="space-y-2 text-neutral-400">
            <li>
              <Link
                to="/categoria/informatica-impressao"
                className="hover:text-orange-500 transition"
              >
                Informática | Impressão
              </Link>
            </li>
            <li>
              <Link
                to="/categoria/redes-internet-telecom"
                className="hover:text-orange-500 transition"
              >
                Redes, Internet e Telecomunicações
              </Link>
            </li>
            <li>
              <Link
                to="/categoria/energia-seguranca"
                className="hover:text-orange-500 transition"
              >
                Energia | Segurança Electrónica
              </Link>
            </li>
            <li>
              <Link
                to="/categoria/smartphones-tablets"
                className="hover:text-orange-500 transition"
              >
                Smartphones, Tablets e Telemóveis
              </Link>
            </li>
            <li>
              <Link
                to="/categoria/imagem-som"
                className="hover:text-orange-500 transition"
              >
                Imagem e Som
              </Link>
            </li>
            <li>
              <Link
                to="/categoria/electrodomesticos-software"
                className="hover:text-orange-500 transition"
              >
                Electrodomésticos | Software
              </Link>
            </li>
            <li>
              <Link
                to="/categoria/material-escritorio-escolar"
                className="hover:text-orange-500 transition"
              >
                Material de Escritório e Escolar
              </Link>
            </li>
          </ul>
        </div>

        {/* Contatos */}
        <div>
          <h4 className="text-xl font-semibold text-orange-500 mb-4">
            CONTACTOS
          </h4>
          <p className="text-neutral-400">
            <strong>Comerciais:</strong> (+244) 921 793 774
            <br />
            <a
              href="mailto:geral@nwayami.com"
              className="hover:text-orange-500 transition"
            >
              geral@nwayami.com
            </a>
          </p>
          <p className="text-neutral-400 mt-3">
            <strong>Assistência Técnica:</strong> (+244) 921 791 707 / 921 902
            078
            <br />
            <a
              href="mailto:suporte@nwayami.com"
              className="hover:text-orange-500 transition"
            >
              suporte@nwayami.com
            </a>
          </p>
          <p className="text-neutral-400 mt-3">
            <strong>Horário de Atendimento:</strong>
            <br />
            Segunda - Sexta, 08:00h - 17:00h
          </p>
        </div>
      </div>

      {/* Divisor */}
      <div className="border-t border-neutral-800"></div>

      {/* Créditos */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-6 flex flex-col md:flex-row justify-between items-center text-neutral-400 text-sm">
        <p>
          &copy; {new Date().getFullYear()} NWAYAMI STORE. Todos os direitos
          reservados.
        </p>
        <Link
          to="/contato"
          className="mt-4 md:mt-0 inline-block bg-orange-500 text-neutral-50 px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 transition"
        >
          Contato
        </Link>
      </div>
    </footer>
  );
}
