import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authcontext";

const Login = () => {
  const [username, setUsername] = useState("mor_2314");
  const [password, setPassword] = useState("83r5^_");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); 

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("https://fakestoreapi.com/auth/login", {
        username,
        password,
      });

      login(res.data.token);
      navigate("/home");
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
   <div className="p-6 max-w-sm mx-auto bg-white rounded shadow-md mt-20">
  <h2 className="text-xl font-semibold mb-4 text-center text-blue-700">Welcome Back</h2>
  <p className="text-sm text-gray-600 mb-4 text-center">Please login to continue</p>

  {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

  <input
    type="text"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
    className="border border-gray-300 p-2 w-full mb-3 rounded"
    placeholder="Username"
  />

  <input
    type="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    className="border border-gray-300 p-2 w-full mb-4 rounded"
    placeholder="Password"
  />

  <button
    onClick={handleLogin}
    disabled={loading}
    className={`w-full py-2 rounded text-white font-semibold transition ${
      loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
    }`}
  >
    {loading ? "Logging in..." : "Login"}
  </button>
</div>

  );
};

export default Login;
