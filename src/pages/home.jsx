import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();



  useEffect(() => {
    axios.get("https://fakestoreapi.com/products")
      .then(res => {
        setProducts(res.data);
        const allCats = [...new Set(res.data.map(p => p.category))];
        setCategories(allCats);
      })
      .catch(err => setError("Failed to load products"))
      .finally(() => setLoading(false));
  }, []);

  const handleViewDetail = (id) => {
    navigate(`/product/${id}`);
  };

  const handleAddToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    existingCart.push(product);
    localStorage.setItem("cart", JSON.stringify(existingCart));
    alert("🛒 Added to Cart");
  };

  const filteredProducts = selectedCategory === "all"
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="text-xl font-semibold mb-6 text-center flex justify-between" >🛍️ All Products <div><button
  onClick={() => navigate("/cart")}
  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
>
  View Cart
</button></div></div>

      <div className="mb-6 flex justify-center items-center gap-4">
        <label className="font-medium text-lg">Filter by Category:</label>
        <select
          className="border rounded px-3 py-1 text-sm"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {loading ? <p className="text-center">Loading...</p> : error ? <p className="text-center text-red-500">{error}</p> : (
       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
  {filteredProducts.map(product => (
    <div
      key={product.id}
      className="border p-2 rounded-lg shadow-sm bg-white text-xs"
      style={{ maxWidth: "180px" }} 
    >
      <img
        src={product.image}
        alt={product.title}
        className="h-24 w-full object-contain mx-auto mb-2"
        style={{ maxHeight: "90px" }} 
      />
      <h2 className="text-[11px] font-semibold truncate mb-1 text-gray-800">{product.title}</h2>
      <p className="text-[10px] text-gray-600 mb-2 font-semibold">${product.price}</p>
      <div className="flex justify-between gap-1">
        <button
          onClick={() => handleViewDetail(product.id)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-0.5 rounded text-[10px]"
        >
          View
        </button>
        <button
          onClick={() => handleAddToCart(product)}
          className="bg-green-500 hover:bg-green-600 text-white px-2 py-0.5 rounded text-[10px]"
        >
          Add
        </button>
      </div>
    </div>
  ))}
</div>


      )}
    </div>
  );
};

export default Home;
