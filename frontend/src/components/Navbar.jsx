import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="h-16 bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-between px-6 shadow-lg">
      <h1 className="text-white font-bold text-xl">
        Smart Life Dashboard
      </h1>

      <button
        onClick={logout}
        className="bg-white text-indigo-600 px-4 py-2 rounded-lg hover:scale-105 transition-all"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
