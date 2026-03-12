const WorkingSection = () => {

  return (
    <section
      id="working"
      className="min-h-screen flex items-center justify-center
                 bg-gradient-to-b from-black via-gray-900 to-black
                 px-6 text-white"
    >

      <div className="max-w-7xl w-full grid md:grid-cols-2 gap-20 items-center">

        {/* LEFT SIDE BLOCK DIAGRAM */}

        <div className="flex flex-col items-center gap-6">

          <Block
            title="NAVIC GNSS Tracking"
            desc="Captures real-time boat location"
          />

          <Arrow />

          <Block
            title="Microcontroller Processing"
            desc="Arduino / ESP32 processes coordinates"
          />

          {/* SPLIT */}

          <div className="flex gap-14 items-start">

            {/* LEFT BRANCH */}

            <div className="flex flex-col items-center gap-6">

              <Arrow />

              <Block
                title="Geofence Detection"
                desc="Checks maritime border limits"
              />

              <Arrow />

              <Block
                title="Alert System"
                desc="Buzzer & LED warning"
              />

            </div>


            {/* RIGHT BRANCH */}

            <div className="flex flex-col items-center gap-6">

              <Arrow />

              <Block
                title="FRAM Data Logging"
                desc="Stores route data"
              />

              <Arrow />

              <Block
                title="GSM Communication"
                desc="SMS alerts to authorities"
              />

            </div>

          </div>

          <Arrow />

          <Block
            title="Automatic Speed Control"
            desc="Servo motor reduces throttle"
          />

        </div>



        {/* RIGHT SIDE TITLE + DESCRIPTION */}

        <div
          className="p-10 rounded-2xl
                     bg-white/5 backdrop-blur-xl
                     border border-cyan-400/20
                     shadow-[0_0_35px_rgba(0,255,255,0.15)]"
        >

          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">

            <span className="bg-gradient-to-r from-cyan-400 to-blue-500
                             bg-clip-text text-transparent">

              Working Mechanism

            </span>

          </h2>

          <p className="text-gray-300 leading-relaxed text-sm">

            The proposed maritime safety system integrates NAVIC GNSS
            tracking, geofence detection algorithms, alert mechanisms,
            and automated speed control to prevent fishermen from
            crossing international maritime boundaries. The system
            continuously monitors vessel location and triggers alerts
            whenever the vessel approaches restricted zones.

          </p>

        </div>

      </div>

    </section>
  );
};



/* BLOCK COMPONENT */

const Block = ({ title, desc }) => {

  return (

    <div
      className="w-48 p-3 text-center
                 rounded-lg
                 bg-white/5 backdrop-blur-lg
                 border border-cyan-400/20
                 shadow-md
                 hover:scale-105
                 hover:shadow-[0_0_20px_rgba(0,255,255,0.35)]
                 transition-all duration-300"
    >

      <h3 className="text-cyan-300 font-semibold text-sm mb-1">
        {title}
      </h3>

      <p className="text-gray-400 text-xs">
        {desc}
      </p>

    </div>

  );

};



/* ARROW */

const Arrow = () => {

  return (
    <div className="text-cyan-400 text-xl animate-pulse">
      ↓
    </div>
  );

};


export default WorkingSection;