import { Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import ServiceCard from "./ServiceCard";
import SIPCalculator from "./SIPCalculator";

const InsurancePage = () => {
  const [showSIPCalculator, setShowSIPCalculator] = useState(false);
  
  // Animation variants
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
  
  const insuranceServices = [
    {
      title: "Term Insurance",
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
    },
    {
      title: "Life Insurance",
      icon: (
        <svg 
          className="w-8 h-8" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 14H15M12 11V17M5 7L7 5M17 7L15 5M12 3V5M19 12C19 15.866 15.866 19 12 19C8.13401 19 5 15.866 5 12C5 8.13401 8.13401 5 12 5C15.866 5 19 8.13401 19 12Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M9 20H15"
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
      title: "Health Insurance",
      icon: (
        <svg 
          className="w-8 h-8" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.9999 21C15.5999 21 18.9999 18.6 18.9999 14C18.9999 9.4 11.9999 3 11.9999 3C11.9999 3 4.99988 9.4 4.99988 14C4.99988 18.6 8.39988 21 11.9999 21Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M10 12L11 15L14 10"
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
      title: "Investment Plans",
      icon: (
        <svg 
          className="w-8 h-8" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 8V7C16 5.93913 15.5786 4.92172 14.8284 4.17157C14.0783 3.42143 13.0609 3 12 3H7C5.93913 3 4.92172 3.42143 4.17157 4.17157C3.42143 4.92172 3 5.93913 3 7V17C3 18.0609 3.42143 19.0783 4.17157 19.8284C4.92172 20.5786 5.93913 21 7 21H12C13.0609 21 14.0783 20.5786 14.8284 19.8284C15.5786 19.0783 16 18.0609 16 17V16"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M19 12L17 10M19 12L21 10M19 12V18M19 18L21 20M19 18L17 20"
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
      title: "Car Insurance",
      icon: (
        <svg 
          className="w-8 h-8" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 8L5 3H19L21 8M3 8V18C3 18.5304 3.21071 19.0391 3.58579 19.4142C3.96086 19.7893 4.46957 20 5 20H6C6.53043 20 7.03914 19.7893 7.41421 19.4142C7.78929 19.0391 8 18.5304 8 18V17H16V18C16 18.5304 16.2107 19.0391 16.5858 19.4142C16.9609 19.7893 17.4696 20 18 20H19C19.5304 20 20.0391 19.7893 20.4142 19.4142C20.7893 19.0391 21 18.5304 21 18V8M3 8H21M7 14H8M16 14H17"
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
      title: "2 Wheeler Insurance",
      icon: (
        <svg 
          className="w-8 h-8" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 19C6.65685 19 8 17.6569 8 16C8 14.3431 6.65685 13 5 13C3.34315 13 2 14.3431 2 16C2 17.6569 3.34315 19 5 19Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M19 19C20.6569 19 22 17.6569 22 16C22 14.3431 20.6569 13 19 13C17.3431 13 16 14.3431 16 16C16 17.6569 17.3431 19 19 19Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M5 13V10H16L19 13M5 10L8 6H13L15 10"
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
      title: "Family Health Insurance",
      icon: (
        <svg 
          className="w-8 h-8" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 11H17.5C18.8807 11 20 12.1193 20 13.5V19C20 20.1046 19.1046 21 18 21H16M16 11V7C16 5.89543 15.1046 5 14 5H13M16 11H8M8 11H6.5C5.11929 11 4 12.1193 4 13.5V19C4 20.1046 4.89543 21 6 21H8M8 11V7C8 5.89543 8.89543 5 10 5H11M13 5L12 4L11 5M8 21V17M16 21V17"
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
      title: "Travel Insurance",
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
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M3.6 9H20.4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M3.6 15H20.4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M12 20.7602C14.0904 20.7602 15.78 16.8414 15.78 12.0002C15.78 7.15896 14.0904 3.24023 12 3.24023C9.90962 3.24023 8.22 7.15896 8.22 12.0002C8.22 16.8414 9.90962 20.7602 12 20.7602Z"
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
      title: "Property Insurance",
      icon: (
        <svg 
          className="w-8 h-8" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 9.99979L12.0002 3.06799L22.0002 9.99979"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M20.0002 13V19C20.0002 19.5305 19.7895 20.0392 19.4145 20.4142C19.0394 20.7893 18.5307 21 18.0002 21H6.00024C5.46981 21 4.9611 20.7893 4.58603 20.4142C4.21096 20.0392 4.00024 19.5305 4.00024 19V13"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M9.00024 21V13.5C9.00024 12.9477 9.44796 12.5 10.0002 12.5H14.0002C14.5525 12.5 15.0002 12.9477 15.0002 13.5V21"
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
      title: "Corporate Insurance",
      icon: (
        <svg 
          className="w-8 h-8" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 21.0001H3V11.0001L12 3.00009L21 11.0001V21.0001Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M9 21.0001V15.0001H15V21.0001"
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
      title: "Fire Insurance",
      icon: (
        <svg 
          className="w-8 h-8" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 11.5C12 8.46997 14.0707 5.96716 17 5C16.4734 8.63728 20 10.3291 20 14.5C20 18.0899 16.4183 21 12 21C7.58172 21 4 18.0899 4 14.5C4 10.3291 7.52656 8.63728 7 5C9.92926 5.96716 12 8.46997 12 11.5Z"
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
      title: "Home Insurance",
      icon: (
        <svg 
          className="w-8 h-8" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 21H21M6 18V9.99998M6 18H18M6 18H3V9.99998L12 3L21 9.99998V18H18M18 18V9.99998M10 21V15H14V21"
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

      {/* Hero Section with Insurance Background */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="py-20 relative bg-gradient-to-r from-blue-900 to-indigo-800"
      >
        {/* Animated Background Elements - Abstract Insurance Patterns */}
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
          {/* Protection Shield Animation */}
          <svg className="absolute bottom-0 left-0 w-full h-24 opacity-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <motion.path 
              fill="none" 
              stroke="white" 
              strokeWidth="8"
              d="M0,160C60,140,120,120,180,120C240,120,300,140,360,133.3C420,127,480,93,540,80C600,67,660,73,720,96C780,120,840,160,900,186.7C960,213,1020,227,1080,213.3C1140,200,1200,160,1260,133.3C1320,107,1380,93,1410,86.7L1440,80"
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
            Insurance Solutions
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
            <span className="text-blue-200">Insurance</span>
          </motion.div>
          
          {/* Visual elements to enhance insurance theme */}
          <motion.div 
            className="flex justify-center mt-8 space-x-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-200">50+</div>
              <div className="text-sm text-blue-100 uppercase tracking-wider">Insurance Plans</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-200">98%</div>
              <div className="text-sm text-blue-100 uppercase tracking-wider">Claim Settled</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-200">24/7</div>
              <div className="text-sm text-blue-100 uppercase tracking-wider">Support</div>
            </div>
          </motion.div>
        </div>      </motion.div>

      <section className="py-16 px-4">
        <div className="container mx-auto">
          {/* Insurance Infographic Section */}
          <motion.div 
            className="relative max-w-4xl mx-auto mb-20 py-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-12">
              How Insurance <span className="text-blue-600">Protects</span> You
            </h2>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200"></div>
              
              {/* Timeline items */}
              <div className="space-y-16">
                <motion.div 
                  className="relative flex items-center justify-between"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  {/* Left content */}
                  <div className="w-5/12 pr-10 text-right">
                    <h3 className="text-lg font-semibold text-blue-700">Risk Assessment</h3>
                    <p className="text-sm text-gray-600 mt-2">
                      We analyze your specific needs and potential risks to determine optimal coverage.
                    </p>
                  </div>
                  
                  {/* Timeline icon */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-blue-500 border-4 border-white shadow z-10 flex items-center justify-center">
                    <span className="text-white font-bold">1</span>
                  </div>
                  
                  {/* Right content */}
                  <div className="w-5/12 pl-10">
                  </div>
                </motion.div>
                
                <motion.div 
                  className="relative flex items-center justify-between"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  {/* Left content */}
                  <div className="w-5/12 pr-10">
                  </div>
                  
                  {/* Timeline icon */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-blue-500 border-4 border-white shadow z-10 flex items-center justify-center">
                    <span className="text-white font-bold">2</span>
                  </div>
                  
                  {/* Right content */}
                  <div className="w-5/12 pl-10">
                    <h3 className="text-lg font-semibold text-blue-700">Policy Selection</h3>
                    <p className="text-sm text-gray-600 mt-2">
                      Choose from our wide range of insurance products with customized coverage options.
                    </p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="relative flex items-center justify-between"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  {/* Left content */}
                  <div className="w-5/12 pr-10 text-right">
                    <h3 className="text-lg font-semibold text-blue-700">Premium Payment</h3>
                    <p className="text-sm text-gray-600 mt-2">
                      Flexible payment options to suit your budget with competitive premium rates.
                    </p>
                  </div>
                  
                  {/* Timeline icon */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-blue-500 border-4 border-white shadow z-10 flex items-center justify-center">
                    <span className="text-white font-bold">3</span>
                  </div>
                  
                  {/* Right content */}
                  <div className="w-5/12 pl-10">
                  </div>
                </motion.div>
                
                <motion.div 
                  className="relative flex items-center justify-between"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  viewport={{ once: true }}
                >
                  {/* Left content */}
                  <div className="w-5/12 pr-10">
                  </div>
                  
                  {/* Timeline icon */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-green-500 border-4 border-white shadow z-10 flex items-center justify-center">
                    <span className="text-white font-bold">4</span>
                  </div>
                  
                  {/* Right content */}
                  <div className="w-5/12 pl-10">
                    <h3 className="text-lg font-semibold text-green-600">Peace of Mind</h3>
                    <p className="text-sm text-gray-600 mt-2">
                      Rest assured knowing you and your loved ones are protected against unforeseen events.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="max-w-3xl mx-auto mb-12 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            <motion.h2 
              className="text-3xl font-bold mb-4 text-primary"
              variants={itemVariants}
            >
              Our Insurance Products
            </motion.h2>
            <motion.p 
              className="text-gray-600"
              variants={itemVariants}
            >
              Protect your family, assets, and future with our comprehensive range of insurance solutions.
              Our expert advisors can help you find the right coverage for your unique needs.
            </motion.p>
          </motion.div><motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
            variants={cardContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {insuranceServices.map((service, index) => (
              <motion.div
                key={`insurance-${index}`}
                variants={cardVariants}
                whileHover={{
                  y: -10,
                  transition: {
                    duration: 0.3,
                    ease: "easeOut"
                  }
                }}
              >
                <ServiceCard
                  title={service.title}
                  icon={service.icon}
                  description="Get personalized coverage options tailored to your specific needs."
                  hideNavigation
                  className="cursor-pointer border-blue-300 hover:border-blue-500"
                />
              </motion.div>
            ))}
          </motion.div>
            <motion.div 
            className="max-w-3xl mx-auto mt-16 p-6 bg-white rounded-xl shadow-md border-t-4 border-blue-600"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.h3 
              className="text-xl font-semibold mb-6 text-blue-900"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              Why Choose Our Insurance Products?
            </motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
              <motion.div 
                className="flex items-start"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Comprehensive Coverage</h4>
                  <p className="text-sm text-gray-600">Insurance solutions tailored to your specific needs</p>
                </div>
              </motion.div>
              <motion.div 
                className="flex items-start"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Fast Claims Settlement</h4>
                  <p className="text-sm text-gray-600">Hassle-free and quick claim settlement process</p>
                </div>
              </motion.div>
              <motion.div 
                className="flex items-start"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Competitive Rates</h4>
                  <p className="text-sm text-gray-600">Premium rates with flexible payment options</p>
                </div>
              </motion.div>
              <motion.div 
                className="flex items-start"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Expert Guidance</h4>
                  <p className="text-sm text-gray-600">Help choosing the right insurance plans</p>
                </div>
              </motion.div>
              <motion.div 
                className="flex items-start"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                viewport={{ once: true }}
              >
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Long-term Protection</h4>
                  <p className="text-sm text-gray-600">Financial security for you and your family</p>
                </div>
              </motion.div>
              <motion.div 
                className="flex items-start"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Exclusive Benefits</h4>
                  <p className="text-sm text-gray-600">Special discounts and benefits for our clients</p>                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
             <Link to="/contact">
            <h3 className="text-xl sm:text-2xl font-bold mb-5 text-blue-900">Ready to Secure Your Future?</h3>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
              Schedule a Consultation
            </button>
            </Link>
            <p className="mt-3 text-sm text-gray-600">Our insurance experts are ready to assist you</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default InsurancePage;
