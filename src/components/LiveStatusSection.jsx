import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

const LiveStatus = () => {

  // 🔐 AUTH CHECK
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  // 🚤 GET BOAT DETAILS
  const boat = JSON.parse(sessionStorage.getItem("boatDetails"));

  // 🧠 DEMO LOGIC BASED ON BOAT ID
  const isNearBorder = boat?.boatId?.endsWith("5");

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black 
                 flex items-center justify-center px-6 pt-24"
    >
      <div className="max-w-6xl w-full text-center">

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
          <span
            className="bg-gradient-to-r from-cyan-400 to-blue-500 
                       bg-clip-text text-transparent"
          >
            Live Status
          </span>
        </h1>

        {/* 🚤 BOAT DETAILS */}
        {boat && (
          <div className="mb-12 text-gray-300 text-lg space-y-1">
            <p>
              <span className="text-white font-semibold">Name:</span>{" "}
              {boat.name}
            </p>
            <p>
              <span className="text-white font-semibold">Boat ID:</span>{" "}
              {boat.boatId}
            </p>
            <p>
              <span className="text-white font-semibold">District:</span>{" "}
              {boat.district}
            </p>
          </div>
        )}

        {/* Status cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* LOCATION */}
          <div
            className="rounded-2xl bg-white/5 backdrop-blur-lg
                       border border-white/10 p-8 text-center shadow-xl"
          >
            <p className="text-gray-400 mb-2">Current Location</p>
            <h3 className="text-2xl font-semibold text-white">
              NAVIC GNSS
            </h3>
            <p className="mt-4 text-cyan-400 font-medium">
              Tracking Active
            </p>
          </div>

          {/* BORDER STATUS (BASED ON BOAT ID) */}
          <div
            className="rounded-2xl bg-white/5 backdrop-blur-lg
                       border border-white/10 p-8 text-center shadow-xl"
          >
            <p className="text-gray-400 mb-2">Border Status</p>
            <h3 className="text-2xl font-semibold text-white">
              {isNearBorder ? "Near Border" : "Safe Zone"}
            </h3>
            <p
              className={`mt-4 font-medium ${
                isNearBorder ? "text-red-400" : "text-green-400"
              }`}
            >
              {isNearBorder ? "Warning Zone" : "Within Limits"}
            </p>
          </div>

          {/* ALERT */}
          <div
            className="rounded-2xl bg-white/5 backdrop-blur-lg
                       border border-white/10 p-8 text-center shadow-xl"
          >
            <p className="text-gray-400 mb-2">Alert System</p>
            <h3 className="text-2xl font-semibold text-white">
              GSM + Buzzer
            </h3>
            <p
              className={`mt-4 font-medium ${
                isNearBorder ? "text-red-400" : "text-cyan-400"
              }`}
            >
              {isNearBorder ? "Alert Active" : "Standby Mode"}
            </p>
          </div>

        </div>

        <p className="mt-16 text-gray-400 text-lg">
          Live status reflects real-time system monitoring and safety conditions
          of the fishing vessel.
        </p>
      </div>
    </div>
  );
};

export default LiveStatus;
