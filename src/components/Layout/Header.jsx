import { Link } from "react-router-dom";
import { Menu } from "lucide-react";

export default function Header({ onToggleSidebar }) {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 
      bg-black/50 backdrop-blur-md 
      border-b border-violet-300/20 
      px-6 py-3 flex items-center justify-between text-gray-100"
    >
      <div className="flex items-center gap-3">
        <button
          className="lg:hidden p-2 rounded hover:bg-violet-500/20 transition"
          onClick={onToggleSidebar}
        >
          <Menu size={20} />
        </button>

        <Link
          to="/"
          className="text-2xl font-bold text-violet-300 hover:text-violet-400 transition"
        >
          StepByStep
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <Link
          to="/login"
          className="px-3 py-1.5 text-sm rounded-md 
            hover:bg-violet-500/20 transition"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="px-3 py-1.5 text-sm rounded-md 
            bg-violet-600 hover:bg-violet-700 text-white transition"
        >
          Register
        </Link>
      </div>
    </header>
  );
}
