import { useNavigate, useLocation } from "react-router-dom";
import { isAuthenticated, logout } from "../utils/auth";
import { useEffect, useState } from "react";
import logo from "../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 🔐 reactive auth state
  const [loggedIn, setLoggedIn] = useState(isAuthenticated());

  // 🔁 update navbar on route change (login → livestatus)
  useEffect(() => {
    setLoggedIn(isAuthenticated());
  }, [location]);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    const navbarHeight = 80;

    if (section) {
      const y =
        section.getBoundingClientRect().top +
        window.pageYOffset -
        navbarHeight;

      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handleLogout = () => {
    logout();           // clear session
    setLoggedIn(false); // update navbar instantly
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-3 text-white cursor-pointer"
        >
          <img
            src={logo}
            alt="Maritronics Logo"
            className="w-10 h-10 object-contain"
          />
          <div>
            <h1 className="text-lg font-semibold">Maritronics</h1>
            <p className="text-xs text-gray-300">
              Autonomous Speed & Safety
            </p>
          </div>
        </div>

        {/* MENU */}
        <ul className="hidden md:flex gap-8 font-medium text-gray-300 items-center">

          {/* SCROLL LINKS */}
          {["home", "about", "features", "working", "benefits"].map((item) => (
            <li
              key={item}
              onClick={() => {
                navigate("/");
                setTimeout(() => scrollToSection(item), 50);
              }}
              className="cursor-pointer hover:text-white capitalize"
            >
              {item}
            </li>
          ))}

          {/* AFTER LOGIN */}
          {loggedIn && (
            <>
              <li
                onClick={() => navigate("/livestatus")}
                className="cursor-pointer hover:text-cyan-400"
              >
                Live Status
              </li>

              <li
                onClick={handleLogout}
                className="cursor-pointer px-4 py-2 rounded-lg
                           bg-red-500/20 text-red-400 hover:bg-red-500/30"
              >
                Logout
              </li>
            </>
          )}

          {/* BEFORE LOGIN */}
          {!loggedIn && (
            <li
              onClick={() => navigate("/login")}
              className="cursor-pointer px-4 py-2 rounded-lg
                         bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30"
            >
              Login
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
