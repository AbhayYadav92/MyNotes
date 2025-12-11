import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await signup(formData);

    if (success) {
      alert("Signup successful!");
      navigate("/");
    } else {
      alert("Signup failed!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-900 text-white">
      <div className="w-full max-w-md bg-slate-800 p-8 rounded-xl shadow-lg">

        <h2 className="text-3xl font-bold text-center mb-6 text-blue-400">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Full Name */}
          <div>
            <label className="block mb-1 text-gray-300">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 rounded bg-slate-700 outline-none"
              placeholder="Enter full name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 rounded bg-slate-700 outline-none"
              placeholder="Enter email"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 rounded bg-slate-700 outline-none"
              placeholder="Enter password"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Signup
          </button>

        </form>
      </div>
    </div>
  );
}
