import { useState, useEffect, useMemo } from "react";

import { db } from "../data/db";

const useCart = () => {
  const initialCart = () => {
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };
  const [data, setData] = useState([]);
  const [cart, setCart] = useState(initialCart);

  const MAX_ITEM = 5;
  const MIN_ITEM = 1;

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  //Este es para agregar cosas puede ser en un carrito o para algo mas en el futuro
  function addToCart(item) {
    const itemsExists = cart.findIndex((guitar) => guitar.id === item.id);
    if (itemsExists >= 0) {
      if (cart[itemsExists].quantity >= MAX_ITEM) return;
      //Existe en el carrito
      const updatedCart = [...cart];
      updatedCart[itemsExists].quantity++;
      setCart(updatedCart);
    } else {
      item.quantity = 1;
      setCart([...cart, item]);
    }
  }

  function removeFromCart(id) {
    setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));
  }
  function clearCart() {
    setCart([]);
  }

  function increaseQuantity(id) {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity < MAX_ITEM) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    setCart(updatedCart);
  }

  function decresQuantity(id) {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity > 1) {
        return {
          ...item,
          quantity: item.quantity - MIN_ITEM,
        };
      }
      return item;
    });
    setCart(updatedCart);
  }

  useEffect(() => {
    setData(db);
  }, []);

  //State derivado
  const isEmpty = useMemo(() => cart.length === 0, [cart]);
  const cartTotal = useMemo(
    () => cart.reduce((total, item) => total + item.quantity * item.price, 0),
    [cart]
  );

  return {
    data,
    cart,
    addToCart,
    removeFromCart,
    decresQuantity,
    increaseQuantity,
    clearCart,
    isEmpty,
    cartTotal,
  };
};

export default useCart;
