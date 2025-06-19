import { motion, useAnimation, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const About = () => {
  // Team members data - centered in the UI
  const teamMembers = [
    {
      id: 1,
      name: "Shankar Kumar",
      role: "Founder",
      description: "21+ years of experience as a trusted financial advisor | MDRT Achiever | Expert in Insurance, Wealth Management, and Retirement Planning | Guiding families and businesses toward long-term financial security",
      image:
        "/papaphoto1.png",
    },
  ];
  // Animation references
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
        duration: 0.8,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const leftItemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const rightItemVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const floatingIconVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    }
  };
  // Animation for staggered fade-in effects
  const fadeInStaggered = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  // Existing return statement
  return (    <motion.section
      ref={sectionRef}
      className="bg-gradient-to-b from-white to-gray-50 py-20 px-4 sm:px-6 lg:px-8 font-poppins relative overflow-hidden"
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,1), rgba(248,250,252,1))`,
        boxShadow: "inset 0 0 30px rgba(46, 56, 242, 0.03)"
      }}
    >{/* Enhanced professional background animations */}
      <motion.div
        className="absolute top-20 -right-20 w-72 h-72 bg-primary/5 rounded-full"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute bottom-20 -left-20 w-80 h-80 bg-primary/5 rounded-full"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 12,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1,
        }}
      />
      
      {/* Floating geometric elements */}
      <motion.div
        className="absolute top-1/4 left-10 w-16 h-16 border-2 border-primary/20 rounded-lg"
        animate={{
          rotate: [0, 45, 0],
          y: [0, -15, 0],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 15,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-10 w-12 h-12 border-2 border-accent/20 rounded-full"
        animate={{
          scale: [1, 1.1, 1],
          x: [0, 10, 0],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 18,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
          delay: 2,
        }}
      />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(#2e38f2 0.5px, transparent 0.5px)',
          backgroundSize: '24px 24px'
        }}
      />
      
      {/* Flowing line effect */}
      <svg className="absolute top-0 left-0 w-full h-full opacity-[0.04] pointer-events-none overflow-visible">
        <motion.path
          d="M0,80 Q250,60 500,80 T1000,100"
          fill="none"
          stroke="#2e38f2"
          strokeWidth="2"
          initial={{ pathLength: 0, pathOffset: 1 }}
          animate={{ 
            pathLength: 1,
            pathOffset: 0,
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 25, 
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop"
          }}
        />
        <motion.path
          d="M0,140 Q250,180 500,140 T1000,160"
          fill="none"
          stroke="#2e38f2"
          strokeWidth="1"
          initial={{ pathLength: 0, pathOffset: 1 }}
          animate={{ 
            pathLength: 1,
            pathOffset: 0,
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 20, 
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
            delay: 2
          }}
        />
      </svg>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div className="text-center mb-16" variants={headerVariants}>
          <motion.p
            className="text-primary text-lg font-medium uppercase tracking-wider mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            OUR TEAM
          </motion.p>
          <h4 className="text-4xl sm:text-4xl font-bold text-text-primary mb-6 relative inline-block">
            Meet the Visionaries Behind SK Financial Solutions
            <motion.span
              className="absolute bottom-0 left-0 w-full h-1 bg-primary/30"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.8, duration: 1, ease: "easeInOut" }}
            />
          </h4>
          <motion.p
            className="text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed"
            variants={fadeInUpVariants}
          >
            At SK Financial Solutions, our team of finance experts thrives on
            innovation.
            <br />
            We create solutions that meet needs and drive success.
          </motion.p>
        </motion.div>        {/* Team Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 max-w-4xl mx-auto">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              className="group cursor-pointer"
              variants={index % 2 === 0 ? leftItemVariants : rightItemVariants}              whileHover={{
                scale: 1.03,
                transition: { duration: 0.3 },
              }}
            >
              <div 
                className="relative h-auto rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 max-w-xl mx-auto"
              >
                {/* Image container */}
                <div className="relative pt-6 px-6 pb-0 bg-white">
                  <div className="overflow-hidden rounded-t-[2rem]">
                    {/* Actual image tag for better control */}
                    <motion.img
                      src={member.image}
                      alt={member.name}
                      className="w-auto mx-auto h-auto object-contain max-h-[380px] rounded-t-[2rem]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6 }}
                    />
                  </div>
                </div>
                
                {/* Content */}
                <div className="relative bg-gradient-to-t from-primary/90 to-primary/70 flex flex-col p-7 rounded-b-[2rem]">
                  {/* Text Content */}
                  <motion.div
                    className="text-white"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <motion.h3
                      className="text-2xl md:text-3xl font-bold mb-1 font-script"
                      whileHover={{ scale: 1.05, originX: 0 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {member.name}
                    </motion.h3>
                    <motion.p
                      className="text-lg md:text-xl font-semibold mb-2 text-white/90"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      {member.role}
                    </motion.p>
                    <motion.p
                      className="text-xs md:text-sm text-white/80 leading-relaxed"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      {member.description}
                    </motion.p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>        {/* CTA Section */}
        
        <motion.div
          className="text-center mt-16"
          variants={fadeInUpVariants}
        >
          <motion.p
            className="text-text-secondary mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
          >
            Want to join our team of visionaries?
          </motion.p>
          
          <Link to="/contact" onClick={() => window.scrollTo(0, 0)}>
            <motion.button
              className="bg-primary text-white hover:bg-primary/90 px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden relative"
              whileHover={{
                scale: 1.05,
                boxShadow:
                  "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.span
                className="absolute inset-0 bg-white/20"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
              View Open Positions
            </motion.button>
          </Link>
          
        </motion.div>
      
      </div>

      {/* Add floating financial icons - subtle professional touches */}
      <motion.div 
        className="absolute top-1/3 left-5 w-10 h-10 text-primary/20"
        variants={floatingIconVariants}
        animate={{
          y: [0, -15, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 1v3m0 16v3M4.22 4.22l2.12 2.12m11.32 11.32l2.12 2.12M1 12h3m16 0h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" />
          <circle cx="12" cy="12" r="7" />
        </svg>
      </motion.div>
      
      <motion.div 
        className="absolute bottom-1/4 right-10 w-12 h-12 text-accent/20"
        variants={floatingIconVariants}
        animate={{
          y: [0, 20, 0],
          rotate: [0, -15, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 19h16v2H4v-2zm5-4h11v2H9v-2zm-5-4h16v2H4v-2zm5-4h11v2H9V7zM4 3h16v2H4V3z" />
        </svg>
      </motion.div>
    </motion.section>
  );
};

export default About;