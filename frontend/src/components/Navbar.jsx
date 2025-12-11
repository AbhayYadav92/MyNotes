import { Link, useLocation, useNavigate } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const linkClass = (path) =>
    `hover:text-blue-400 transition ${
      location.pathname === path ? "text-blue-400 font-semibold" : "text-gray-300"
    }`;

  return (
    <nav className="bg-gray-900 text-white px-6 py-3 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <BookOpen className="w-7 h-7 text-blue-400" />
          <span className="text-2xl text-blue-400 tracking-wide font-semibold">
            MySmartNotes
          </span>
        </Link>

        {/* Right Links */}
        <div className="flex items-center gap-6">
          
          <Link to="/" className={linkClass("/")}>Home</Link>

          {/* Only show Create Note when logged in */}
          {user && (
            <Link to="/create-note" className={linkClass("/create-note")}>
              Create Note
            </Link>
          )}

          {/* If NOT logged in */}
          {!user && (
            <>
              <Link to="/login" className={linkClass("/login")}>Login</Link>
              <Link to="/signup" className={linkClass("/signup")}>Signup</Link>
            </>
          )}

          {/* If logged in */}
          {user && (
            <div className="flex items-center gap-4">
              <span className="text-gray-300 font-medium">
                Hi, {user.name}
              </span>

              <button
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                className="bg-red-500 px-4 py-1 rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
