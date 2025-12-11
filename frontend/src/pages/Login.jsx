import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AUTH_URL from "../api/auth";   // ✅ FIXED — correct axios instance

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ✅ SEND LOGIN REQUEST TO AUTH API
      const res = await AUTH_URL.post("login", formData);

      if (res.data.token && res.data.user) {
        // context login() ko actual token + user pass karna padega
        login(formData);

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        navigate("/");
      } else {
        alert("Invalid login response from server");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Login failed! Please check email or password.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-900 text-white">
      <div className="w-full max-w-md bg-slate-800 p-8 rounded-xl shadow-lg">

        <h2 className="text-3xl font-bold text-center mb-6 text-blue-400">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block mb-1 text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              className="w-full p-2 rounded bg-slate-700 outline-none"
              placeholder="Enter email"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              className="w-full p-2 rounded bg-slate-700 outline-none"
              placeholder="Enter password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
