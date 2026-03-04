import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      toast.error("Erro ao carregar carrinho");
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    } catch (error) {
      toast.error("Erro ao salvar carrinho");
    }
  }, [cartItems]);

  function addToCart(produto) {
    try {
      if (!produto || !produto.id) {
        toast.error("Produto inválido");
        return;
      }

      const exists = cartItems.find((item) => item.id === produto.id);

      if (exists) {
        setCartItems((prev) =>
          prev.map((item) =>
            item.id === produto.id
              ? { ...item, quantidade: item.quantidade + 1 }
              : item,
          ),
        );

        toast.success("Quantidade atualizada");
      } else {
        setCartItems((prev) => [...prev, { ...produto, quantidade: 1 }]);
        toast.success("Produto adicionado");
      }
    } catch (error) {
      toast.error("Erro ao adicionar produto");
    }
  }

  function removeFromCart(id) {
    try {
      const exists = cartItems.find((item) => item.id === id);

      if (!exists) {
        toast.error("Produto não encontrado");
        return;
      }

      setCartItems((prev) => prev.filter((item) => item.id !== id));
      toast.success("Produto removido");
    } catch (error) {
      toast.error("Erro ao remover produto");
    }
  }

  function increaseQuantity(id) {
    try {
      const exists = cartItems.find((item) => item.id === id);

      if (!exists) {
        toast.error("Produto não encontrado");
        return;
      }

      setCartItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantidade: item.quantidade + 1 } : item,
        ),
      );
    } catch (error) {
      toast.error("Erro ao aumentar quantidade");
    }
  }

  function decreaseQuantity(id) {
    try {
      const item = cartItems.find((i) => i.id === id);

      if (!item) {
        toast.error("Produto não encontrado");
        return;
      }

      if (item.quantidade <= 1) {
        toast.error("Quantidade mínima é 1");
        return;
      }

      setCartItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantidade: item.quantidade - 1 } : item,
        ),
      );
    } catch (error) {
      toast.error("Erro ao diminuir quantidade");
    }
  }

  // NOVA FUNÇÃO
  function clearCart() {
    if (cartItems.length === 0) {
      toast.error("O carrinho já está vazio");
      return;
    }

    setCartItems([]);
    toast.success("Carrinho limpo com sucesso");
  }

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantidade, 0);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.preco_com_iva * item.quantidade,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
