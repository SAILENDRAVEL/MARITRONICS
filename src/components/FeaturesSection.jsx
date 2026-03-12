import centerImg from "../assets/center image.png";

const FeaturesSection = () => {
  return (
    <section
      id="features"
      className="relative min-h-screen flex items-center justify-center
                 bg-gradient-to-b from-[#021726] via-[#032c4a] to-[#021726]
                 text-white overflow-hidden px-6"
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,180,255,0.18),transparent_65%)]" />

      <div className="relative z-10 max-w-7xl w-full">

        {/* Heading */}
        <h2 className="text-center text-4xl md:text-5xl font-extrabold mb-20">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500
                           bg-clip-text text-transparent">
            Key Features
          </span>
        </h2>

        {/* Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14 items-center">

          {/* LEFT FEATURES */}
          <div className="space-y-12 text-right">
            <FeatureItem
              icon="📍"
              title="Real-Time Location Tracking"
              desc="Continuous tracking using NAVIC GNSS for accurate boat positioning."
              align="right"
            />
            <FeatureItem
              icon="🛡️"
              title="Predefined Geofence Limits"
              desc="Virtual maritime boundaries prevent accidental border crossing."
              align="right"
            />
            <FeatureItem
              icon="📨"
              title="Automatic SMS Alerts"
              desc="Instant alerts sent to family members and coastal authorities."
              align="right"
            />
          </div>

          {/* CENTER SQUARE IMAGE */}
          <div className="flex justify-center">

            <div
              className="w-100 h-100 rounded-2xl
                         bg-gradient-to-br from-cyan-400/20 to-blue-600/20
                         border border-cyan-400/40
                         backdrop-blur-xl shadow-2xl
                         flex items-center justify-center
                         hover:scale-105 transition duration-300"
            >

              <img
                src={centerImg}
                alt="System Features"
                className="w-65 h-60 object-contain"
              />

            </div>

          </div>

          {/* RIGHT FEATURES */}
          <div className="space-y-12 text-left">
            <FeatureItem
              icon="🚨"
              title="Multi-Level Alert System"
              desc="Buzzer and LED alerts warn fishermen before danger zones."
            />
            <FeatureItem
              icon="⚙️"
              title="Automatic Speed Control"
              desc="Servo motor reduces throttle automatically near borders."
            />
            <FeatureItem
              icon="💾"
              title="FRAM Data Logging"
              desc="Navigation routes and violations stored securely for review."
            />
          </div>

        </div>
      </div>
    </section>
  );
};


/* 🔹 Feature Item with hover glow */
const FeatureItem = ({ icon, title, desc, align = "left" }) => {
  return (
    <div
      className={`group flex gap-4 items-start
                  ${align === "right" ? "flex-row-reverse text-right" : ""}`}
    >
      {/* ICON */}
      <div
        className="w-12 h-12 flex items-center justify-center text-xl
                   rounded-xl bg-cyan-400/10 text-cyan-300
                   group-hover:bg-cyan-400/20
                   group-hover:shadow-[0_0_25px_rgba(0,255,255,0.6)]
                   transition-all duration-300"
      >
        {icon}
      </div>

      {/* TEXT */}
      <div className="group-hover:-translate-y-1 transition-all duration-300">
        <h3 className="text-xl font-semibold text-cyan-300 mb-2">
          {title}
        </h3>
        <p className="text-gray-300 max-w-sm leading-relaxed">
          {desc}
        </p>
      </div>
    </div>
  );
};

export default FeaturesSection;