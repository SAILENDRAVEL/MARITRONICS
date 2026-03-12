import heroVideo from "../assets/hero-video.mp4";
import AboutSection from "../components/AboutSection";
import FeaturesSection from "../components/FeaturesSection";
import WorkingSection from "../components/WorkingSection";
import BenefitsSection from "../components/BenefitsSection";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate();

  return (
    <>
      {/* HOME / HERO */}
      <section
        id="home"
        className="relative min-h-screen flex items-center overflow-hidden"
      >
        {/* 🎥 VIDEO BACKGROUND */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
        />

        {/* dark overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* HERO CONTENT */}
        <div
          className="relative z-10 max-w-5xl text-white
                     ml-8 md:ml-24 mt-24 text-left"
        >
          <h1
            className="text-4xl md:text-6xl font-extrabold
                       leading-tight tracking-tight"
          >
            <span className="block">
              Fishermen Tracking and
            </span>

            <span
              className="block bg-gradient-to-r from-white via-gray-200 to-gray-300
                         bg-clip-text text-transparent mt-2"
            >
              Communication Systems
            </span>
          </h1>

          {/* accent line */}
          <div className="mt-6 w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></div>

          {/* subtitle */}
          <p className="mt-6 max-w-xl text-gray-200 text-lg leading-relaxed">
            Smart navigation, safety monitoring, and real-time communication
            design to protect fishermen at sea.
          </p>

          {/* BUTTONS */}
          <div className="mt-8 flex gap-6">

            {/* EXPLORE ISSUES BUTTON */}

            <button
              onClick={() => navigate("/issues")}
              className="px-6 py-3 rounded-xl
              bg-gradient-to-r from-cyan-400 to-blue-500
              text-white font-semibold
              shadow-lg
              hover:scale-105
              hover:shadow-[0_0_20px_rgba(0,200,255,0.8)]
              transition"
            >
              Explore Issues
            </button>

          </div>

        </div>
      </section>

      {/* OTHER SECTIONS – UNCHANGED */}
      <AboutSection />
      <FeaturesSection />
      <WorkingSection />
      <BenefitsSection />
    </>
  );
};

export default Home;