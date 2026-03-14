import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {

  const navigate = useNavigate();

  /* LOGIN STATE */

  const [adminId,setAdminId] = useState("");
  const [password,setPassword] = useState("");
  const [isLoggedIn,setIsLoggedIn] = useState(false);

  /* BOAT STATES */

  const [name,setName] = useState("");
  const [boatId,setBoatId] = useState("");
  const [district,setDistrict] = useState("");
  const [boats,setBoats] = useState([]);

  /* CHECK LOGIN STATUS */

  useEffect(()=>{

    const auth = localStorage.getItem("adminAuth");

    if(auth === "true"){
      setIsLoggedIn(true);
      fetchBoats();
    }

  },[]);

  /* LOGIN FUNCTION */

  const handleLogin = (e) => {

    e.preventDefault();

    if(adminId === "admin" && password === "1234"){

      localStorage.setItem("adminAuth","true");

      setIsLoggedIn(true);

      fetchBoats();

    }
    else{

      alert("Invalid Admin ID or Password");

    }

  };

  /* FETCH BOATS */

  const fetchBoats = async () => {

    const res = await fetch("http://localhost:5000/api/boat/allBoats");

    const data = await res.json();

    setBoats(data);

  };

  /* ADD BOAT */

  const handleSubmit = async (e) => {

    e.preventDefault();

    await fetch("http://localhost:5000/api/boat/addBoat",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name,
        boatId,
        district
      })
    });

    setName("");
    setBoatId("");
    setDistrict("");

    fetchBoats();

  };

  /* DELETE BOAT */

  const deleteBoat = async (id) => {

    await fetch(`http://localhost:5000/api/boat/deleteBoat/${id}`,{
      method:"DELETE"
    });

    fetchBoats();

  };

  /* LOGOUT */

  const handleLogout = () => {

    localStorage.removeItem("adminAuth");

    setIsLoggedIn(false);

    navigate("/admin");

  };

  const uniqueDistricts = [...new Set(boats.map(b=>b.district))].length;

  /* ================= LOGIN PAGE ================= */

  if(!isLoggedIn){

    return(

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white">

        <form
        onSubmit={handleLogin}
        className="bg-white/10 backdrop-blur-lg border border-white/20 p-10 rounded-2xl shadow-xl w-96">

          <h2 className="text-3xl font-bold mb-6 text-center text-cyan-400">
            🔐 Admin Login
          </h2>

          <input
          value={adminId}
          onChange={(e)=>setAdminId(e.target.value)}
          placeholder="Admin ID"
          className="w-full p-3 mb-4 bg-black border border-gray-600 rounded-lg focus:border-cyan-400 outline-none"
          required
          />

          <input
          type="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-3 mb-6 bg-black border border-gray-600 rounded-lg focus:border-cyan-400 outline-none"
          required
          />

          <button
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 py-3 rounded-lg font-semibold hover:scale-105 transition">

            Login

          </button>

        </form>

      </div>

    );

  }

  /* ================= DASHBOARD ================= */

  return(

    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white pt-28 px-10 pb-10">

      {/* HEADER */}

      <div className="flex justify-between items-center mb-10">

        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          ⚙ Admin Dashboard
        </h1>

        {/* LOGOUT BUTTON */}

        <button
        onClick={handleLogout}
        className="bg-red-500 px-6 py-2 rounded-lg hover:bg-red-600 hover:scale-105 transition">

          Logout

        </button>

      </div>

      <div className="grid md:grid-cols-2 gap-10">

      {/* ADD BOAT */}

      <form
      onSubmit={handleSubmit}
      className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-xl max-w-md">

        <h2 className="text-xl mb-6 font-semibold text-cyan-400">
          ➕ Add Boat
        </h2>

        <input
        value={name}
        onChange={(e)=>setName(e.target.value)}
        placeholder="Fisherman Name"
        className="w-full p-3 mb-4 bg-black border border-gray-600 rounded-lg"
        required
        />

        <input
        value={boatId}
        onChange={(e)=>setBoatId(e.target.value)}
        placeholder="Boat ID"
        className="w-full p-3 mb-4 bg-black border border-gray-600 rounded-lg"
        required
        />

        <input
        value={district}
        onChange={(e)=>setDistrict(e.target.value)}
        placeholder="District"
        className="w-full p-3 mb-6 bg-black border border-gray-600 rounded-lg"
        required
        />

        <button className="bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-2 rounded-lg hover:scale-105 transition">
          Add Boat
        </button>

      </form>

      {/* STATISTICS */}

      <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-xl">

        <h2 className="text-xl mb-6 text-purple-400 font-semibold">
          📊 Boat Statistics
        </h2>

        <div className="grid grid-cols-2 gap-6">

          <div className="bg-cyan-500/20 p-5 rounded-xl">
            <p>Total Boats</p>
            <h3 className="text-3xl text-cyan-400 font-bold">{boats.length}</h3>
          </div>

          <div className="bg-green-500/20 p-5 rounded-xl">
            <p>Active Boats</p>
            <h3 className="text-3xl text-green-400 font-bold">{boats.length}</h3>
          </div>

          <div className="bg-purple-500/20 p-5 rounded-xl">
            <p>Districts</p>
            <h3 className="text-3xl text-purple-400 font-bold">{uniqueDistricts}</h3>
          </div>

          <div className="bg-yellow-500/20 p-5 rounded-xl">
            <p>Status</p>
            <h3 className="text-yellow-400 font-semibold">Monitoring Active</h3>
          </div>

        </div>

      </div>

      </div>

      {/* BOAT TABLE */}

      <div className="mt-14">

        <h2 className="text-2xl mb-6 font-semibold text-cyan-400">
          🚢 Registered Boats
        </h2>

        <div className="overflow-hidden rounded-2xl border border-white/10 shadow-xl">

        <table className="w-full">

          <thead>

            <tr className="bg-gray-900 text-gray-300">

              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Boat ID</th>
              <th className="p-4 text-left">District</th>
              <th className="p-4 text-center">Action</th>

            </tr>

          </thead>

          <tbody>

            {boats.map((boat,index)=>(

              <tr
              key={boat._id}
              className={`border-t border-gray-700 hover:bg-white/5
              ${index%2===0 ? "bg-black/40" : "bg-black/20"}`}>

                <td className="p-4">{boat.name}</td>
                <td className="p-4 text-cyan-400">{boat.boatId}</td>
                <td className="p-4">{boat.district}</td>

                <td className="p-4 text-center">

                  <button
                  onClick={()=>deleteBoat(boat._id)}
                  className="bg-red-500 px-4 py-1 rounded-lg hover:bg-red-600 transition">

                    Delete

                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

        </div>

      </div>

    </div>

  );

};

export default AdminPage;