import { useState, useEffect } from "react";

import ach1 from "../assets/ach1.jpg";
import ach2 from "../assets/ach2.jpg";
import ach3 from "../assets/ach3.jpg";
import ach4 from "../assets/ach4.jpg";
import ach5 from "../assets/ach5.jpg";

const AchievementsPage = () => {

const achievements=[

{
img:ach1,
title:"IEEE Research Paper",
desc:"Research paper submitted under IEEE conference category."
},

{
img:ach2,
title:"Patent Publication",
desc:"Patent application published for maritime safety system."
},

{
img:ach3,
title:"Innovation Recognition",
desc:"Recognized as innovative safety solution."
},

{
img:ach4,
title:"Prototype Completion",
desc:"Hardware prototype integrating GNSS and GSM."
},

{
img:ach5,
title:"Technical Presentation",
desc:"Project presentation showcasing architecture."
}

];

const [selected,setSelected]=useState(null);
const [index,setIndex]=useState(0);
const [loading,setLoading]=useState(true);

useEffect(()=>{

setTimeout(()=>{

setLoading(false);

},800);

},[]);

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

const next=(index+1)%achievements.length;

setIndex(next);
setSelected(achievements[next]);

};

const prevImage=()=>{

const prev=(index-1+achievements.length)%achievements.length;

setIndex(prev);
setSelected(achievements[prev]);

};

return(

<div className="min-h-screen pt-32 pb-24 bg-gradient-to-b from-[#020617] via-[#02142a] to-[#020617] text-white">

<h1 className="text-center text-5xl font-bold mb-20 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
Project Achievements
</h1>

<div className="max-w-7xl mx-auto px-10 grid md:grid-cols-3 gap-10">

{achievements.map((item,i)=>(

<div
key={i}
onClick={()=>openViewer(item,i)}
className="group cursor-pointer rounded-2xl overflow-hidden border border-white/10 backdrop-blur-xl bg-white/5 shadow-xl hover:shadow-green-500/20 transition transform hover:scale-105 hover:-rotate-1"
>

{loading ? (

<div className="h-64 bg-gray-800 animate-pulse"></div>

):(

<img
src={item.img}
alt="achievement"
className="w-full h-64 object-cover group-hover:brightness-75 transition"
/>

)}

<div className="p-4">

<h3 className="font-semibold text-lg text-green-300">
{item.title}
</h3>

</div>

</div>

))}

</div>

{selected &&(

<div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50">

<div className="relative max-w-5xl w-full p-6">

<button
onClick={()=>setSelected(null)}
className="absolute top-4 right-4 text-white text-3xl"
>
✕
</button>

<button
onClick={prevImage}
className="absolute left-0 top-1/2 text-4xl px-4"
>
‹
</button>

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

<h2 className="text-3xl text-green-400 font-bold">
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

export default AchievementsPage;