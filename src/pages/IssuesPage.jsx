import { useState } from "react";

import issue1 from "../assets/issue1.jpg";
import issue2 from "../assets/issue2.jpg";
import issue3 from "../assets/issue3.jpg";
import issue4 from "../assets/issue4.jpg";
import issue5 from "../assets/issue5.jpg";

const IssuesPage = () => {

const [selected,setSelected]=useState(null);

const issues=[

{
img:issue1,
title:"Border Crossing Risk",
desc:"Fishermen accidentally crossing international maritime boundaries due to lack of navigation awareness."
},

{
img:issue2,
title:"Communication Failure",
desc:"Lack of communication systems prevents fishermen from contacting coastal authorities during emergencies."
},

{
img:issue3,
title:"Navigation Difficulty",
desc:"Traditional fishing boats often operate without reliable GPS navigation systems."
},

{
img:issue4,
title:"Weather Uncertainty",
desc:"Sudden weather changes create dangerous situations for fishermen operating far from shore."
},

{
img:issue5,
title:"Safety Monitoring Absence",
desc:"No centralized system exists to monitor fishermen safety and vessel movement in real time."
}

];

return(

<div className="min-h-screen pt-32 pb-24
bg-gradient-to-b from-[#020617] via-[#02142a] to-[#020617]
text-white">

{/* PAGE TITLE */}

<h1 className="text-center text-4xl md:text-5xl font-bold mb-16
bg-gradient-to-r from-cyan-400 to-blue-500
bg-clip-text text-transparent">

Fishermen Issues

</h1>

{/* GRID */}

<div className="max-w-7xl mx-auto px-10 grid md:grid-cols-3 gap-10">

{issues.map((item,index)=>(

<div
key={index}
onClick={()=>setSelected(item)}
className="group relative cursor-pointer overflow-hidden
rounded-2xl border border-white/10
bg-white/5 backdrop-blur-xl
shadow-xl hover:scale-105
transition duration-300"
>

{/* IMAGE */}

<img
src={item.img}
alt="issue"
className="w-full h-64 object-cover
group-hover:brightness-75 transition"
/>

{/* GLOW EFFECT */}

<div className="absolute inset-0 bg-cyan-500/10 opacity-0
group-hover:opacity-100 transition"></div>

{/* TITLE */}

<div className="absolute bottom-0 left-0 right-0 p-4
bg-gradient-to-t from-black/80 to-transparent">

<h3 className="text-lg font-semibold">

{item.title}

</h3>

</div>

</div>

))}

</div>

{/* POPUP VIEWER */}

{selected &&(

<div className="fixed inset-0 bg-black/80 backdrop-blur-sm
flex items-center justify-center z-50">

<div className="relative max-w-4xl w-full p-6">

{/* CLOSE BUTTON */}

<button
onClick={()=>setSelected(null)}
className="absolute top-3 right-3 text-white text-2xl
hover:text-red-400"
>

✕

</button>

{/* IMAGE */}

<img
src={selected.img}
alt="preview"
className="w-full rounded-xl shadow-2xl"
/>

{/* DESCRIPTION */}

<div className="mt-6 text-center">

<h2 className="text-2xl font-bold text-cyan-400 mb-2">

{selected.title}

</h2>

<p className="text-gray-300">

{selected.desc}

</p>

</div>

</div>

</div>

)}

</div>

);

};

export default IssuesPage;