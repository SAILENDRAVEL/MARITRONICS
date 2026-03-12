import { useState, useEffect } from "react";

const AdminPage = () => {

  const [name,setName] = useState("");
  const [boatId,setBoatId] = useState("");
  const [district,setDistrict] = useState("");
  const [boats,setBoats] = useState([]);

  const fetchBoats = async () => {

    const res = await fetch("http://localhost:5000/api/boat/allBoats");
    const data = await res.json();

    setBoats(data);

  };

  useEffect(() => {
    fetchBoats();
  }, []);


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


  const deleteBoat = async (id) => {

    await fetch(`http://localhost:5000/api/boat/deleteBoat/${id}`,{
      method:"DELETE"
    });

    fetchBoats();

  };


  /* UNIQUE DISTRICT COUNT */

  const uniqueDistricts = [...new Set(boats.map(b => b.district))].length;

  return (

    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white pt-28 px-10 pb-10">

      {/* HEADER */}

      <h1 className="text-4xl font-bold mb-10 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
        ⚙ Admin Dashboard
      </h1>


      <div className="grid md:grid-cols-2 gap-10">


      {/* ADD BOAT FORM */}

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
        className="w-full p-3 mb-4 bg-black border border-gray-600 rounded-lg focus:border-cyan-400 focus:outline-none transition"
        required
        />

        <input
        value={boatId}
        onChange={(e)=>setBoatId(e.target.value)}
        placeholder="Boat ID"
        className="w-full p-3 mb-4 bg-black border border-gray-600 rounded-lg focus:border-cyan-400 focus:outline-none transition"
        required
        />

        <input
        value={district}
        onChange={(e)=>setDistrict(e.target.value)}
        placeholder="District"
        className="w-full p-3 mb-6 bg-black border border-gray-600 rounded-lg focus:border-cyan-400 focus:outline-none transition"
        required
        />

        <button className="bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-2 rounded-lg font-semibold hover:scale-105 transition">
          Add Boat
        </button>

      </form>


      {/* BOAT STATISTICS */}

      <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-xl">

        <h2 className="text-xl mb-6 text-purple-400 font-semibold flex items-center gap-2">
          📊 Boat Statistics
        </h2>

        <div className="grid grid-cols-2 gap-6">

          {/* TOTAL BOATS */}

          <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 p-5 rounded-xl border border-cyan-400/20">
            <p className="text-gray-300 text-sm">Total Boats</p>
            <h3 className="text-4xl font-bold text-cyan-400 mt-1">
              {boats.length}
            </h3>
          </div>

          {/* ACTIVE BOATS */}

          <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 p-5 rounded-xl border border-green-400/20">
            <p className="text-gray-300 text-sm">Active Boats</p>
            <h3 className="text-4xl font-bold text-green-400 mt-1">
              {boats.length}
            </h3>
          </div>

          {/* DISTRICTS */}

          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-5 rounded-xl border border-purple-400/20">
            <p className="text-gray-300 text-sm">Districts Covered</p>
            <h3 className="text-4xl font-bold text-purple-400 mt-1">
              {uniqueDistricts}
            </h3>
          </div>

          {/* SYSTEM STATUS */}

          <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 p-5 rounded-xl border border-yellow-400/20">
            <p className="text-gray-300 text-sm">System Status</p>
            <h3 className="text-lg font-semibold text-yellow-400 mt-2">
              Monitoring Active
            </h3>
          </div>

        </div>

      </div>

      </div>


      {/* REGISTERED BOATS */}

      <div className="mt-14">

      <h2 className="text-2xl mb-6 font-semibold text-cyan-400">
        🚢 Registered Boats
      </h2>

      <div className="overflow-hidden rounded-2xl border border-white/10 shadow-xl">

      <table className="w-full">

        <thead>

          <tr className="bg-gradient-to-r from-gray-800 to-gray-900 text-gray-300">

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
            className={`border-t border-gray-700 hover:bg-white/5 transition
            ${index%2===0 ? "bg-black/40" : "bg-black/20"}`}>

              <td className="p-4">{boat.name}</td>
              <td className="p-4 text-cyan-400 font-semibold">{boat.boatId}</td>
              <td className="p-4">{boat.district}</td>

              <td className="p-4 text-center">

                <button
                onClick={()=>deleteBoat(boat._id)}
                className="bg-red-500 px-4 py-1 rounded-lg hover:bg-red-600 hover:scale-105 transition">

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