import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import RetirementCalculator from './RetirementCalculator';
import MutualFundCalculator from './MutualFundCalculator';
import SIPCalculator from './SIPCalculator';
import TermInsurancePage from './TermInsurancePage';
import LifeInsurancePage from './LifeInsurancePage';

const ServiceCard = ({ title, icon, description, category, hideNavigation, className = "", showExplore, showCalculator, showContact = true }) => {
  const navigate = useNavigate();
  const [showRetirementCalculator, setShowRetirementCalculator] = useState(false);
  const [showMutualFundCalculator, setShowMutualFundCalculator] = useState(false);
  const [showSIPCalculator, setShowSIPCalculator] = useState(false);
  const [showTermInsurancePage, setShowTermInsurancePage] = useState(false);
  const [showLifeInsurancePage, setShowLifeInsurancePage] = useState(false);
  
  const handleClick = () => {
    if (hideNavigation) {
      return; // Don't navigate if we're already on the category page
    }
    
    // Handle main category navigation
    if (title === "Mutual Funds") {
      navigate('/mutual-funds');
      return;
    } else if (title === "Insurance") {
      navigate('/insurance');
      return;
    } else if (title === "Loan") {
      navigate('/loans');
      return;
    }
    
    // Handle sub-category specific actions
    if (title === "Term Insurance") {
      setShowTermInsurancePage(true);
    } else if (title === "Retirement Plans") {
      setShowRetirementCalculator(true);
    } else if (title === "Equity Mutual Funds" || title === "Debt Mutual Funds" || title === "Hybrid Mutual Funds" || title === "Index Funds") {
      setShowMutualFundCalculator(true);
    } else if (title === "SIP Investments") {
      setShowSIPCalculator(true);
    } else if (title === "Life Insurance") {
      setShowLifeInsurancePage(true);
    }
  };

  const handleExploreClick = (e) => {
    e.stopPropagation();
    handleClick();
  };

  return (
    <>      <motion.div 
        className={`bg-white/95 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-blue-50 cursor-pointer overflow-hidden relative h-64 ${className}`}
        onClick={handleClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Decorative accent for finance theme */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
        
        <div className="flex flex-col items-center text-center relative z-10">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mb-3 sm:mb-4 text-white shadow-md">
            {icon}
          </div>
          <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2">
            {title}
          </h3>
          {description && (
            <p className="text-sm text-gray-600 mt-1">{description}</p>
          )}          {/* Call-to-action buttons */}
          <div className="mt-3 sm:mt-4 flex space-x-3 justify-center">
            {showExplore && (
              <button 
                className="px-3 py-1.5 text-xs font-medium text-blue-600 rounded-full border border-blue-200 bg-blue-50 hover:bg-blue-100 transition-colors duration-200 shadow-sm"
                onClick={handleExploreClick}
              >
                Explore
              </button>
            )}
            {showCalculator && (
              <button className="px-3 py-1.5 text-xs font-medium text-blue-600 rounded-full border border-blue-200 bg-blue-50 hover:bg-blue-100 transition-colors duration-200 shadow-sm">
                Calculator
              </button>
            )}
            {showContact && (
              <button 
                className="px-3 py-1.5 text-xs font-medium text-green-600 rounded-full border border-green-200 bg-green-50 hover:bg-green-100 transition-colors duration-200 shadow-sm"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering the parent onClick
                  navigate('/contact');
                }}
              >
                Contact
              </button>
            )}
          </div>
            {/* Subtle financial graph background */}
          <div className="absolute bottom-2 right-2 opacity-10">
            <svg width="50" height="25" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 60L20 40L40 50L60 20L80 30L100 10L120 0" stroke="currentColor" strokeWidth="2"/>
              <circle cx="20" cy="40" r="2" fill="currentColor"/>
              <circle cx="40" cy="50" r="2" fill="currentColor"/>
              <circle cx="60" cy="20" r="2" fill="currentColor"/>
              <circle cx="80" cy="30" r="2" fill="currentColor"/>
              <circle cx="100" cy="10" r="2" fill="currentColor"/>
            </svg>
          </div>
        </div>
      </motion.div>{/* Retirement Calculator Modal */}{showRetirementCalculator && <RetirementCalculator onClose={() => setShowRetirementCalculator(false)} />}
      
      {/* Term Insurance Page */}
      {showTermInsurancePage && <TermInsurancePage onClose={() => setShowTermInsurancePage(false)} />}
      
      {/* Mutual Fund Calculator Modal */}
      {showMutualFundCalculator && (
        <MutualFundCalculator 
          onClose={() => setShowMutualFundCalculator(false)}
          fundType={
            title.includes("Debt") ? "Debt" : 
            title.includes("Hybrid") ? "Hybrid" : 
            title.includes("Index") ? "Index" : "Equity"
          } 
        />
      )}
        {/* SIP Calculator Modal */}
      {showSIPCalculator && <SIPCalculator onClose={() => setShowSIPCalculator(false)} />}
      
      {/* Life Insurance Page */}
      {showLifeInsurancePage && <LifeInsurancePage onClose={() => setShowLifeInsurancePage(false)} />}
    </>
  );
};

ServiceCard.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  description: PropTypes.string,
  category: PropTypes.string,
  hideNavigation: PropTypes.bool,
  className: PropTypes.string,
  showExplore: PropTypes.bool,
  showCalculator: PropTypes.bool,
  showContact: PropTypes.bool,
};

export default ServiceCard;
