import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  Polygon,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

/* 🚢 BIGGER SHIP EMOJI ICON */

const shipEmojiIcon = L.divIcon({
  html: "<div style='font-size:25px;'>🚢</div>",
  className: "ship-icon",
  iconSize: [34, 34],
});

/* 🔴 STARTING VESSEL ICON */

const startIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const LiveStatus = () => {

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

  /* ---------------- DISTRICT RADAR LOCATION ---------------- */

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

  /* ---------------- THINGSPEAK DATA ---------------- */

  const [temperature, setTemperature] = useState(0);
  const [pressure, setPressure] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [windSpeed, setWindSpeed] = useState(0);
  const [showGraphs,setShowGraphs] = useState(false);

  useEffect(() => {

    const fetchThingSpeak = async () => {

      try {

        const res = await fetch(
          "https://api.thingspeak.com/channels/3289971/feeds.json?results=1"
        );

        const data = await res.json();

        if (data.feeds && data.feeds.length > 0) {

          const feed = data.feeds[0];

          setTemperature(parseFloat(feed.field1) || 0);
          setPressure(parseFloat(feed.field2) || 0);
          setWindSpeed(parseFloat(feed.field3) || 0);
          setHumidity(parseFloat(feed.field4) || 0);

        }

      } catch (err) {
        console.error("ThingSpeak Error:", err);
      }

    };

    fetchThingSpeak();

    const interval = setInterval(fetchThingSpeak, 15000);

    return () => clearInterval(interval);

  }, []);

  /* ---------------- MAP MOVEMENT ---------------- */

  const shoreCoords =
    districtRadar[boat.district] || [8.7642, 78.1348];

  const deepSeaCoords = [
    shoreCoords[0] - 0.15,
    shoreCoords[1] + 0.25
  ];

  const [progress, setProgress] = useState(0);
  const [speed, setSpeed] = useState(30);
  const [zone, setZone] = useState("Safe");
  const [dangerAlert, setDangerAlert] = useState(false);

  useEffect(() => {

    const interval = setInterval(() => {

      setProgress((prev) => {

        if (prev >= 1) return 1;

        const step =
          speed === 30 ? 0.02 :
          speed === 20 ? 0.01 :
          0.005;

        return prev + step;

      });

    }, 300);

    return () => clearInterval(interval);

  }, [speed]);

  /* ---------- MOVING BOAT ---------- */

  const currentLat =
    shoreCoords[0] +
    (deepSeaCoords[0] - shoreCoords[0]) * progress;

  const currentLng =
    shoreCoords[1] +
    (deepSeaCoords[1] - shoreCoords[1]) * progress;

  const currentPosition = [currentLat, currentLng];

  /* ---------------- STATIC SEA BOATS ---------------- */

  const seaBoats = [

    { name:"Ramesh", boatId:"TN RM 301", district:"Rameshwaram", position:[9.2881,79.3129]},
    { name:"Kumar", boatId:"TN NP 221", district:"Nagapattinam", position:[10.7669,79.8433]},
    { name:"Suresh", boatId:"TN CD 145", district:"Cuddalore", position:[11.7447,79.7680]},
    { name:"Arul", boatId:"TN KL 422", district:"Karaikal", position:[10.9157,79.8380]},
    { name:"Boat 12", boatId:"TN KK 889", district:"Kanyakumari", position:[8.0883,77.5385]},

    { name:"Kerala Boat 1", boatId:"KL KC 221", district:"Kochi", position:[9.9312,76.2673]},
    { name:"Kerala Boat 2", boatId:"KL KL 991", district:"Kollam", position:[8.8932,76.6141]},
    { name:"Kerala Boat 3", boatId:"KL AL 332", district:"Alappuzha", position:[9.4981,76.3388]},
    { name:"Kerala Boat 4", boatId:"KL KZ 112", district:"Kozhikode", position:[11.2588,75.7804]},
    { name:"Kerala Boat 5", boatId:"KL KP 444", district:"Kasargod", position:[12.4996,74.9869]},

    { name:"SL Boat 1", boatId:"SL CM 101", district:"Colombo", position:[6.9271,79.8612]},
    { name:"SL Boat 2", boatId:"SL JF 221", district:"Jaffna", position:[9.6615,80.0255]},
    { name:"SL Boat 3", boatId:"SL TR 992", district:"Trincomalee", position:[8.5874,81.2152]},

  ];

  /* ---------------- DISTANCE CALCULATION ---------------- */

  const calculateDistance = (lat1, lon1, lat2, lon2) => {

    const R = 6371;

    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;

  };

  const distance = calculateDistance(
    shoreCoords[0],
    shoreCoords[1],
    currentLat,
    currentLng
  );

  useEffect(() => {

    if (distance <= 20) {
      setZone("Safe");
      setSpeed(30);
      setDangerAlert(false);
    }

    else if (distance <= 35) {
      setZone("Near Danger");
      setSpeed(20);
      setDangerAlert(false);
    }

    else {
      setZone("Danger Zone");
      setSpeed(10);
      setDangerAlert(true);
    }

  }, [distance]);

  /* ---------------- SEA ZONES ---------------- */

  const createSeaZone = (center, radiusKm) => {

    const points = [];
    const earthRadius = 6371;

    for (let angle = 0; angle <= 180; angle += 5) {

      const bearing = (angle * Math.PI) / 180;

      const lat1 = (center[0] * Math.PI) / 180;
      const lon1 = (center[1] * Math.PI) / 180;

      const lat2 = Math.asin(
        Math.sin(lat1) * Math.cos(radiusKm / earthRadius) +
        Math.cos(lat1) *
        Math.sin(radiusKm / earthRadius) *
        Math.cos(bearing)
      );

      const lon2 =
        lon1 +
        Math.atan2(
          Math.sin(bearing) *
          Math.sin(radiusKm / earthRadius) *
          Math.cos(lat1),
          Math.cos(radiusKm / earthRadius) -
          Math.sin(lat1) * Math.sin(lat2)
        );

      points.push([lat2 * 180 / Math.PI, lon2 * 180 / Math.PI]);

    }

    return [center, ...points];

  };

  const safeZone = createSeaZone(shoreCoords, 20);
  const nearZone = createSeaZone(shoreCoords, 35);
  const dangerZone = createSeaZone(shoreCoords, 50);

  return (

    <div className="min-h-screen pt-24 px-10 bg-gradient-to-br from-[#2e1065] via-[#1e1b4b] to-black text-white">

      {dangerAlert && (
        <div className="mb-6 bg-gradient-to-r from-red-600 to-pink-600 p-4 rounded-xl text-center font-semibold animate-pulse shadow-lg">
          ⚠ You have entered Danger Zone. Engine will shut down if crossed further!
        </div>
      )}

      <h1 className="text-4xl font-bold mb-8">
        🌊 Live Fishermen Status
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <div className="lg:col-span-2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-4 shadow-xl ring-2 ring-cyan-400/40">

          <div className="h-[100%] rounded-xl overflow-hidden">

            <MapContainer center={shoreCoords} zoom={7} style={{ height: "100%", width: "100%" }}>

              <TileLayer
                attribution="&copy; CARTO & OpenStreetMap"
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                subdomains={["a","b","c","d"]}
              />

              <Polygon positions={dangerZone} pathOptions={{ color: "red", fillOpacity: 0.08 }} />
              <Polygon positions={nearZone} pathOptions={{ color: "orange", fillOpacity: 0.12 }} />
              <Polygon positions={safeZone} pathOptions={{ color: "green", fillOpacity: 0.18 }} />

              <Marker position={shoreCoords} icon={startIcon}>
                <Popup>{boat.district} Starting Point</Popup>
              </Marker>

              <Marker position={currentPosition} icon={shipEmojiIcon}>
                <Popup>{boat.boatId}</Popup>
              </Marker>

              <Polyline
                positions={[shoreCoords, currentPosition]}
                pathOptions={{ color: "cyan" }}
              />

              {seaBoats.map((vessel, index) => (
                <Marker key={index} position={vessel.position} icon={shipEmojiIcon}>
                  <Popup>
                    {vessel.name}
                    <br/>
                    {vessel.boatId}
                    <br/>
                    {vessel.district}
                  </Popup>
                </Marker>
              ))}

            </MapContainer>

          </div>

        </div>

        {/* RIGHT PANEL */}

        <div className="space-y-6">

          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl flex flex-col items-center">

            <div className="relative w-40 h-40">

              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-600"></div>

              <div className="absolute inset-3 bg-black rounded-full flex items-center justify-center">
                <span className="text-3xl font-bold">
                  {speed} NM
                </span>
              </div>

            </div>

            <p className="mt-4 text-white/70">
              Current Speed
            </p>

          </div>

          <div className={`p-6 rounded-2xl shadow-xl text-center ${
            zone === "Safe"
              ? "bg-green-500"
              : zone === "Near Danger"
              ? "bg-orange-500"
              : "bg-red-600"
          }`}>

            <p className="text-sm">Zone Status</p>
            <p className="text-2xl font-bold">{zone}</p>

          </div>

          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl">

            <p className="text-sm text-white/70 mb-2">Boat Details</p>

            <p><b>Name:</b> {boat.name}</p>
            <p><b>District:</b> {boat.district}</p>
            <p><b>ID:</b> {boat.boatId}</p>

          </div>

          <div
onClick={()=>setShowGraphs(true)}
className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl cursor-pointer hover:scale-105 transition">

            <p className="text-sm text-white/70 mb-3">Environment</p>

            <div className="grid grid-cols-2 gap-4 text-sm">

              <div>🌡 Temp <br /><b>{temperature}°C</b></div>
              <div>💨 Pressure <br /><b>{pressure} hPa</b></div>
              <div>💧 Humidity <br /><b>{humidity}%</b></div>
              <div>🌬 Wind <br /><b>{windSpeed} km/h</b></div>

            </div>

          </div>

        </div>

      </div>
      {showGraphs && (

<div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">

<div className="bg-[#111827] p-8 rounded-2xl w-[90%] max-w-6xl shadow-2xl border border-cyan-500/30">

{/* HEADER */}

<div className="flex justify-between items-center mb-6">

<h2 className="text-2xl font-bold text-cyan-400">
📊 Live Environment Analytics
</h2>

<button
onClick={()=>setShowGraphs(false)}
className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
>
Close
</button>

</div>

{/* GRAPHS */}

<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

<div className="bg-black rounded-xl p-3 border border-cyan-500/30">
<h3 className="text-sm text-cyan-300 mb-2">🌡 Temperature</h3>
<iframe
width="100%"
height="260"
src="https://thingspeak.com/channels/3289971/charts/1?bgcolor=%231f2937&color=%23ff0000&dynamic=true&type=line"
></iframe>
</div>

<div className="bg-black rounded-xl p-3 border border-cyan-500/30">
<h3 className="text-sm text-cyan-300 mb-2">💨 Pressure</h3>
<iframe
width="100%"
height="260"
src="https://thingspeak.com/channels/3289971/charts/2?bgcolor=%231f2937&color=%2300ffcc&dynamic=true&type=line"
></iframe>
</div>

<div className="bg-black rounded-xl p-3 border border-cyan-500/30">
<h3 className="text-sm text-cyan-300 mb-2">🌬 Wind Speed</h3>
<iframe
width="100%"
height="260"
src="https://thingspeak.com/channels/3289971/charts/3?bgcolor=%231f2937&color=%23ffaa00&dynamic=true&type=line"
></iframe>
</div>

<div className="bg-black rounded-xl p-3 border border-cyan-500/30">
<h3 className="text-sm text-cyan-300 mb-2">💧 Humidity</h3>
<iframe
width="100%"
height="260"
src="https://thingspeak.com/channels/3289971/charts/4?bgcolor=%231f2937&color=%239933ff&dynamic=true&type=line"
></iframe>
</div>

</div>

</div>

</div>

)}

    </div>

  );

};

export default LiveStatus;