import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api/api";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(email, password);

      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        alert(data.message || "Invalid Credentials");
      }
    } catch (error) {
      alert("Login Failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600">
      <form
        onSubmit={handleLogin}
        className="bg-white/20 backdrop-blur-lg p-10 rounded-2xl shadow-2xl w-96"
      >
        <h2 className="text-white text-3xl font-bold mb-6 text-center">
          Welcome Back
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 rounded-lg focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-6 rounded-lg focus:outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-white text-indigo-600 py-3 rounded-lg font-bold hover:scale-105 transition-all duration-300"
        >
          Login
        </button>

        <p className="text-white mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
