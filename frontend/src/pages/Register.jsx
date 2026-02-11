import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../api/api";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const data = await registerUser(name, email, password);

      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        alert(data.message || "Registration Failed");
      }
    } catch (error) {
      alert("Something went wrong");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600">
      <form
        onSubmit={handleRegister}
        className="bg-white/20 backdrop-blur-lg p-10 rounded-2xl shadow-2xl w-96 animate-fadeIn"
      >
        <h2 className="text-white text-3xl font-bold mb-6 text-center">
          Create Account
        </h2>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 mb-4 rounded-lg focus:outline-none"
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 rounded-lg focus:outline-none"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-6 rounded-lg focus:outline-none"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="w-full bg-white text-indigo-600 py-3 rounded-lg font-bold hover:scale-105 transition-all duration-300">
          Register
        </button>

        <p className="text-white mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
