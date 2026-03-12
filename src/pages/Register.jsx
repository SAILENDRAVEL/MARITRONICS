import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  // 🔐 REAL BACKEND REGISTER
  const handleRegister = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Registration failed");
        return;
      }

      alert("Registration successful. Please login.");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Server error. Try again.");
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black
                    flex items-center justify-center px-6"
    >
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md bg-white/5 backdrop-blur-lg
                   border border-white/10 rounded-2xl p-8 text-white"
      >
        <h2 className="text-3xl font-bold text-center mb-8 text-cyan-400">
          Register
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          className="w-full mb-4 px-4 py-3 rounded-lg bg-black/40 border border-white/10"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="w-full mb-4 px-4 py-3 rounded-lg bg-black/40 border border-white/10"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="w-full mb-6 px-4 py-3 rounded-lg bg-black/40 border border-white/10"
        />

        <button className="w-full py-3 bg-cyan-500 rounded-lg font-semibold">
          Register
        </button>

        <p className="text-sm text-center mt-6 text-gray-400">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-cyan-400 cursor-pointer"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
