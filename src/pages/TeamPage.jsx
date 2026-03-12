import member1 from "../assets/member1.jpg";
import member2 from "../assets/member2.jpg";
import member3 from "../assets/member3.jpg";
import guide from "../assets/guide.jpg";

const TeamPage = () => {

const team = [
{
name:"Praneet M S",
role:"IOT Developer",
image:member2,
linkedin:"https://www.linkedin.com/in/praneetms?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"   // replace with real link
},
{
name:"SAILENDRAVEL S",
role:"Software Developer",
image:member1,
linkedin:"https://www.linkedin.com/in/sailendravel-s-7764b1297?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" // replace with real link
},
{
name:"RAJKUMAR D",
role:"Embedded Developer",
image:member3,
linkedin:"https://www.linkedin.com/in/rajkumar-d-1a75ba29b?utm_source=share_via&utm_content=profile&utm_medium=member_android" // replace with real link
}
];

const guideInfo = {
name:"Mr. SRINIVASAN K",
role:"Project Supervisor",
image:guide,
linkedin:"https://www.linkedin.com/in/srinivasanenoch?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" // replace with guide linkedin
};

return(

<div className="min-h-screen pt-32 pb-20 bg-gradient-to-b from-[#020617] via-[#02142a] to-[#020617] text-white">

{/* TITLE */}

<h1 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
Our Research Team
</h1>


{/* TEAM MEMBERS */}

<div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 px-10">

{team.map((member,index)=>(

<div
key={index}
className="bg-white/5 border border-white/10 rounded-xl p-6 text-center hover:scale-105 transition shadow-xl backdrop-blur-lg"
>

<img
src={member.image}
className="w-40 h-40 rounded-full mx-auto mb-4 object-cover border border-cyan-400/30"
/>

<h2 className="text-xl font-semibold mb-1">
{member.name}
</h2>

<p className="text-gray-400 mb-4">
{member.role}
</p>


{/* LINKEDIN BUTTON */}

<a
href={member.linkedin}
target="_blank"
rel="noopener noreferrer"
className="inline-block px-6 py-2 rounded-full
           bg-gradient-to-r from-cyan-400 to-blue-500
           text-black font-semibold
           hover:scale-105 hover:shadow-[0_0_15px_rgba(0,255,255,0.6)]
           transition"
>

Connect

</a>

</div>

))}

</div>



{/* GUIDE TITLE */}

<h2 className="text-3xl font-bold text-center mt-20 mb-10">
Project Guide
</h2>


{/* GUIDE CARD */}

<div className="flex justify-center">

<div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center shadow-xl w-80 backdrop-blur-lg hover:scale-105 transition">

<img
src={guideInfo.image}
className="w-40 h-40 rounded-full mx-auto mb-4 object-cover border border-cyan-400/30"
/>

<h2 className="text-xl font-semibold mb-1">
{guideInfo.name}
</h2>

<p className="text-gray-400 mb-4">
{guideInfo.role}
</p>


<a
href={guideInfo.linkedin}
target="_blank"
rel="noopener noreferrer"
className="inline-block px-6 py-2 rounded-full
           bg-gradient-to-r from-cyan-400 to-blue-500
           text-black font-semibold
           hover:scale-105 hover:shadow-[0_0_15px_rgba(0,255,255,0.6)]
           transition"
>

Connect

</a>

</div>

</div>

</div>

);

};

export default TeamPage;