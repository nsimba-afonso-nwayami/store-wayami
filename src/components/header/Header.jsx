import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useCart } from "../../contexts/CartContext";
import { listarProdutos } from "../../services/produtosService";
import { useAuth } from "../../contexts/AuthContext";

export default function Header() {
  const navigate = useNavigate();
  const { totalItems } = useCart();

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [resultados, setResultados] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  // ====== Carregar categorias ======
  useEffect(() => {
    async function carregarCategorias() {
      try {
        const data = await listarProdutos();
        const categoriasUnicas = Array.from(
          new Set(data.map((p) => p.categoria_nome)),
        );
        setCategorias(categoriasUnicas);
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
      }
    }
    carregarCategorias();
  }, []);

  const enableLoop = categorias.length > 5;

  // ====== Busca produtos com debounce ======
  useEffect(() => {
    if (!searchTerm.trim()) {
      setResultados([]);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setLoadingSearch(true);
      try {
        const data = await listarProdutos();
        const filtrados = data.filter((p) =>
          p.descricao.toLowerCase().includes(searchTerm.toLowerCase()),
        );
        setResultados(filtrados.slice(0, 5));
      } catch (error) {
        console.error("Erro na busca de produtos:", error);
        setResultados([]);
      } finally {
        setLoadingSearch(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const getSlug = (descricao) =>
    descricao.toLowerCase().replaceAll(" ", "-").replaceAll("/", "");

  return (
    <header className="fixed top-0 left-0 w-full bg-neutral-900 border-b border-neutral-800 shadow-lg z-50">
      {/* Topo principal */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between gap-4">
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden text-neutral-50 text-xl"
        >
          <i className="fas fa-bars"></i>
        </button>

        <Link
          to="/"
          className="text-xl md:text-2xl font-extrabold tracking-wide text-neutral-50"
        >
          NWAYAMI <span className="text-orange-500">STORE</span>
        </Link>

        {/* Input de pesquisa desktop */}
        <div className="hidden md:block flex-1 max-w-xl">
          <div className="relative z-50">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Pesquisar produtos..."
              className="w-full bg-neutral-800 text-neutral-50 placeholder-neutral-400 px-4 py-2 rounded-lg border border-neutral-700 focus:outline-none focus:border-orange-500"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-500">
              <i className="fas fa-search"></i>
            </button>

            {searchTerm && (
              <div className="absolute mt-2 w-full bg-neutral-900 border border-neutral-700 rounded-lg shadow-lg z-999">
                {loadingSearch ? (
                  <div className="px-4 py-2 text-neutral-400 text-sm flex items-center gap-2">
                    <i className="fas fa-spinner fa-spin"></i> Carregando
                    produtos...
                  </div>
                ) : resultados.length > 0 ? (
                  resultados.map((produto) => (
                    <Link
                      key={produto.id}
                      to={`/produtos/${getSlug(produto.descricao)}`}
                      className="block px-4 py-2 hover:bg-neutral-800 text-neutral-50 text-sm"
                      onClick={() => {
                        setSearchTerm("");
                        setResultados([]);
                        setSearchOpen(false);
                      }}
                    >
                      {produto.descricao}
                    </Link>
                  ))
                ) : (
                  <div className="px-4 py-2 text-neutral-400 text-sm">
                    Nenhum produto encontrado
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Ações */}
        <div className="flex items-center gap-4 text-neutral-50 text-xl">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="md:hidden hover:text-orange-500 transition-colors"
          >
            <i className="fas fa-search"></i>
          </button>

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              {/* Nome do usuário */}
              <Link
                to="/dashboard/cliente"
                className="hidden md:block text-sm font-semibold hover:text-orange-500 transition-colors"
              >
                Olá, {user?.username || user?.nome}
              </Link>

              {/* Ícone logout */}
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="cursor-pointer hover:text-orange-500 transition-colors"
                title="Terminar sessão"
              >
                <i className="fas fa-sign-out-alt"></i>
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="hover:text-orange-500 transition-colors"
            >
              <i className="fas fa-user"></i>
            </Link>
          )}

          <Link
            to="/carrinho"
            className="relative hover:text-orange-500 transition-colors"
          >
            <i className="fas fa-shopping-cart"></i>
            <span className="absolute -top-2 -right-2 bg-orange-500 text-neutral-50 text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {totalItems}
            </span>
          </Link>
        </div>
      </div>

      {/* Input pesquisa mobile */}
      <div
        className={`md:hidden transition-all duration-300 ${searchOpen ? "max-h-96 opacity-100 pb-4" : "max-h-0 opacity-0"}`}
      >
        <div className="px-4 relative z-50">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Pesquisar produtos..."
            className="w-full bg-neutral-800 text-neutral-50 placeholder-neutral-400 px-4 py-3 rounded-lg border border-neutral-700 focus:outline-none focus:border-orange-500"
          />

          {searchTerm && (
            <div className="absolute mt-2 w-full bg-neutral-900 border border-neutral-700 rounded-lg shadow-lg z-999">
              {loadingSearch ? (
                <div className="px-4 py-2 text-neutral-400 text-sm flex items-center gap-2">
                  <i className="fas fa-spinner fa-spin"></i> Carregando
                  produtos...
                </div>
              ) : resultados.length > 0 ? (
                resultados.map((produto) => (
                  <Link
                    key={produto.id}
                    to={`/produtos/${getSlug(produto.descricao)}`}
                    className="block px-4 py-2 hover:bg-neutral-800 text-neutral-50 text-sm"
                    onClick={() => {
                      setSearchTerm("");
                      setResultados([]);
                      setSearchOpen(false);
                    }}
                  >
                    {produto.descricao}
                  </Link>
                ))
              ) : (
                <div className="px-4 py-2 text-neutral-400 text-sm">
                  Nenhum produto encontrado
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Slider categorias */}
      <div className="bg-neutral-800 border-t border-neutral-700">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={12}
            slidesPerView={"auto"}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            loop={enableLoop}
          >
            {categorias.map((cat, index) => (
              <SwiperSlide key={index} style={{ width: "auto" }}>
                <Link
                  to={`/categoria/${cat.toLowerCase().replaceAll(" ", "-")}`}
                  className="whitespace-nowrap px-4 py-2 bg-neutral-900 text-neutral-50 rounded-lg border border-neutral-700 hover:border-orange-500 hover:text-orange-500 transition-colors text-sm font-semibold"
                >
                  {cat}
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Menu (único, adaptativo) */}
      <nav>
        {/* Desktop */}
        <div className="hidden md:flex bg-neutral-900 border-t border-neutral-800">
          <div className="max-w-7xl mx-auto px-6 py-3 flex flex-row items-center gap-6">
            <Link
              to="/"
              className="uppercase text-neutral-50 hover:text-orange-500 transition-colors text-sm font-semibold"
            >
              Home
            </Link>
            <Link
              to="/produtos"
              className="uppercase text-neutral-50 hover:text-orange-500 transition-colors text-sm font-semibold"
            >
              Produtos
            </Link>
            <Link
              to="/sobre"
              className="uppercase text-neutral-50 hover:text-orange-500 transition-colors text-sm font-semibold"
            >
              Sobre
            </Link>
            <Link
              to="/contato"
              className="uppercase text-neutral-50 hover:text-orange-500 transition-colors text-sm font-semibold"
            >
              Contato
            </Link>
          </div>
        </div>

        {/* Mobile (lateral deslizante) */}
        <div
          onClick={() => setMenuOpen(false)}
          className={`fixed inset-0 bg-black/50 z-40 transition-opacity md:hidden ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        />

        <aside
          className={`fixed top-0 left-0 h-full w-72 bg-neutral-900 z-50 transform transition-transform duration-300 md:hidden ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="p-6 border-b border-neutral-800 flex justify-between items-center">
            <span className="text-xl font-bold text-neutral-50">Menu</span>
            <button
              onClick={() => setMenuOpen(false)}
              className="text-neutral-50 text-xl"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>

          <nav className="flex flex-col p-6 gap-6">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="text-neutral-50 hover:text-orange-500 font-semibold"
            >
              Home
            </Link>
            <Link
              to="/produtos"
              onClick={() => setMenuOpen(false)}
              className="text-neutral-50 hover:text-orange-500 font-semibold"
            >
              Produtos
            </Link>
            <Link
              to="/sobre"
              onClick={() => setMenuOpen(false)}
              className="text-neutral-50 hover:text-orange-500 font-semibold"
            >
              Sobre
            </Link>
            <Link
              to="/contato"
              onClick={() => setMenuOpen(false)}
              className="text-neutral-50 hover:text-orange-500 font-semibold"
            >
              Contato
            </Link>
          </nav>
        </aside>
      </nav>
    </header>
  );
}
