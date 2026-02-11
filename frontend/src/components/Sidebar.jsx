import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const linkStyle =
    "block py-3 px-4 rounded-lg hover:bg-indigo-500 transition-all duration-300";

  return (
    <div className="w-64 bg-indigo-700 text-white min-h-screen p-5">
      <h2 className="text-2xl font-bold mb-8">Menu</h2>

      <NavLink to="/dashboard" className={linkStyle}>Dashboard</NavLink>
      <NavLink to="/health" className={linkStyle}>Health</NavLink>
      <NavLink to="/finance" className={linkStyle}>Finance</NavLink>
      <NavLink to="/study" className={linkStyle}>Study</NavLink>
      <NavLink to="/tasks" className={linkStyle}>Tasks</NavLink>
    </div>
  );
};

export default Sidebar;
