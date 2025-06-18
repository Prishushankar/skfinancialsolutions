import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const Hero = () => {
  const heroRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.5,
      },
    },
  };

  const graphLineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 2,
        ease: "easeInOut",
        delay: 0.3,
      },
    },
  };
  return (
    <div
      ref={heroRef}
      className="relative overflow-hidden bg-gradient-to-b from-white to-blue-50 min-h-[70vh] max-h-[80vh] border-b-4 border-blue-600"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <svg
          className="absolute w-full h-full opacity-60"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="rgba(46, 56, 242, 0.05)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Floating Particles */}
        {[...Array(30)].map((_, i) => {
          const size = Math.random() * 8 + 4;
          return (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: size,
                height: size,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor:
                  i % 3 === 0
                    ? "rgba(46, 56, 242, 0.2)"
                    : i % 3 === 1
                    ? "rgba(16, 185, 129, 0.2)"
                    : "rgba(99, 102, 241, 0.15)",
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 20 - 10, 0],
                scale: [1, Math.random() * 0.5 + 0.8, 1],
              }}
              transition={{
                duration: Math.random() * 3 + 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            />
          );
        })}
      </div>

      {/* Graph Lines */}
      <div className="absolute top-1/3 left-0 right-0 h-32 z-10 overflow-hidden">
        <motion.svg
          viewBox="0 0 1200 200"
          className="w-full h-full absolute"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        >
          <motion.path
            d="M0,150 C50,150 100,130 150,100 C200,80 250,120 300,110 C350,100 400,80 450,70 C500,60 550,90 600,80 C650,70 700,60 750,50 C800,40 850,30 900,25 C950,20 1000,10 1050,5 C1100,0 1150,5 1200,0"
            fill="none"
            stroke="rgba(16, 185, 129, 0.4)"
            strokeWidth="3"
            variants={graphLineVariants}
            initial="hidden"
            animate="visible"
          />
        </motion.svg>
      </div>

      {/* Main Content */}      <motion.section
        className="relative pt-20 pb-16 mb-12 px-6 lg:px-8 z-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <div className="max-w-5xl mx-auto text-center">
          {/* Floating Icons */}
          <div className="absolute inset-0 w-full max-w-6xl mx-auto pointer-events-none z-10">
            <motion.div
              className="absolute"
              style={{ top: "-15px", left: "5%" }}
              variants={iconVariants}
              animate={{
                y: [0, -15, 0],
                transition: {
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                },
              }}
            >
              <svg
                className="w-10 h-10 text-green-500 opacity-70"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="..." />
              </svg>
            </motion.div>
            <motion.div
              className="absolute"
              style={{ top: "40px", right: "10%" }}
              variants={iconVariants}
              animate={{
                y: [0, -12, 0],
                transition: {
                  duration: 3.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                },
              }}
            >
              <svg
                className="w-12 h-12 text-blue-500 opacity-70"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="..." />
              </svg>
            </motion.div>
          </div>

          {/* Badge */}
          <motion.div
            className="mb-8 inline-block"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white border-gray-200 border text-black text-md font-medium font-poppins shadow-md">
              <svg className="w-5 h-5 mr-2" fill="blue" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg >
              Let&apos;s Talk Growth
            </div>
          </motion.div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-800 tracking-tight leading-tight mt-4">
            Your Goals
            <span className="block text-primary">Our Strategy</span>
          </h1>

          {/* Subtext */}
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-6">
            We&apos;re a dedicated financial solutions firm that blends strategy,
            technology, and expertise to grow wealth and optimize financial
            performance.
          </p>

          {/* CTA */}
          <div className="mt-8">
            <button className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow font-semibold transition">
              Schedule Your Financial Growth
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Hero;
