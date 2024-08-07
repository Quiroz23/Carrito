import Header from "./components/Header";
import Guitar from "./components/Guitar";
import { useState, useEffect } from "react";
import { db } from "./data/db";

function App() {
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);
    //Este es para agregar cosas puede ser en un carrito o para algo mas en el futuro
  function addToCart(item) {
    const itemsExists = cart.findIndex((guitar) => guitar.id === item.id);
    if (itemsExists >= 0) {
      //Existe en el carrito
      const updatedCart = [...cart]
      updatedCart[itemsExists].quantity++
      setCart(updatedCart)
    } else {
      item.quantity = 1
      setCart( [...cart, item]);
    }
  }

  useEffect(() => {
    setData(db);
  }, []);

  return (
    <>
      <Header
      cart = {cart}
      
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar
              key={guitar.id}
              guitar={guitar}
              cart={cart}
              setCart={setCart}
              addToCart={addToCart}
            />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
