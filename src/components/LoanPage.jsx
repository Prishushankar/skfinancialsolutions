import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ServiceCard from "./ServiceCard";

const LoanPage = () => {
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

  const loanServices = [
    {
      title: "Home Loan",
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
    {
      title: "Personal Loan",
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
    },
    {
      title: "Business Loan",
      icon: (
        <svg 
          className="w-8 h-8" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 16V8.00002C20.9996 7.6493 20.9071 7.30483 20.7315 7.00119C20.556 6.69754 20.3037 6.44539 20 6.27002L13 2.27002C12.696 2.09449 12.3511 2.00208 12 2.00208C11.6489 2.00208 11.304 2.09449 11 2.27002L4 6.27002C3.69626 6.44539 3.44398 6.69754 3.26846 7.00119C3.09294 7.30483 3.00036 7.6493 3 8.00002V16C3.00036 16.3508 3.09294 16.6952 3.26846 16.9989C3.44398 17.3025 3.69626 17.5547 4 17.73L11 21.73C11.304 21.9056 11.6489 21.998 12 21.998C12.3511 21.998 12.696 21.9056 13 21.73L20 17.73C20.3037 17.5547 20.556 17.3025 20.7315 16.9989C20.9071 16.6952 20.9996 16.3508 21 16Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M7.5 4.20996L16.5 9.78996"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M3.27002 6.96002L12 12L20.73 6.96002"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M12 12V22"
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
      title: "Education Loan",
      icon: (
        <svg 
          className="w-8 h-8" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 14L3 9L12 4L21 9L12 14Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M3 9V14"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M20 13V9.17268"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M14.5 10.9167V16.4167C14.5 16.4167 13.5 17.8333 12 17.8333C10.5 17.8333 9.5 16.4167 9.5 16.4167V10.9167"
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
      title: "Gold Loans",
      icon: (
        <svg 
          className="w-8 h-8" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 12H18M18 12C19.6569 12 21 10.6569 21 9C21 7.34315 19.6569 6 18 6C17.3 6 16.6 6.2 16.1 6.7L15.5 7.3M18 12C19.6569 12 21 13.3431 21 15C21 16.6569 19.6569 18 18 18C16.3431 18 15 16.6569 15 15C15 14.3 15.2 13.6 15.7 13.1L16.3 12.5M16.3 12.5L16.1 12.7M16.3 12.5C16.5 12.2 16.8 12 17 12M16.3 12.5L15.7 13.1M15.7 13.1L15.5 12.9M15.7 13.1C15.3 13.5 15.1 13.9 15 14.2M15 14.2C15 14.3 15 14.4 15 14.5"
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
      title: "Loan Against Property",
      icon: (
        <svg 
          className="w-8 h-8" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 19H3C2.44772 19 2 18.5523 2 18C2 17.4477 2.44772 17 3 17H5V7C5 5.89543 5.89543 5 7 5H17C18.1046 5 19 5.89543 19 7V17H21C21.5523 17 22 17.4477 22 18C22 18.5523 21.5523 19 21 19H16M8 19V17M8 19C8 20.1046 8.89543 21 10 21H14C15.1046 21 16 20.1046 16 19M16 19V17M13 9H11C10.4477 9 10 9.44772 10 10V14C10 14.5523 10.4477 15 11 15H13C13.5523 15 14 14.5523 14 14V10C14 9.44772 13.5523 9 13 9Z"
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
    <div className="overflow-hidden pt-24">
      {/* Hero Section with Financial Background */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="py-20 relative bg-gradient-to-r from-blue-900 to-indigo-800"
      >
        {/* Animated Background Elements */}
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
          {/* Animated Currency Symbol Patterns */}
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
            Loan Solutions
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
            <span className="text-blue-200">Loans</span>
          </motion.div>
          
          {/* Visual statistics for loans */}
          <motion.div 
            className="flex justify-center mt-8 space-x-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-200">8.5%</div>
              <div className="text-sm text-blue-100 uppercase tracking-wider">Starting Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-200">24 Hrs</div>
              <div className="text-sm text-blue-100 uppercase tracking-wider">Fast Approval</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-200">₹50L+</div>
              <div className="text-sm text-blue-100 uppercase tracking-wider">Max Amount</div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <section className="py-16 px-4">
        <div className="container mx-auto">
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
              Our Loan Products
            </motion.h2>
            <motion.p 
              className="text-gray-600"
              variants={itemVariants}
            >
              Get access to competitive interest rates and flexible repayment options with our wide range of loan products.
              Our financial experts can help you choose the perfect loan solution for your specific needs.
            </motion.p>
          </motion.div>          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
            variants={cardContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {loanServices.map((service, index) => (
              <motion.div
                key={`loan-${index}`}
                variants={cardVariants}
                whileHover="hover"
              >
                <div className="h-full">                  <ServiceCard
                    title={service.title}
                    icon={service.icon}
                    description="Access funds with competitive interest rates and flexible repayment options."
                    hideNavigation
                    className="h-full border-blue-300 hover:border-blue-500"
                  />
                </div>
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
              Why Choose Our Loan Products?
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
                  <h4 className="font-medium text-gray-900">Competitive Rates</h4>
                  <p className="text-sm text-gray-600">Low interest rates with flexible repayment options</p>
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
                  <h4 className="font-medium text-gray-900">Quick Approval</h4>
                  <p className="text-sm text-gray-600">Minimal documentation with fast processing</p>
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
                  <h4 className="font-medium text-gray-900">No Hidden Charges</h4>
                  <p className="text-sm text-gray-600">Transparent fees with no prepayment penalties</p>
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
                  <p className="text-sm text-gray-600">Dedicated advisors throughout the process</p>
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
                  <h4 className="font-medium text-gray-900">Customized Solutions</h4>
                  <p className="text-sm text-gray-600">Tailored to your specific financial situation</p>
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
                  <h4 className="font-medium text-gray-900">Transparent Process</h4>
                  <p className="text-sm text-gray-600">Clear terms with no surprise fees</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Loan Comparison Section */}
          <motion.div 
            className="max-w-4xl mx-auto mt-20 overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">
              Competitive <span className="text-blue-600">Loan Rates</span>
            </h2>
            
            <div className="relative overflow-x-auto rounded-lg shadow">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-white uppercase bg-blue-600">
                  <tr>
                    <th scope="col" className="px-6 py-3">Loan Type</th>
                    <th scope="col" className="px-6 py-3">Interest Rate</th>
                    <th scope="col" className="px-6 py-3">Processing Fee</th>
                    <th scope="col" className="px-6 py-3">Tenure</th>
                  </tr>
                </thead>
                <tbody>
                  <motion.tr 
                    className="bg-white border-b"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">Home Loan</td>
                    <td className="px-6 py-4 text-green-600 font-medium">8.5% - 11.5%</td>
                    <td className="px-6 py-4">0.5% - 1%</td>
                    <td className="px-6 py-4">Up to 30 years</td>
                  </motion.tr>
                  <motion.tr 
                    className="bg-gray-50 border-b"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">Personal Loan</td>
                    <td className="px-6 py-4 text-green-600 font-medium">10.5% - 16%</td>
                    <td className="px-6 py-4">1% - 2.5%</td>
                    <td className="px-6 py-4">1 - 5 years</td>
                  </motion.tr>
                  <motion.tr 
                    className="bg-white border-b"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">Business Loan</td>
                    <td className="px-6 py-4 text-green-600 font-medium">11% - 18%</td>
                    <td className="px-6 py-4">1% - 3%</td>
                    <td className="px-6 py-4">1 - 7 years</td>
                  </motion.tr>
                  <motion.tr 
                    className="bg-gray-50 border-b"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">Education Loan</td>
                    <td className="px-6 py-4 text-green-600 font-medium">8% - 12%</td>
                    <td className="px-6 py-4">Nil - 1%</td>
                    <td className="px-6 py-4">Up to 15 years</td>
                  </motion.tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">*Rates are indicative and subject to change based on profile and market conditions</p>
          </motion.div>
            
          {/* CTA Section */}
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-5 text-blue-900">Ready to Apply for a Loan?</h3>
            <Link to="/contact">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
              Apply Now
            </button>
            </Link>
            <p className="mt-3 text-sm text-gray-600">Our loan experts are ready to assist you</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LoanPage;
