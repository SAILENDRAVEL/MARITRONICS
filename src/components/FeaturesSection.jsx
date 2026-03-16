const FeaturesSection = () => {
  return (
    <section
      id="features"
      className="relative min-h-screen flex items-center justify-center
                 pt-28 pb-24 px-6 text-white
                 bg-gradient-to-b from-[#020617] via-[#02142a] to-[#020617]
                 overflow-hidden"
    >

      {/* Glow Effects */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-cyan-500/10 blur-[120px]"></div>
      <div className="absolute bottom-20 right-0 w-72 h-72 bg-blue-500/10 blur-[120px]"></div>

      <div className="relative max-w-7xl w-full">

        {/* Heading */}
        <h2 className="text-center text-4xl md:text-5xl font-extrabold mb-20
                       bg-gradient-to-r from-cyan-400 to-blue-500
                       bg-clip-text text-transparent">
          Key Features
        </h2>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-3 gap-8">

          <FeatureCard
            icon="📍"
            title="Real-time location tracking"
            desc="Continuous tracking using NAVIC GNSS for accurate boat positioning."
          />

          <FeatureCard
            icon="🛡️"
            title="Pre-programmed geofencing limits"
            desc="Virtual maritime boundaries prevent accidental border crossing."
          />

          <FeatureCard
            icon="🚨"
            title="Multi-step alert mechanism"
            desc="Buzzer and LED alerts warn fishermen before danger zones."
          />

          <FeatureCard
            icon="📨"
            title="Automatic SMS alerts"
            desc="Instant alerts sent to family members and coastal authorities."
          />

          <FeatureCard
            icon="⚙️"
            title="Servo-based throttle control"
            desc="Servo motor automatically reduces boat speed near borders."
          />

          <FeatureCard
            icon="💾"
            title="FRAM data logging"
            desc="Navigation routes and violations stored securely for review."
          />

          <FeatureCard
            icon="🔧"
            title="Manual reset & override"
            desc="Allows fishermen to reset the system during emergencies."
          />

        </div>

      </div>
    </section>
  );
};



/* Feature Card */

const FeatureCard = ({ icon, title, desc }) => {
  return (
    <div
      className="bg-white/5 border border-white/10
                 backdrop-blur-xl rounded-xl p-6
                 flex items-start gap-4
                 hover:scale-105 hover:border-cyan-400/40
                 hover:shadow-[0_0_25px_rgba(0,255,255,0.15)]
                 transition duration-300"
    >

      <div className="text-2xl text-cyan-400">
        {icon}
      </div>

      <div>
        <h3 className="font-semibold text-cyan-300 mb-1">
          {title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed">
          {desc}
        </p>
      </div>

    </div>
  );
};

export default FeaturesSection;