import ServiceCard from "./ServiceCard";
import { motion } from "framer-motion";

const Services = () => {  const mainServices = [
    {
      title: "Mutual Funds",
      icon: (
        <svg 
          className="w-8 h-8" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 12V17C20 18.1046 19.1046 19 18 19H6C4.89543 19 4 18.1046 4 17V12M12 10L12 3M12 3L16 7M12 3L8 7"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      ),
      description: "Diverse investment options for wealth growth."
    },
    {
      title: "Insurance",
      icon: (
        <svg 
          className="w-8 h-8" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
            stroke="currentColor" 
            strokeWidth="1.5" 
            fill="none" 
          />
          <path
            d="M12 8V12L14.5 14.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M7 6.5C8.5 5.5 10.2 5 12 5C13.8 5 15.5 5.5 17 6.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      ),
      description: "Protection plans for life and assets."
    },
    {
      title: "Loan",
      icon: (
        <svg 
          className="w-8 h-8" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 8L5 12L9 16M15 8L19 12L15 16"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      ),
      description: "Competitive rates with flexible terms."
    },
  ];
    // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 70,
        duration: 0.5
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6 
      }
    }
  };
  
  return (    <section id="services" className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Professional finance background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 opacity-90">
        {/* Financial abstract pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
              <pattern id="chart" x="10" y="10" width="120" height="120" patternUnits="userSpaceOnUse">
                <path d="M10 40 L30 20 L60 50 L90 30 L120 60" fill="none" stroke="white" strokeWidth="2"/>
                <circle cx="30" cy="20" r="3" fill="white"/>
                <circle cx="60" cy="50" r="3" fill="white"/>
                <circle cx="90" cy="30" r="3" fill="white"/>
              </pattern>
              {/* Stock chart pattern */}
              <pattern id="stockChart" x="0" y="0" width="200" height="100" patternUnits="userSpaceOnUse">
                <path d="M0 70 L20 65 L40 80 L60 75 L80 60 L100 50 L120 55 L140 35 L160 40 L180 20 L200 30" 
                      fill="none" stroke="white" strokeWidth="1.5" opacity="0.7"/>
                <path d="M0 80 L20 85 L40 75 L60 90 L80 85 L100 80 L120 85 L140 70 L160 75 L180 60 L200 70" 
                      fill="none" stroke="white" strokeWidth="1.5" opacity="0.7"/>
                {/* Candlestick pattern */}
                <rect x="20" y="50" width="4" height="10" fill="white" opacity="0.5"/>
                <rect x="60" y="60" width="4" height="15" fill="white" opacity="0.5"/>
                <rect x="100" y="45" width="4" height="10" fill="white" opacity="0.5"/>
                <rect x="140" y="30" width="4" height="8" fill="white" opacity="0.5"/>
                <rect x="180" y="15" width="4" height="12" fill="white" opacity="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <rect width="100%" height="100%" fill="url(#chart)" opacity="0.5" />
            <rect width="100%" height="100%" fill="url(#stockChart)" opacity="0.3" />
          </svg>
        </div>
        
        {/* Animated gradient overlay for dynamic effect */}
        <motion.div 
          className="absolute inset-0 opacity-30"
          animate={{ 
            background: [
              'linear-gradient(45deg, rgba(59,130,246,0.3) 0%, rgba(79,70,229,0.3) 50%, rgba(147,51,234,0.3) 100%)',
              'linear-gradient(45deg, rgba(79,70,229,0.3) 0%, rgba(147,51,234,0.3) 50%, rgba(59,130,246,0.3) 100%)',
              'linear-gradient(45deg, rgba(147,51,234,0.3) 0%, rgba(59,130,246,0.3) 50%, rgba(79,70,229,0.3) 100%)',
            ]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 15,
            ease: "linear" 
          }}
        />
      </div>

      <div className="relative max-w-7xl px-4 mx-auto">        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={titleVariants}
        >
          {/* Small decorative element above title */}
          <motion.div 
            className="flex justify-center items-center mb-5"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="w-2 h-2 rounded-full bg-yellow-400 mx-1"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-300 mx-1"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-400 mx-1"></div>
          </motion.div>
          
          <h2 className="text-5xl font-bold text-white mb-4">
            Our Services
            <span className="text-yellow-400"></span>
          </h2>
          
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-amber-500 mx-auto mb-8 rounded-full"></div>
          
          <p className="text-blue-100 max-w-3xl mx-auto text-lg leading-relaxed">
            Explore our comprehensive range of financial services designed to help you 
            <span className="text-yellow-300 font-semibold"> achieve your financial goals</span> and secure your future.
          </p>
          
          {/* Small decorative financial icons */}
          <div className="flex justify-center mt-8 space-x-12">
            <motion.div 
              className="text-blue-200 opacity-70"
              whileHover={{ scale: 1.2, color: "#FBBF24" }}
            >
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </motion.div>
            <motion.div 
              className="text-blue-200 opacity-70"
              whileHover={{ scale: 1.2, color: "#FBBF24" }}
            >
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </motion.div>
            <motion.div 
              className="text-blue-200 opacity-70"
              whileHover={{ scale: 1.2, color: "#FBBF24" }}
            >
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </motion.div>
          </div>
        </motion.div>

        {/* Main Services - Three cards with navigation */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {mainServices.map((service, index) => (
            <motion.div
              key={`service-${index}`}
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <ServiceCard
                title={service.title}
                icon={service.icon}
                description={service.description}
                category={service.title.toLowerCase()}
                showExplore={true}
                showContact={false}
              />
            </motion.div>
          ))}
        </motion.div>
        
        {/* Animated floating elements */}
        <div className="hidden md:block">
          <motion.div 
            className="absolute top-20 left-10 w-16 h-16 rounded-full bg-blue-400 opacity-20"
            animate={{ 
              y: [0, 20, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 5,
              ease: "easeInOut" 
            }}
          />
          <motion.div 
            className="absolute bottom-20 right-10 w-24 h-24 rounded-full bg-indigo-500 opacity-20"
            animate={{ 
              y: [0, -30, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 7,
              ease: "easeInOut" 
            }}
          />
          <motion.div 
            className="absolute top-40 right-20 w-12 h-12 rounded-full bg-yellow-400 opacity-20"
            animate={{ 
              y: [0, 15, 0],
              x: [0, 15, 0],
              scale: [1, 1.3, 1]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 9,
              ease: "easeInOut" 
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Services;
