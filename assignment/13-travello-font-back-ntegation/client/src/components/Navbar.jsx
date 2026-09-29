import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-2xl font-extrabold text-blue-600">
          Travello
        </Link>

        <div className="flex items-center gap-4 text-sm font-semibold">
          <NavLink to="/" className="hover:text-blue-600">Home</NavLink>
          <NavLink to="/tours" className="hover:text-blue-600">Tours</NavLink>

          {!loading && user && (
            <>
              <NavLink to="/dashboard" className="hover:text-blue-600">
                Dashboard
              </NavLink>
              <button
                onClick={handleLogout}
                className="rounded-lg bg-red-500 px-4 py-2 text-white"
              >
                Logout
              </button>
            </>
          )}

          {!loading && !user && (
            <>
              <Link to="/login" className="text-blue-600">Login</Link>
              <Link
                to="/register"
                className="rounded-lg bg-blue-600 px-4 py-2 text-white"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
