import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="navbar bg-base-100 shadow-lg px-6 py-4 mb-6 rounded-b-lg">
      <div className="flex-1">
        <Link
          to="/"
          className="text-2xl font-bold text-600 hover:text-blue-800"
        >
          StepByStep
        </Link>
      </div>
      <div className="flex-none gap-2">
        <Link
          to="/login"
          className="btn btn-ghost btn-sm text-gray-700 hover:text-blue-600"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="btn btn-primary btn-sm"
        >
          Register
        </Link>
      </div>
    </header>
  );
}
