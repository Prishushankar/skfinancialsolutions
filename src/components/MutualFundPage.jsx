import { Link, useNavigate } from "react-router-dom";
import ServiceCard from "./ServiceCard";
import { motion } from "framer-motion";
import { useState } from "react";
import SIPCalculator from "./SIPCalculator";
import MutualFundCalculator from "./MutualFundCalculator";

const MutualFundPage = () => {
  const [showSIPCalculator, setShowSIPCalculator] = useState(false);
  const [showMutualFundCalculator, setShowMutualFundCalculator] = useState(false);
  const [selectedFundType, setSelectedFundType] = useState("Equity");const mutualFundServices = [    {
      title: "SIP Investments",
      icon: (
        <svg 
          className="w-6 h-6" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.75 4.25L19.25 9.25V19.25H4.75V9.25L11.25 4.25L12 3.75L12.75 4.25Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M9 14.25H15"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M9 17.25H15"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M19.25 9.25H4.75"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M8 9.25V4.25"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M16 9.25V4.25"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      ),
      special: true,
      description: "Calculate your wealth growth with our SIP calculator"
    },
    {
      title: "Equity Mutual Funds",
      icon: (
        <svg 
          className="w-6 h-6" 
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
    },
    {
      title: "Debt Mutual Funds",
      icon: (
        <svg 
          className="w-6 h-6" 
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
            d="M12 7.01L12.01 6.99889"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M11 11H12V16H13"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      ),
    },
    {
      title: "Hybrid Mutual Funds",
      icon: (
        <svg 
          className="w-6 h-6" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 9H21M9 21V9M5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      ),
    },
    {
      title: "Index Funds",
      icon: (
        <svg 
          className="w-6 h-6" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 16H12M12 16H8M12 16V8M7 7H5C3.89543 7 3 7.89543 3 9V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V9C21 7.89543 20.1046 7 19 7H17M7 7V3.6C7 3.26863 7.26863 3 7.6 3H16.4C16.7314 3 17 3.26863 17 3.6V7M7 7H17"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      ),
    },
    {
      title: "ELSS Funds",
      icon: (
        <svg 
          className="w-6 h-6" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M16 3.13C16.8604 3.3503 17.623 3.8507 18.1676 4.55231C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      ),
    },
    {
      title: "Liquid Funds",
      icon: (
        <svg 
          className="w-6 h-6" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M5 12H3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M21 12H19"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M12 5V3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M12 21V19"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      ),
    },
  ];
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.2,
        duration: 0.8 
      } 
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const cardContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.03,
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
      transition: {
        duration: 0.3
      }
    }
  };  
  return (
    <div className="overflow-hidden">
      {/* SIP Calculator Modal */}
      {showSIPCalculator && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setShowSIPCalculator(false)}
          ></div>
          <div className="relative z-10 w-full max-w-6xl mx-auto">
            <SIPCalculator onClose={() => setShowSIPCalculator(false)} />
          </div>
        </div>
      )}

      {/* Mutual Fund Calculator Modal */}
      {showMutualFundCalculator && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setShowMutualFundCalculator(false)}
          ></div>
          <div className="relative z-10 w-full max-w-6xl mx-auto">
            <MutualFundCalculator 
              onClose={() => setShowMutualFundCalculator(false)} 
              fundType={selectedFundType}
            />
          </div>
        </div>
      )}
      {/* Hero Section with Financial Background */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="py-20 relative bg-gradient-to-r from-blue-900 to-indigo-800"
      >
        {/* Animated Background Elements - Abstract Financial Patterns */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 w-full h-full opacity-10"
            animate={{ 
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{ 
              duration: 20,
              ease: "linear",
              repeat: Infinity,
              repeatType: "reverse"
            }}
            style={{
              backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.4\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
              backgroundSize: "60px 60px",
            }}
          />
          {/* Stock Chart Line Animation */}
          <svg className="absolute bottom-0 left-0 w-full h-24 opacity-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <motion.path 
              fill="none" 
              stroke="white" 
              strokeWidth="8"
              d="M0,192L48,176C96,160,192,128,288,138.7C384,149,480,203,576,213.3C672,224,768,192,864,176C960,160,1056,160,1152,160C1248,160,1344,160,1392,160L1440,160"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-6"
          >
            Mutual Fund Solutions
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex justify-center mt-4"
          >
            <Link to="/" className="text-white hover:text-blue-200 transition duration-300">
              Home
            </Link>
            <span className="text-blue-200 mx-2">/</span>
            <span className="text-blue-200">Mutual Funds</span>
          </motion.div>
          
          {/* Visual elements to enhance financial theme */}
          <motion.div 
            className="flex justify-center mt-8 space-x-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-200">15%+</div>
              <div className="text-sm text-blue-100 uppercase tracking-wider">Potential Returns</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-200">₹500</div>
              <div className="text-sm text-blue-100 uppercase tracking-wider">Min Investment</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-200">20+</div>
              <div className="text-sm text-blue-100 uppercase tracking-wider">Fund Options</div>
            </div>
          </motion.div>
        </div>      </motion.div>

      {/* Growing Graph Animation Section */}
      <div className="relative bg-white py-12 overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">
              Watch Your Investments <span className="text-green-600">Grow</span> Over Time
            </h2>
            
            <div className="relative h-64 sm:h-80 md:h-96 bg-white rounded-lg shadow-lg p-4 border border-gray-100">
              {/* Graph Container */}
              <div className="absolute bottom-12 left-0 right-0 top-4 px-4">
                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-between text-xs text-gray-500">
                  <div>₹50L</div>
                  <div>₹40L</div>
                  <div>₹30L</div>
                  <div>₹20L</div>
                  <div>₹10L</div>
                  <div>₹0</div>
                </div>
                
                {/* X-axis */}
                <div className="absolute bottom-0 left-16 right-4 h-px bg-gray-300"></div>
                
                {/* X-axis labels */}
                <div className="absolute bottom-[-20px] left-16 right-4 flex justify-between text-xs text-gray-500">
                  <div>Start</div>
                  <div>5 Yrs</div>
                  <div>10 Yrs</div>
                  <div>15 Yrs</div>
                  <div>20 Yrs</div>
                  <div>25 Yrs</div>
                </div>
                
                {/* Horizontal grid lines */}
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <div 
                    key={`grid-${i}`} 
                    className="absolute h-px bg-gray-100 left-16 right-4" 
                    style={{ bottom: `${i * 20}%` }}
                  ></div>
                ))}
                
                {/* Animated Green Line - SIP Investment Growth */}
                <motion.svg 
                  className="absolute left-16 bottom-0 right-4 h-full"
                  viewBox="0 0 1000 500" 
                  preserveAspectRatio="none"
                >
                  <motion.path
                    d="M0,500 C50,480 100,450 150,400 S250,300 300,250 S400,150 450,120 S550,80 600,60 S700,30 750,20 S850,10 900,5 L900,500 L0,500 Z"
                    fill="rgba(16, 185, 129, 0.1)"
                    stroke="#10b981"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                  />
                </motion.svg>
                
                {/* Animated Blue Line - Lump Sum Investment */}
                <motion.svg 
                  className="absolute left-16 bottom-0 right-4 h-full"
                  viewBox="0 0 1000 500" 
                  preserveAspectRatio="none"
                >
                  <motion.path
                    d="M0,500 C50,490 100,480 150,465 S250,430 300,410 S400,380 450,350 S550,300 600,250 S700,200 750,170 S850,150 900,140 L900,500 L0,500 Z"
                    fill="rgba(59, 130, 246, 0.05)"
                    stroke="#3b82f6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="5,5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 2.5, delay: 0.5, ease: "easeInOut" }}
                  />
                </motion.svg>
                
                {/* Animated Orange Line - Fixed Deposit */}
                <motion.svg 
                  className="absolute left-16 bottom-0 right-4 h-full"
                  viewBox="0 0 1000 500" 
                  preserveAspectRatio="none"
                >
                  <motion.path
                    d="M0,500 C50,495 100,490 150,485 S250,478 300,472 S400,465 450,455 S550,445 600,435 S700,428 750,420 S850,415 900,410 L900,500 L0,500 Z"
                    fill="rgba(249, 115, 22, 0.05)"
                    stroke="#f97316"
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 1.5, delay: 1, ease: "easeInOut" }}
                  />
                </motion.svg>
                
                {/* Value markers - animated dots on green line */}
                {[150, 300, 450, 600, 750, 900].map((xPos, i) => (
                  <motion.div
                    key={`marker-${i}`}
                    className="absolute w-3 h-3 bg-green-500 rounded-full shadow-md flex items-center justify-center"
                    style={{ 
                      left: `${(xPos / 900) * 100}%`,
                      bottom: `${[0, 20, 30, 38, 42, 45][i]}%`,
                      transform: 'translate(-50%, 50%)'
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ delay: 1.8 + (i * 0.1), duration: 0.4 }}
                  >
                    {i === 5 && (
                      <motion.div 
                        className="absolute top-[-40px] left-[-35px] bg-green-600 text-white px-2 py-1 rounded text-xs font-medium whitespace-nowrap"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{ delay: 2.5, duration: 0.3 }}
                      >
                        ₹48.7L
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
              
              {/* Legend */}
              <div className="absolute bottom-0 left-16 right-4 flex justify-center space-x-6 text-xs mb-[-24px]">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
                  <span>SIP Investment</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
                  <span>Lump Sum</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-orange-500 rounded-full mr-1"></div>
                  <span>Fixed Deposit</span>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <motion.p 
                className="text-gray-600 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                Mutual funds offer the potential for higher returns compared to traditional savings options. 
                Start your investment journey today with as little as ₹500 per month.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>

      <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-50">
        <motion.div 
          className="container mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
              <motion.div 
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mb-12 sm:mb-16"
            variants={cardContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >{mutualFundServices.map((service, index) => (              <motion.div
                key={`mutual-fund-${index}`}
                variants={cardVariants}
                whileHover="hover"
                onClick={() => {
                  if (service.special) {
                    setShowSIPCalculator(true);
                  } else {
                    // Handle different mutual fund types
                    switch(service.title) {
                      case "Equity Mutual Funds":
                        setSelectedFundType("Equity");
                        setShowMutualFundCalculator(true);
                        break;
                      case "Debt Mutual Funds":
                        setSelectedFundType("Debt");
                        setShowMutualFundCalculator(true);
                        break;
                      case "Hybrid Mutual Funds":
                        setSelectedFundType("Hybrid");
                        setShowMutualFundCalculator(true);
                        break;
                      case "Index Funds":
                        setSelectedFundType("Index");
                        setShowMutualFundCalculator(true);
                        break;
                      case "ELSS Funds":
                        setSelectedFundType("ELSS"); // Now using dedicated ELSS type
                        setShowMutualFundCalculator(true);
                        break;
                      case "Liquid Funds":
                        setSelectedFundType("Liquid"); // Now using dedicated Liquid type
                        setShowMutualFundCalculator(true);
                        break;
                      default:
                        // Do nothing for other card types
                        break;
                    }
                  }
                }}
              >
                <ServiceCard
                  title={service.title}
                  icon={service.icon}
                  description={service.description || "Get expert guidance on selecting the right mutual funds for your investment goals."}
                  hideNavigation
                  className={(service.special || service.title !== "SIP Investments") ? "cursor-pointer border-blue-300 hover:border-blue-500" : ""}
                />
              </motion.div>
            ))}
          </motion.div>          <motion.div 
            variants={itemVariants}
            className="max-w-3xl mx-auto p-5 sm:p-6 bg-white rounded-xl shadow-md border-t-4 border-blue-600"
          >
            <h3 className="text-xl font-semibold mb-4 text-blue-900">Why Invest in Mutual Funds?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6">              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 text-sm sm:text-base">Professional Management</h4>
                  <p className="text-xs sm:text-sm text-gray-600">Expert fund managers actively handle your investments</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Diversification</h4>
                  <p className="text-sm text-gray-600">Spread risk across multiple securities and sectors</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Liquidity</h4>
                  <p className="text-sm text-gray-600">Easy to buy and sell with flexible investment options</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Affordability</h4>
                  <p className="text-sm text-gray-600">Access different asset classes with minimal investment</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Higher Returns</h4>
                  <p className="text-sm text-gray-600">Potential for better returns than traditional investments</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Systematic Plans</h4>
                  <p className="text-sm text-gray-600">Disciplined investment approach for long term growth</p>
                </div>
              </div>
            </div>
          </motion.div>          {/* CTA Section */}
          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-5 text-blue-900">Ready to Start Your Investment Journey?</h3>
            <Link
              to="/contact"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1"
            >
              Schedule a Consultation
            </Link>
            <p className="mt-3 text-sm text-gray-600">Our financial experts are ready to guide you</p>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default MutualFundPage;
