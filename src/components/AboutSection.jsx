import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import aboutImg from "../assets/About.png";

const AboutSection = () => {

const navigate = useNavigate();

const [research,setResearch]=useState(0);
const [prototypes,setPrototypes]=useState(0);
const [team,setTeam]=useState(0);

useEffect(()=>{

const interval=setInterval(()=>{

setResearch(prev => prev<1 ? prev+1 : 1);
setPrototypes(prev => prev<3 ? prev+1 : 3);
setTeam(prev => prev<3 ? prev+1 : 3); // ✅ Changed from 5 → 3

},400);

return ()=>clearInterval(interval);

},[]);

return(

<section
id="about"
className="relative pt-32 pb-28 text-white bg-gradient-to-b from-[#020617] via-[#02142a] to-[#020617]"
>

{/* Glow background */}

<div className="absolute top-20 left-0 w-72 h-72 bg-cyan-500/10 blur-[120px]"></div>
<div className="absolute bottom-20 right-0 w-72 h-72 bg-green-500/10 blur-[120px]"></div>

<div className="relative max-w-7xl mx-auto px-10 grid lg:grid-cols-2 gap-16 items-center">

{/* LEFT CONTENT */}

<div>

<h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
Autonomous Maritime Safety System
</h1>

<p className="text-gray-300 leading-relaxed mb-6">
Maritronics is an intelligent maritime safety platform designed to enhance
the protection of fishermen operating near international maritime boundaries.
The system integrates advanced GNSS positioning, geofencing algorithms,
and real-time alert mechanisms to prevent accidental border crossings.
</p>

<p className="text-gray-300 leading-relaxed mb-6">
Using NAVIC GNSS technology, the system continuously monitors the vessel's
location and compares it with predefined maritime boundaries. When a boat
approaches restricted zones, automated alerts are triggered through buzzers,
LEDs, and GSM communication modules to notify fishermen and authorities.
</p>

<p className="text-gray-300 leading-relaxed mb-10">
In addition to safety alerts, the system implements automated speed control
using servo motor mechanisms and stores route data through onboard memory
modules, ensuring improved maritime monitoring and enhanced safety for
fishing communities.
</p>

{/* STATS */}

<div className="grid grid-cols-3 gap-6 mb-10">

<div className="bg-white/5 border border-white/10 p-6 rounded-xl text-center hover:scale-105 transition shadow-lg">

<h2 className="text-green-400 text-3xl font-bold">{research}+</h2>
<p className="text-gray-400 text-sm mt-1">
Research Publications
</p>

</div>

<div className="bg-white/5 border border-white/10 p-6 rounded-xl text-center hover:scale-105 transition shadow-lg">

<h2 className="text-green-400 text-3xl font-bold">{prototypes}+</h2>
<p className="text-gray-400 text-sm mt-1">
System Prototypes Tested
</p>

</div>

<div className="bg-white/5 border border-white/10 p-6 rounded-xl text-center hover:scale-105 transition shadow-lg">

<h2 className="text-green-400 text-3xl font-bold">{team}</h2>
<p className="text-gray-400 text-sm mt-1">
Core Research Members
</p>

</div>

</div>

{/* BUTTONS */}

<div className="flex gap-6">

<button
onClick={()=>navigate("/work")}
className="px-8 py-3 rounded-full bg-gradient-to-r from-green-400 to-green-500 text-black font-semibold shadow-lg hover:shadow-green-400/40 transition transform hover:scale-105"
>

Discover Our Work

</button>

<button
onClick={()=>navigate("/team")}
className="px-8 py-3 rounded-full border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition transform hover:scale-105"
>

Meet Our Team

</button>

</div>

</div>


{/* RIGHT IMAGE */}

<div className="relative">

<img
src={aboutImg}
alt="Fishermen Safety System"
className="rounded-3xl shadow-2xl"
/>

{/* ACHIEVEMENTS CARD */}

<div
onClick={()=>navigate("/achievements")}
className="absolute bottom-4 left-4 backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl px-6 py-4 rounded-xl flex items-center gap-4 cursor-pointer hover:scale-105 transition"
>

<div className="bg-green-400/20 text-green-400 p-3 rounded-full text-xl">
🏆
</div>

<div>

<h4 className="font-semibold text-white">
Achievements
</h4>

<p className="text-sm text-gray-300">
Maritime Safety Innovation
</p>

</div>

</div>

</div>

</div>

</section>

);

};

export default AboutSection;