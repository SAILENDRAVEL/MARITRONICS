import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

const LiveDashboard = () => {

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) navigate("/login");
  }, [navigate]);

  /* ---------------- BOAT DETAILS ---------------- */

  const [boat, setBoat] = useState({
    name: "",
    district: "",
    boatId: ""
  });

  useEffect(() => {
    const storedBoat = sessionStorage.getItem("boatDetails");
    if (storedBoat) setBoat(JSON.parse(storedBoat));
  }, []);

  /* ---------------- DISTRICT RADAR ---------------- */

  const districtRadar = {

    Tuticorin:[8.7642,78.1348],
    Rameshwaram:[9.2881,79.3129],
    Nagapattinam:[10.7669,79.8433],
    Cuddalore:[11.7447,79.7680],
    Karaikal:[10.9157,79.8380],
    Kanyakumari:[8.0883,77.5385],

    Kochi:[9.9312,76.2673],
    Kollam:[8.8932,76.6141],
    Alappuzha:[9.4981,76.3388],
    Kozhikode:[11.2588,75.7804],
    Kasargod:[12.4996,74.9869]

  };

  const shoreCoords =
    districtRadar[boat.district] || [8.7642,78.1348];

  const deepSeaCoords = [
    shoreCoords[0] - 0.15,
    shoreCoords[1] + 0.25
  ];

  /* ---------------- BOAT MOVEMENT ---------------- */

  const [progress,setProgress]=useState(0);

  useEffect(()=>{

    const interval=setInterval(()=>{
      setProgress(prev=>{
        if(prev>=1) return 1;
        return prev+0.02;
      });
    },300);

    return ()=>clearInterval(interval);

  },[]);

  /* ---------------- CURRENT POSITION ---------------- */

  const currentLat =
    shoreCoords[0] +
    (deepSeaCoords[0] - shoreCoords[0]) * progress;

  const currentLng =
    shoreCoords[1] +
    (deepSeaCoords[1] - shoreCoords[1]) * progress;

  /* ---------------- DISTANCE ---------------- */

  const calculateDistance=(lat1,lon1,lat2,lon2)=>{

    const R=6371;

    const dLat=(lat2-lat1)*Math.PI/180;
    const dLon=(lon2-lon1)*Math.PI/180;

    const a=
    Math.sin(dLat/2)**2+
    Math.cos(lat1*Math.PI/180)*
    Math.cos(lat2*Math.PI/180)*
    Math.sin(dLon/2)**2;

    const c=2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));

    return R*c;

  };

  const distance = calculateDistance(
    shoreCoords[0],
    shoreCoords[1],
    currentLat,
    currentLng
  );

  /* ---------------- ZONE + SPEED ---------------- */

  const [speed,setSpeed]=useState(30);
  const [zone,setZone]=useState("Safe");

  useEffect(()=>{

    if(distance<=20){
      setZone("Safe");
      setSpeed(30);
    }

    else if(distance<=35){
      setZone("Near Danger");
      setSpeed(20);
    }

    else{
      setZone("Danger Zone");
      setSpeed(10);
    }

  },[distance]);

  /* ---------------- THINGSPEAK DATA ---------------- */

  const [temperature,setTemperature]=useState(0);
  const [pressure,setPressure]=useState(0);
  const [humidity,setHumidity]=useState(0);
  const [windSpeed,setWindSpeed]=useState(0);

  useEffect(()=>{

    const fetchThingSpeak=async()=>{

      const res=await fetch(
        "https://api.thingspeak.com/channels/3289971/feeds.json?results=1"
      );

      const data=await res.json();

      if(data.feeds.length>0){

        const feed=data.feeds[0];

        setTemperature(parseFloat(feed.field1)||0);
        setPressure(parseFloat(feed.field2)||0);
        setWindSpeed(parseFloat(feed.field3)||0);
        setHumidity(parseFloat(feed.field4)||0);

      }

    };

    fetchThingSpeak();

    const interval=setInterval(fetchThingSpeak,15000);

    return ()=>clearInterval(interval);

  },[]);

  /* ---------------- POPUP GRAPH ---------------- */

  const [showGraphs,setShowGraphs]=useState(false);

  /* ---------------- ZONE COLOR ---------------- */

  const zoneColor =
  zone==="Safe"
  ?"from-green-400 to-green-600"
  :zone==="Near Danger"
  ?"from-orange-400 to-orange-600"
  :"from-red-500 to-red-700";

  const dangerPulse = zone==="Danger Zone" ? "animate-pulse" : "";

  return (

  <div className="min-h-screen pt-24 px-12 bg-gradient-to-br from-[#1e1b4b] via-[#0f172a] to-black text-white">

  <h1 className="text-4xl font-bold mb-12 tracking-wide text-center">
  📡 Marine Monitoring Dashboard
  </h1>

  <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

  {/* SPEED GAUGE */}

  <div className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-xl p-10 rounded-2xl shadow-2xl border border-cyan-400/20">

  <div className="relative w-44 h-44">

  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-600 blur-lg opacity-60"></div>

  <div className="absolute inset-3 bg-black rounded-full flex items-center justify-center">

  <span className="text-4xl font-bold text-cyan-400">
  {speed} NM
  </span>

  </div>

  </div>

  <p className="mt-5 text-white/60">
  Current Speed
  </p>

  </div>

  {/* ZONE STATUS */}

  <div className={`flex flex-col items-center justify-center text-center p-10 rounded-2xl shadow-2xl bg-gradient-to-br ${zoneColor} ${dangerPulse}`}>

  <p className="text-sm tracking-widest uppercase opacity-80 mb-3">
  Zone Status
  </p>

  <h2 className="text-4xl font-bold">
  {zone}
  </h2>

  <p className="text-sm mt-3 opacity-80">
  Marine Navigation Zone
  </p>

  </div>

  {/* BOAT DETAILS */}

  <div className="flex flex-col items-center justify-center text-center bg-white/10 backdrop-blur-xl p-10 rounded-2xl shadow-2xl border border-cyan-500/20">

  <p className="text-sm text-white/60 uppercase tracking-widest mb-6">
  Boat Details
  </p>

  <div className="space-y-5">

  <div>
  <p className="text-cyan-400 text-sm">Captain</p>
  <p className="text-xl font-semibold">{boat.name}</p>
  </div>

  <div>
  <p className="text-cyan-400 text-sm">District</p>
  <p className="text-xl font-semibold">{boat.district}</p>
  </div>

  <div>
  <p className="text-cyan-400 text-sm">Boat ID</p>
  <p className="text-xl font-semibold">{boat.boatId}</p>
  </div>

  </div>

  </div>

  {/* ENVIRONMENT PANEL */}

  <div
  onClick={()=>setShowGraphs(true)}
  className="lg:col-span-3 bg-white/10 backdrop-blur-xl p-10 rounded-2xl shadow-2xl border border-cyan-500/20 hover:shadow-cyan-500/40 transition cursor-pointer animate-pulse">

  <p className="text-sm text-white/60 mb-6 uppercase tracking-wider text-center">
  Environment Telemetry (Click for Analytics)
  </p>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">

  <div className="bg-black/30 p-6 rounded-xl">
  🌡
  <p className="text-sm mt-2">Temperature</p>
  <p className="text-xl font-bold text-red-400">{temperature}°C</p>
  </div>

  <div className="bg-black/30 p-6 rounded-xl">
  💨
  <p className="text-sm mt-2">Pressure</p>
  <p className="text-xl font-bold text-purple-400">{pressure} hPa</p>
  </div>

  <div className="bg-black/30 p-6 rounded-xl">
  💧
  <p className="text-sm mt-2">Humidity</p>
  <p className="text-xl font-bold text-blue-400">{humidity}%</p>
  </div>

  <div className="bg-black/30 p-6 rounded-xl">
  🌬
  <p className="text-sm mt-2">Wind</p>
  <p className="text-xl font-bold text-green-400">{windSpeed} km/h</p>
  </div>

  </div>

  </div>

  </div>

  {/* POPUP GRAPH */}

  {showGraphs && (

  <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">

  <div className="bg-[#0f172a] p-8 rounded-2xl w-[90%] max-w-6xl shadow-2xl border border-cyan-400/30">

  <div className="flex justify-between mb-6">

  <h2 className="text-2xl font-bold text-cyan-400">
  📊 Live Environment Analytics
  </h2>

  <button
  onClick={()=>setShowGraphs(false)}
  className="bg-red-500 px-4 py-2 rounded-lg">
  Close
  </button>

  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

  <iframe width="100%" height="260"
  src="https://thingspeak.com/channels/3289971/charts/1?bgcolor=%230f172a&color=%23ff0000&dynamic=true&type=line"/>

  <iframe width="100%" height="260"
  src="https://thingspeak.com/channels/3289971/charts/2?bgcolor=%230f172a&color=%2300ffff&dynamic=true&type=line"/>

  <iframe width="100%" height="260"
  src="https://thingspeak.com/channels/3289971/charts/3?bgcolor=%230f172a&color=%23ffaa00&dynamic=true&type=line"/>

  <iframe width="100%" height="260"
  src="https://thingspeak.com/channels/3289971/charts/4?bgcolor=%230f172a&color=%239933ff&dynamic=true&type=line"/>

  </div>

  </div>

  </div>

  )}

  </div>

  );

};

export default LiveDashboard;