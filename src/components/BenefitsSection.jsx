const BenefitsSection = () => {
  const benefits = [
    {
      icon: "⚡",
      title: "Faster Response",
      desc: "Instant alerts and real-time monitoring improve reaction time.",
    },
    {
      icon: "📊",
      title: "Better Tracking",
      desc: "Accurate GNSS-based tracking ensures vessel accountability.",
    },
    {
      icon: "🤝",
      title: "User Friendly",
      desc: "Simple alerts and automation reduce manual effort.",
    },
    {
      icon: "🛡️",
      title: "Enhanced Safety",
      desc: "Prevents accidental border crossing and risks.",
    },
    {
      icon: "💰",
      title: "Low Cost",
      desc: "Affordable solution suitable for small fishing boats.",
    },
  ];

  return (
    <section
      id="benefits"
      className="relative min-h-screen flex items-center justify-center
                 bg-gradient-to-b from-black via-gray-900 to-black
                 px-6 text-white"
    >
      <div className="max-w-7xl w-full text-center">

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500
                           bg-clip-text text-transparent">
            System Benefits
          </span>
        </h2>

        <p className="max-w-3xl mx-auto text-gray-400 mb-20">
          Our Border-Aware system improves safety, efficiency, and communication
          for fishermen operating at sea.
        </p>

        {/* Benefits Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-12">

          {benefits.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center
                         group transition-all duration-300"
            >
              {/* Icon circle */}
              <div
                className="w-24 h-24 flex items-center justify-center
                           rounded-full
                           bg-white/5 backdrop-blur-lg
                           border border-white/10
                           text-3xl
                           group-hover:bg-cyan-400/10
                           group-hover:shadow-[0_0_25px_rgba(0,255,255,0.35)]
                           transition-all duration-300"
              >
                {item.icon}
              </div>

              {/* Text */}
              <h3 className="mt-6 font-semibold text-lg">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-gray-400">
                {item.desc}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
