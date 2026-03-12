import { useNavigate } from "react-router-dom";
import boatImage from "../assets/boat-image.png";

const BoatDetails = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.name.value.trim();
    const boatId = e.target.boatId.value.trim();
    const district = e.target.district.value.trim();

    try {

      const res = await fetch("http://localhost:5000/api/boat/validateBoat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          boatId,
          district
        })
      });

      const data = await res.json();

      if (data.valid) {

        /* STORE BOAT DETAILS */
        sessionStorage.setItem(
          "boatDetails",
          JSON.stringify({
            name,
            boatId,
            district
          })
        );

        /* GO TO LIVE STATUS */
        navigate("/livestatus");

      } else {

        alert("❌ Invalid Boat Details. Contact Admin.");

      }

    } catch (error) {

      console.error("Boat validation error:", error);
      alert("⚠ Server Error. Please try again.");

    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black
                    flex items-center justify-center px-6 pt-24">

      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2
                      rounded-2xl overflow-hidden
                      bg-white/5 backdrop-blur-lg
                      border border-white/10 shadow-2xl">

        {/* LEFT – FORM */}

        <div className="p-10 text-white flex flex-col justify-center">

          <h2 className="text-3xl font-bold mb-6 text-cyan-400">
            Boat Details
          </h2>

          <p className="text-gray-400 mb-8">
            Enter your boat information to continue to live monitoring.
          </p>

          <form onSubmit={handleSubmit}>

            <input
              name="name"
              placeholder="Fisherman Name"
              required
              className="w-full mb-4 px-4 py-3 rounded-lg
                         bg-black/40 border border-white/10"
            />

            <input
              name="boatId"
              placeholder="Boat ID"
              required
              className="w-full mb-4 px-4 py-3 rounded-lg
                         bg-black/40 border border-white/10"
            />

            <input
              name="district"
              placeholder="District"
              required
              className="w-full mb-6 px-4 py-3 rounded-lg
                         bg-black/40 border border-white/10"
            />

            <button
              type="submit"
              className="w-full py-3 bg-cyan-500 rounded-lg font-semibold hover:bg-cyan-400 transition"
            >
              Continue
            </button>

          </form>

        </div>

        {/* RIGHT – IMAGE */}

        <div className="hidden md:block relative">

          <img
            src={boatImage}
            alt="Boat details visual"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/30"></div>

          <div className="absolute bottom-10 left-10 right-10 text-white">

            <h3 className="text-2xl font-bold mb-2">
              Safe Voyage Monitoring
            </h3>

            <p className="text-sm text-gray-200">
              Track your boat status and border safety in real time.
            </p>

          </div>

        </div>

      </div>
    </div>
  );
};

export default BoatDetails;