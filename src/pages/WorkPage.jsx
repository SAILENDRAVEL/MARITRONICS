import { useState, useEffect } from "react";

import work1 from "../assets/work1.jpg";
import work2 from "../assets/work2.jpg";
import work3 from "../assets/work3.jpg";
import work4 from "../assets/work4.jpg";
import work5 from "../assets/work5.jpg";
import work6 from "../assets/work6.jpg";

const WorkPage = () => {

const projects=[

{
img:work1,
title:"3D Design of Prototype",
desc:"Initial hardware prototype integrating GNSS and geofencing."
},

{
img:work2,
title:"Boat Installation 3D Animation",
desc:"Installation of the monitoring system inside the vessel."
},

{
img:work3,
title:"Navigation Monitoring",
desc:"Real-time GNSS tracking and maritime boundary monitoring."
},

{
img:work4,
title:"System Testing",
desc:"Testing geofence alerts and warning systems."
},

{
img:work5,
title:"Speed Control Module",
desc:"Servo motor automatic speed reduction near danger zones."
},

{
img:work6,
title:"Field Visit",
desc:"Internship at port authority for deployment knowledge."
}

];

const [selected,setSelected]=useState(null);
const [index,setIndex]=useState(0);
const [loading,setLoading]=useState(true);

/* skeleton loading */

useEffect(()=>{

setTimeout(()=>{

setLoading(false);

},800);

},[]);

/* keyboard navigation */

useEffect(()=>{

const handleKey=(e)=>{

if(!selected) return;

if(e.key==="ArrowRight") nextImage();
if(e.key==="ArrowLeft") prevImage();

};

window.addEventListener("keydown",handleKey);

return()=>window.removeEventListener("keydown",handleKey);

},[selected,index]);

const openViewer=(item,i)=>{

setSelected(item);
setIndex(i);

};

const nextImage=()=>{

const next=(index+1)%projects.length;

setIndex(next);
setSelected(projects[next]);

};

const prevImage=()=>{

const prev=(index-1+projects.length)%projects.length;

setIndex(prev);
setSelected(projects[prev]);

};

return(

<div className="min-h-screen pt-32 pb-24 bg-gradient-to-b from-[#020617] via-[#02142a] to-[#020617] text-white">

<h1 className="text-center text-5xl font-bold mb-20 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
Project Work Gallery
</h1>

<div className="max-w-7xl mx-auto px-10 grid md:grid-cols-3 gap-10">

{projects.map((item,i)=>(

<div
key={i}
onClick={()=>openViewer(item,i)}
className="group cursor-pointer rounded-2xl overflow-hidden border border-white/10 backdrop-blur-xl bg-white/5 shadow-xl hover:shadow-cyan-500/20 transition transform hover:scale-105 hover:-rotate-1"
>

{loading ? (

<div className="h-64 bg-gray-800 animate-pulse"></div>

):(

<img
src={item.img}
alt="project"
className="w-full h-64 object-cover group-hover:brightness-75 transition"
/>

)}

<div className="p-4">

<h3 className="font-semibold text-lg text-cyan-300">
{item.title}
</h3>

</div>

</div>

))}

</div>

{/* VIEWER */}

{selected &&(

<div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50">

<div className="relative max-w-5xl w-full p-6">

<button
onClick={()=>setSelected(null)}
className="absolute top-4 right-4 text-white text-3xl"
>
✕
</button>

{/* PREV */}

<button
onClick={prevImage}
className="absolute left-0 top-1/2 text-4xl px-4"
>
‹
</button>

{/* NEXT */}

<button
onClick={nextImage}
className="absolute right-0 top-1/2 text-4xl px-4"
>
›
</button>

<img
src={selected.img}
className="w-full rounded-xl shadow-2xl"
/>

<div className="mt-6 text-center">

<h2 className="text-3xl text-cyan-400 font-bold">
{selected.title}
</h2>

<p className="text-gray-300 mt-2">
{selected.desc}
</p>

</div>

</div>

</div>

)}

</div>

);

};

export default WorkPage;