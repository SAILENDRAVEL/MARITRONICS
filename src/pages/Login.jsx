import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";
import { useEffect } from "react";
import loginImage from "../assets/login-image.png";

const Login = () => {
  const navigate = useNavigate();

  // Backend URL (Render API)
  const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000";

  // 🔁 If already logged in
  useEffect(() => {
    if (isAuthenticated()) {
      const boatDetails = sessionStorage.getItem("boatDetails");
      if (boatDetails) {
        navigate("/livestatus");
      } else {
        navigate("/boat-details");
      }
    }
  }, [navigate]);

  // 🔐 LOGIN FUNCTION
  const handleLogin = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      // Save auth
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("isAuth", "true");

      // Redirect
      navigate("/boat-details");
    } catch (error) {
      console.error(error);
      alert("Server error. Try again.");
    }
  };

  return (
    <div
      className="h-screen overflow-hidden
                 bg-gradient-to-b from-black via-gray-900 to-black
                 flex items-center justify-center px-6 pt-20"
    >
      <div
        className="w-full max-w-6xl h-[720px]
                   grid grid-cols-1 md:grid-cols-2
                   rounded-2xl overflow-hidden
                   bg-white/5 backdrop-blur-lg
                   border border-white/10 shadow-2xl"
      >
        {/* LEFT SIDE LOGIN */}
        <div className="flex items-center justify-center p-10 text-white">
          <form onSubmit={handleLogin} className="w-full max-w-md">
            <h2 className="text-3xl font-bold text-center mb-8 text-cyan-400">
              Login
            </h2>

            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="w-full mb-4 px-4 py-3 rounded-lg
                         bg-black/40 border border-white/10
                         focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="w-full mb-6 px-4 py-3 rounded-lg
                         bg-black/40 border border-white/10
                         focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />

            <button
              type="submit"
              className="w-full py-3 bg-cyan-500 rounded-lg font-semibold hover:bg-cyan-600 transition"
            >
              Login
            </button>

            <p className="text-sm text-center mt-6 text-gray-400">
              Don’t have an account?{" "}
              <span
                onClick={() => navigate("/register")}
                className="text-cyan-400 cursor-pointer hover:underline"
              >
                Register
              </span>
            </p>
          </form>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="hidden md:block relative">
          <img
            src={loginImage}
            alt="Login visual"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/30"></div>

          <div className="absolute bottom-6 left-6 right-6 text-white text-center">
            <h3 className="text-xl font-semibold mb-1">
              Welcome Aboard
            </h3>
            <p className="text-sm text-gray-200">
              Secure access to boat monitoring system
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;