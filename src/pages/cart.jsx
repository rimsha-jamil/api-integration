import React, { useEffect, useState } from "react";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
 
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4"> Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-2 border rounded shadow"
            >
              <img src={item.image} alt={item.title} className="w-16 h-16 object-contain" />
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-600">${item.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartPage;
