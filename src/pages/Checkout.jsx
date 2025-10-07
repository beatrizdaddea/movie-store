import React, { useState } from "react";
import { Trash2, Search, Heart, ShoppingCart } from "lucide-react";
import Header from "../components/Header/Header";

export default function CheckoutPage() {
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Nome do Filme",
      price: 9.99,
      qty: 1,
      image: "https://via.placeholder.com/60",
    },
    {
      id: 2,
      name: "Nome do Filme",
      price: 9.99,
      qty: 1,
      image: "https://via.placeholder.com/60",
    },
  ]);

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const removeItem = (id) => setCart(cart.filter((item) => item.id !== id));

  return (
    <div className="min-h-screen bg-white flex flex-col text-gray-800">
      <header>
       <Header />
      </header>

      <main className="flex flex-1 px-12 py-10 gap-16">
        <section className="flex-1">
          <h2 className="text-2xl font-semibold mb-8">Finalizar Compra</h2>

          <form className="grid grid-cols-2 gap-4 max-w-md">
            <input
              type="text"
              placeholder="Nome Completo"
              className="col-span-2 border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-200 outline-none"
            />
            <input
              type="text"
              placeholder="CPF"
              className="border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-200 outline-none"
            />
            <input
              type="text"
              placeholder="Celular"
              className="border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-200 outline-none"
            />
            <input
              type="email"
              placeholder="E-mail"
              className="col-span-2 border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-200 outline-none"
            />
            <input
              type="text"
              placeholder="CEP"
              className="border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-200 outline-none"
            />
            <input
              type="text"
              placeholder="Endereço"
              className="border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-200 outline-none"
            />
            <input
              type="text"
              placeholder="Cidade"
              className="border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-200 outline-none"
            />
            <input
              type="text"
              placeholder="Estado"
              className="border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-200 outline-none"
            />
          </form>
        </section>

        <section className="w-[420px]">
          <div className="grid grid-cols-4 gap-4 mb-3 text-gray-600 font-semibold text-sm">
            <span>Imagem</span>
            <span>Nome</span>
            <span>Qtd</span>
            <span>Preço</span>
          </div>

          {cart.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-4 gap-4 items-center border-b border-gray-200 py-3 text-sm"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 rounded-md bg-gray-200 object-cover"
              />
              <span className="font-medium">{item.name}</span>
              <span>{item.qty}</span>
              <div className="flex items-center justify-between">
                <span>R$ {item.price.toFixed(2)}</span>
                <Trash2
                  className="text-gray-400 hover:text-red-500 cursor-pointer w-4 h-4 ml-2"
                  onClick={() => removeItem(item.id)}
                />
              </div>
            </div>
          ))}

          <div className="flex justify-between mt-6 text-lg font-semibold">
            <span>Total:</span>
            <span>R$ {total.toFixed(2)}</span>
          </div>

          <button className="w-full mt-6 bg-[#6a5cff] hover:bg-[#584ae3] text-white py-2.5 rounded-md font-medium transition">
            Finalizar
          </button>
        </section>
      </main>
    </div>
  );
}
