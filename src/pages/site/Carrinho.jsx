import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";

export default function Carrinho() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    totalPrice,
  } = useCart();

  const formatImageUrl = (url) => {
    if (!url) return "";
    return url.replace("/media/", "/api/media/");
  };

  return (
    <>
      <title>Carrinho | Nwayami Store</title>

      <section className="w-full bg-neutral-100 py-16 pt-47">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-2xl md:text-3xl font-bold text-neutral-800">
              Carrinho de Compras
            </h1>

            {cartItems.length > 0 && (
              <button
                onClick={() => {
                  if (
                    window.confirm("Tem certeza que deseja limpar o carrinho?")
                  ) {
                    clearCart();
                  }
                }}
                className="flex items-center gap-2 cursor-pointer px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition"
              >
                <i className="fa-solid fa-broom"></i>
                Limpar Carrinho
              </button>
            )}
          </div>

          {cartItems.length === 0 ? (
            <div className="bg-white rounded-xl shadow p-10 text-center">
              <p className="text-neutral-600 mb-6">Seu carrinho está vazio.</p>

              <Link
                to="/produtos"
                className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition"
              >
                <i className="fa-solid fa-arrow-left"></i>
                Ir para produtos
              </Link>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1 flex flex-col gap-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl shadow p-4 flex flex-col sm:flex-row gap-4 items-center"
                  >
                    <img
                      src={formatImageUrl(item.imagem)}
                      alt={item.descricao}
                      className="w-24 h-24 object-cover rounded-lg"
                    />

                    <div className="flex-1 text-center sm:text-left">
                      <h2 className="font-semibold text-neutral-800">
                        {item.descricao}
                      </h2>

                      <p className="text-orange-500 font-bold mt-1">
                        {Number(item.preco_com_iva).toLocaleString("pt-AO")} Kz
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        disabled={item.quantidade === 1}
                        className={`w-9 h-9 flex items-center justify-center rounded transition ${
                          item.quantidade === 1
                            ? "bg-neutral-100 cursor-not-allowed opacity-50"
                            : "bg-neutral-200 hover:bg-neutral-300"
                        }`}
                      >
                        <i className="fa-solid fa-minus text-sm"></i>
                      </button>

                      <span className="font-semibold min-w-5 text-center">
                        {item.quantidade}
                      </span>

                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="w-9 h-9 flex items-center justify-center bg-neutral-200 rounded hover:bg-neutral-300 transition"
                      >
                        <i className="fa-solid fa-plus text-sm"></i>
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-600 cursor-pointer text-lg flex items-center justify-center w-10 h-10 rounded-lg hover:bg-red-50 transition"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                ))}

                <div className="mt-4">
                  <Link
                    to="/produtos"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-neutral-400 text-neutral-700 rounded-lg font-semibold hover:bg-neutral-200 transition"
                  >
                    <i className="fa-solid fa-arrow-left"></i>
                    Continuar a comprar
                  </Link>
                </div>
              </div>

              <aside className="w-full lg:w-80">
                <div className="bg-white rounded-xl shadow p-6">
                  <h2 className="text-lg font-bold text-neutral-800 mb-4">
                    Resumo do Pedido
                  </h2>

                  <div className="flex justify-between text-sm text-neutral-600 mb-2">
                    <span>Subtotal</span>
                    <span>{totalPrice.toLocaleString("pt-AO")} Kz</span>
                  </div>

                  <div className="flex justify-between text-sm text-neutral-600 mb-4">
                    <span>Entrega</span>
                    <span>Grátis</span>
                  </div>

                  <div className="flex justify-between text-lg font-bold text-neutral-800 mb-6">
                    <span>Total</span>
                    <span className="text-orange-500">
                      {totalPrice.toLocaleString("pt-AO")} Kz
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      if (isAuthenticated) {
                        navigate("/checkout");
                      } else {
                        navigate("/login", {
                          state: { from: { pathname: "/checkout" } },
                        });
                      }
                    }}
                    className="w-full cursor-pointer bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
                  >
                    Finalizar Compra
                  </button>
                </div>
              </aside>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
