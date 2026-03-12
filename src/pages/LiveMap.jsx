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

/* 🚢 SHIP ICON */

const shipEmojiIcon = L.divIcon({
  html: "<div style='font-size:25px;'>🚢</div>",
  className: "ship-icon",
  iconSize: [34, 34],
});

/* 🔴 START POINT ICON */

const startIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const LiveMap = () => {

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) navigate("/login");
  }, []);

  /* ---------------- BOAT DETAILS ---------------- */

  const [boat, setBoat] = useState({
    name:"",
    district:"",
    boatId:""
  });

  useEffect(()=>{
    const storedBoat=sessionStorage.getItem("boatDetails");
    if(storedBoat) setBoat(JSON.parse(storedBoat));
  },[]);

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

  /* ---------------- MAIN BOAT MOVEMENT ---------------- */

  const [progress,setProgress]=useState(0);
  const [speed,setSpeed]=useState(30);
  const [zone,setZone]=useState("Safe");
  const [dangerAlert,setDangerAlert]=useState(false);

  useEffect(()=>{

    const interval=setInterval(()=>{

      setProgress(prev=>{

        if(prev>=1) return 1;

        const step=
        speed===30?0.02:
        speed===20?0.01:
        0.005;

        return prev+step;

      });

    },300);

    return ()=>clearInterval(interval);

  },[speed]);

  /* ---------- CURRENT POSITION ---------- */

  const currentLat =
    shoreCoords[0] +
    (deepSeaCoords[0] - shoreCoords[0]) * progress;

  const currentLng =
    shoreCoords[1] +
    (deepSeaCoords[1] - shoreCoords[1]) * progress;

  const currentPosition=[currentLat,currentLng];

  /* ---------------- OTHER VESSELS ---------------- */

  const [seaBoats, setSeaBoats] = useState([

    { name:"Ramesh", boatId:"TN RM 301", district:"Rameshwaram", position:[9.2881,79.3129]},
    { name:"Kumar", boatId:"TN NP 221", district:"Nagapattinam", position:[10.7669,79.8433]},
    { name:"Suresh", boatId:"TN CD 145", district:"Cuddalore", position:[11.7447,79.7680]},
    { name:"Arul", boatId:"TN KL 422", district:"Karaikal", position:[10.9157,79.8380]},
    { name:"Boat 12", boatId:"TN KK 889", district:"Kanyakumari", position:[8.0883,77.5385]},

    { name:"Kerala Boat 1", boatId:"KL KC 221", district:"Kochi", position:[9.9312,76.2673]},
    { name:"Kerala Boat 2", boatId:"KL KL 991", district:"Kollam", position:[8.8932,76.6141]},
    { name:"Kerala Boat 3", boatId:"KL AL 332", district:"Alappuzha", position:[9.4981,76.3388]},
    { name:"Kerala Boat 4", boatId:"KL KZ 112", district:"Kozhikode", position:[11.2588,75.7804]},
    { name:"Kerala Boat 5", boatId:"KL KP 444", district:"Kasargod", position:[12.4996,74.9869]}

  ]);

  const vesselCount = seaBoats.length + 1;

  /* ---------------- AIS RANDOM MOVEMENT ---------------- */

  useEffect(()=>{

    const interval=setInterval(()=>{

      setSeaBoats(prevBoats=>

        prevBoats.map(vessel=>{

          const latShift=(Math.random()-0.5)*0.02;
          const lngShift=(Math.random()-0.5)*0.02;

          return{

            ...vessel,
            position:[
              vessel.position[0]+latShift,
              vessel.position[1]+lngShift
            ]

          };

        })

      );

    },3000);

    return ()=>clearInterval(interval);

  },[]);

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

  useEffect(()=>{

    if(distance<=20){
      setZone("Safe");
      setSpeed(30);
      setDangerAlert(false);
    }

    else if(distance<=35){
      setZone("Near Danger");
      setSpeed(20);
    }

    else{
      setZone("Danger Zone");
      setSpeed(10);
      setDangerAlert(true);
    }

  },[distance]);

  /* ---------------- SEA ZONES ---------------- */

  const createSeaZone=(center,radiusKm)=>{

    const points=[];
    const earthRadius=6371;

    for(let angle=0;angle<=180;angle+=5){

      const bearing=(angle*Math.PI)/180;

      const lat1=(center[0]*Math.PI)/180;
      const lon1=(center[1]*Math.PI)/180;

      const lat2=Math.asin(
      Math.sin(lat1)*Math.cos(radiusKm/earthRadius)+
      Math.cos(lat1)*Math.sin(radiusKm/earthRadius)*Math.cos(bearing)
      );

      const lon2=
      lon1+
      Math.atan2(
      Math.sin(bearing)*Math.sin(radiusKm/earthRadius)*Math.cos(lat1),
      Math.cos(radiusKm/earthRadius)-Math.sin(lat1)*Math.sin(lat2)
      );

      points.push([lat2*180/Math.PI,lon2*180/Math.PI]);

    }

    return [center,...points];

  };

  const safeZone=createSeaZone(shoreCoords,20);
  const nearZone=createSeaZone(shoreCoords,35);
  const dangerZone=createSeaZone(shoreCoords,50);

  return(

  <div className="min-h-screen pt-24 bg-black text-white relative">

  {/* TELEMETRY PANEL */}

  <div className="absolute top-28 left-6 bg-black/80 backdrop-blur-xl p-5 rounded-xl border border-cyan-400 shadow-lg z-[1000]">

  <h3 className="text-cyan-400 font-semibold mb-2">📡 Telemetry</h3>

  <p>Boat: {boat.name}</p>
  <p>ID: {boat.boatId}</p>
  <p>Zone: {zone}</p>
  <p>Speed: {speed} NM</p>

  <hr className="my-2 border-cyan-500/30"/>

  <p className="text-green-400 font-semibold">
  🚢 Active Vessels: {vesselCount}
  </p>

  </div>

  {/* PREMIUM OPEN DASHBOARD BUTTON */}

  <button
  onClick={()=>navigate("/live-dashboard")}
  className="absolute top-28 right-10 flex items-center gap-2 px-7 py-3
  bg-gradient-to-r from-cyan-400 to-blue-500
  hover:from-cyan-300 hover:to-blue-400
  text-black font-semibold rounded-xl shadow-lg
  transition-all duration-300 hover:scale-105
  z-[1000]"
  >
  📊 Open Dashboard
  </button>

  <MapContainer
  center={shoreCoords}
  zoom={7}
  style={{height:"90vh",width:"100%"}}>

  <TileLayer
  attribution="&copy; CARTO & OpenStreetMap"
  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
  />

  <Polygon positions={dangerZone} pathOptions={{color:"red"}}/>
  <Polygon positions={nearZone} pathOptions={{color:"orange"}}/>
  <Polygon positions={safeZone} pathOptions={{color:"green"}}/>

  <Marker position={shoreCoords} icon={startIcon}>
  <Popup>{boat.district} Start</Popup>
  </Marker>

  <Marker position={currentPosition} icon={shipEmojiIcon}>
  <Popup>{boat.boatId}</Popup>
  </Marker>

  <Polyline
  positions={[shoreCoords,currentPosition]}
  pathOptions={{color:"cyan"}}
  />

  {seaBoats.map((vessel,index)=>(
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

  );

};

export default LiveMap;