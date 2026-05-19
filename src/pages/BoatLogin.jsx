import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BoatLogin = () => {

  const [boatId, setBoatId] = useState("");

  const navigate = useNavigate();

  /* API URL */

  const API_URL = import.meta.env.VITE_API_URL;

  const verifyBoat = async () => {

    try {

      const res = await fetch(`${API_URL}/api/boat/allBoats`);

      const boats = await res.json();

      const boatExists = boats.find(
        (boat) => boat.boatId === boatId
      );

      if (boatExists) {

        navigate("/livestatus");

      } else {

        alert("❌ Invalid Boat ID");

      }

    } catch (error) {

      console.error(error);

      alert("⚠ Server Error");

    }

  };

  return (

    <div style={{ padding: "120px" }}>

      <h2>Boat Login</h2>

      <input
        placeholder="Enter Boat ID"
        value={boatId}
        onChange={(e) => setBoatId(e.target.value)}
      />

      <br /><br />

      <button onClick={verifyBoat}>
        Login Boat
      </button>

    </div>

  );

};

export default BoatLogin;