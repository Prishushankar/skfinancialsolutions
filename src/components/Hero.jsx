import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom"; // MODIFIED: Imported useNavigate

const Hero = () => {
  const navigate = useNavigate(); // MODIFIED: Added navigate hook

  // MODIFIED: This function decides whether to show the modal or navigate
  const handleNewsButtonClick = () => {
    // Always navigate to the /news page
    navigate('/news');
  };

  return (
    // The parent container needs to be relative for the absolute child to be positioned correctly
    <div className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50 to-blue-100 min-h-screen w-full pt-24 sm:pt-28 md:pt-32 gpu-accelerated" style={{ maxWidth: "100vw" }}>
      {/* Grid SVG Background */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none select-none gpu-accelerated">
        <svg
          className="w-full h-full opacity-20"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern id="fullGrid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(46,56,242,0.1)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#fullGrid)" />
        </svg>
      </div>

      {/* Centered "Let's Talk Growth" Badge */}
      <div className="relative z-10 w-full flex justify-center px-4 mt-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        >
          <div className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 text-black text-sm sm:text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <svg className="w-4 h-4 sm:w-6 sm:h-6 mr-2 sm:mr-3" fill="blue" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Let&apos;s Talk Growth
          </div>
        </motion.div>
      </div>

      {/* Centered Heading */}
      <div className="relative z-10 w-full flex justify-center mt-6 sm:mt-8 px-4">
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <span className="block">Your Goals.</span>
          <span className="text-blue-600 block bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent pb-2 pt-1 sm:pt-2">Our Strategy</span>
        </motion.h1>
      </div>

      {/* Centered Growth Graph */}
      <div className="relative z-10 w-full flex justify-center mt-6 md:-mt-4 lg:-mt-8 px-4">
        <motion.div
          className="w-full max-w-sm sm:max-w-2xl md:max-w-4xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        >
          <svg
            className="w-full h-auto"
            viewBox="0 0 110 45"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <pattern id="chartGrid" width="11" height="7" patternUnits="userSpaceOnUse">
                <path d="M 11 0 L 0 0 0 7" fill="none" stroke="rgba(46,56,242,0.15)" strokeWidth="0.6" />
              </pattern>
              <linearGradient id="chartFade" x1="0" y1="0" x2="0" y2="1">
                <stop stopColor="#10B981" stopOpacity="0.2" />
                <stop offset="1" stopColor="#10B981" stopOpacity="0" />
              </linearGradient>
            </defs>
            <rect width="110" height="45" fill="url(#chartGrid)" />
            <motion.path
              d="M8,37 L18,34 L28,36 L38,30 L48,26 L58,30 L68,23 L78,19 L88,17 L98,14 L108,12"
              fill="none"
              stroke="#10B981"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 3, ease: "easeInOut", delay: 1 }}
            />
            <motion.path
              d="M8,37 L18,34 L28,36 L38,30 L48,26 L58,30 L68,23 L78,19 L88,17 L98,14 L108,12 L108,45 L8,45 Z"
              fill="url(#chartFade)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 2 }}
            />
            <circle cx="8" cy="37" r="1.5" fill="#2563EB" />
            <circle cx="48" cy="26" r="1.5" fill="#10B981" />
            <circle cx="88" cy="17" r="1.5" fill="#10B981" />
            <g>
              <circle cx="106" cy="12" r="2.5" fill="#2563EB" />
              <text x="106" y="12.2" fontSize="3.2" fill="#fff" fontWeight="bold" textAnchor="middle" alignmentBaseline="middle">✓</text>
            </g>
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2.5 }}
            >
              <text x="104" y="8.5" fontSize="3" fill="#2563EB" fontWeight="bold" textAnchor="middle">Growth</text>
            </motion.g>
          </svg>
        </motion.div>
      </div>

      {/* Main Content & Buttons */}
      <section className="relative flex justify-center items-center px-4 sm:px-6 md:px-8 z-10 w-full mt-4 sm:mt-0">
        <div className="w-full max-w-lg sm:max-w-2xl flex flex-col justify-center items-center text-center space-y-6">
          <motion.p
            className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
          >
            We&apos;re a dedicated financial solutions firm that blends strategy, technology, and expertise to grow wealth and optimize financial performance.
          </motion.p>
          <motion.div
            className="flex flex-col gap-3 sm:flex-row sm:gap-4 justify-center w-full"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
          >
            <Link to="/contact" className="w-full sm:w-auto">
              <button className="group inline-flex items-center justify-center w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl shadow-xl font-semibold text-base transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95">
                <span>
Schedule a Session</span>
                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </Link>
            <motion.button
              className="group inline-flex items-center justify-center w-full sm:w-auto bg-white/90 backdrop-blur-sm border border-gray-300 shadow-lg hover:shadow-xl rounded-xl px-6 py-3 text-base font-semibold text-gray-800 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 transform hover:scale-105 active:scale-95"
              // MODIFIED: Updated onClick handler
              onClick={handleNewsButtonClick}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.1, ease: "easeOut" }}
            >
              <svg className="w-5 h-5 mr-2 text-red-600 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
                <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
              </svg>
              <span>Market Performance</span>
            </motion.button>
          </motion.div>
          {/* Added padding below the buttons */}
          <div className="pb-8"></div>
        </div>
      </section>

      {/* News Modal - MODIFIED FOR DESKTOP ONLY */}
      {/* Removed News Modal for desktop, always navigate to /news */}
    </div>
  );
};

export default Hero;