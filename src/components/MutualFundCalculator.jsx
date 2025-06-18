import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const MutualFundCalculator = ({ onClose, fundType = "Equity" }) => {
  // Set different default values based on fund type
  const getDefaultReturnRate = () => {
    switch(fundType) {
      case "Debt": return 8;
      case "Hybrid": return 10;
      case "Index": return 11;
      case "ELSS": return 12.5;
      case "Liquid": return 6;
      default: return 12; // Equity
    }
  };

  // State for form inputs
  const [investment, setInvestment] = useState(25000);
  const [returnRate, setReturnRate] = useState(getDefaultReturnRate());
  const [timePeriod, setTimePeriod] = useState(10);
  
  // State for results
  const [estimatedReturns, setEstimatedReturns] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const [yearlyData, setYearlyData] = useState([]);
    // Calculate returns when inputs change
  useEffect(() => {
    // Calculate mutual fund returns
    const finalAmount = investment * Math.pow((1 + returnRate / 100), timePeriod);
    const returns = finalAmount - investment;
    
    setEstimatedReturns(Math.round(returns));
    setTotalValue(Math.round(finalAmount));
    
    // Generate yearly growth data for the chart
    const yearly = [];
    for (let year = 0; year <= timePeriod; year++) {
      const yearAmount = investment * Math.pow((1 + returnRate / 100), year);
      yearly.push({
        year,
        amount: Math.round(yearAmount),
        returns: Math.round(yearAmount - investment)
      });
    }
    setYearlyData(yearly);
  }, [investment, returnRate, timePeriod]);
  
  // Handle window resize for responsive design
  useEffect(() => {
    const handleResize = () => {
      // Force chart to update when window size changes
      setChartKey(prev => prev + 1);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Use a key to force chart re-render on resize
  const [chartKey, setChartKey] = useState(0);
  
  // Format numbers with commas (Indian format)
  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-IN').format(num);
  };
  
  // Function to determine theme color based on fund type
  const getThemeColor = () => {
    switch(fundType) {
      case "Debt": return "blue";
      case "Hybrid": return "purple";
      case "Index": return "indigo";
      case "ELSS": return "pink";
      case "Liquid": return "sky";
      default: return "emerald"; // Equity
    }
  };

  // Function to get theme color hex value for charts
  const getThemeColorHex = () => {
    switch(fundType) {
      case "Debt": return '#3b82f6';
      case "Hybrid": return '#a855f7';
      case "Index": return '#6366f1';
      case "ELSS": return '#ec4899';
      case "Liquid": return '#0ea5e9';
      default: return '#10b981'; // Equity
    }
  };

  // Function to get lighter color hex value for charts
  const getLightColorHex = () => {
    switch(fundType) {
      case "Debt": return '#93c5fd';
      case "Hybrid": return '#d8b4fe';
      case "Index": return '#a5b4fc';
      case "ELSS": return '#f9a8d4';
      case "Liquid": return '#7dd3fc';
      default: return '#5eead4'; // Equity
    }
  };
  
  const themeColor = getThemeColor();
  const themeColorHex = getThemeColorHex();
  const lightColorHex = getLightColorHex();
  // Chart data with enhanced colors
  const chartData = {
    labels: ['Invested Amount', 'Estimated Returns'],
    datasets: [
      {
        data: [investment, estimatedReturns],
        backgroundColor: ['#f3f4f6', themeColorHex],
        borderColor: ['#e5e7eb', lightColorHex],
        borderWidth: 1,
        hoverOffset: 6
      },
    ],
  };
    // Get responsive chart options based on screen size with always visible data
  const getResponsiveChartOptions = () => {
    // Detect if we're on a mobile device
    const isMobile = window.innerWidth < 480;
    
    return {
      cutout: '60%', // Reduced cutout percentage for a thicker doughnut
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: isMobile ? 12 : 24,
            boxWidth: isMobile ? 12 : 16,
            font: {
              size: isMobile ? 11 : 13,
              weight: 'bold'
            }
          }
        },
        tooltip: {
          enabled: true, // Always show tooltip
          external: function(context) {
            // Always show the tooltip for the "Estimated Returns" segment
            const tooltipModel = context.tooltip;
            if (tooltipModel.opacity === 0) {
              tooltipModel.opacity = 1;
              // Force the tooltip to show for the returns segment (index 1)
              const activeElements = context.chart.getActiveElements();
              if (activeElements.length === 0) {
                // If no element is active, activate the returns segment
                context.chart.setActiveElements([{
                  datasetIndex: 0,
                  index: 1 // Estimated Returns is at index 1
                }]);
                context.chart.update();
              }
            }
          },
          callbacks: {
            label: function(context) {
              let label = context.label || '';
              let value = context.raw || 0;
              return `${label}: ₹${formatNumber(value)}`;
            }
          },
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: 12,
          bodyFont: {
            size: isMobile ? 12 : 14,
            weight: 'bold'
          },
          bodyColor: '#ffffff',
          displayColors: true,
          boxWidth: 10,
          boxHeight: 10,
          usePointStyle: true,
          // Always show tooltip
          events: []
        }
      },
      // Make chart animation more dramatic
      animation: {
        animateRotate: true,
        animateScale: true,
        duration: 1200
      }
    };
  };

  const chartOptions = getResponsiveChartOptions();

  return (    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-1 sm:p-2 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="bg-white rounded-xl shadow-2xl max-w-7xl w-[98%] sm:w-[95%] md:w-full h-[90vh] sm:h-auto overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >        {/* Header */}
        <div className={`p-4 sm:p-5 rounded-t-xl relative bg-${themeColor}-600`}>
          <motion.button 
            onClick={onClose}
            className={`absolute right-4 sm:right-6 top-4 sm:top-6 text-white hover:text-${themeColor}-100`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>
          
          <motion.h2 
            className="text-base sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-2 pr-6"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {fundType === "Hybrid" ? "Hybrid Fund Calculator" : 
             fundType === "Index" ? "Index Fund Calculator" :
             fundType === "ELSS" ? "ELSS Tax-Saving Fund Calculator" :
             fundType === "Liquid" ? "Liquid Fund Calculator" :
             `${fundType} Fund Calculator`}
          </motion.h2>
          
          <motion.p 
            className={`text-${themeColor}-100 text-xs sm:text-sm md:text-base`}
            initial={{ y: -5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {fundType === "Hybrid" 
              ? "Calculate potential returns on your balanced equity-debt hybrid fund investments"
              : fundType === "Index"
              ? "Calculate potential returns on your market index-tracking passive investments"
              : fundType === "ELSS"
              ? "Calculate returns on tax-saving equity linked savings schemes with tax benefits under Section 80C"
              : fundType === "Liquid"
              ? "Calculate returns on short-term debt instruments with high liquidity and low risk"
              : `Calculate potential returns on your lump sum ${fundType.toLowerCase()} mutual fund investments`
            }
          </motion.p>
        </div>
          {/* Calculator Form */}
        <div className="p-3 sm:p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            <motion.div 
              className="space-y-3 sm:space-y-4"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >              {/* Total Investment */}
              <div>
                <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center mb-2 gap-2">
                  <label className="text-gray-700 text-sm sm:text-base font-medium">Total investment</label>
                  
                  <div 
                    className="bg-gray-100 px-2 sm:px-3 py-1.5 sm:py-2 rounded-md flex items-center text-sm sm:text-base w-full xs:w-auto"
                    style={{ backgroundColor: `${lightColorHex}30` }}
                  >
                    <span className="text-gray-500 mr-1">₹</span>
                    <input
                      type="number"
                      className="bg-transparent border-none focus:outline-none font-medium w-full text-right"
                      style={{ color: themeColorHex }}
                      value={investment}
                      onChange={(e) => setInvestment(Number(e.target.value))}
                      inputMode="numeric"
                    />
                  </div>
                </div>
                
                <div className="w-full bg-gray-100 rounded-full h-2 mb-1">
                  <div className="relative">
                    <input
                      type="range"
                      min="1000"
                      max="1000000"
                      step="1000"
                      value={investment}
                      onChange={(e) => setInvestment(Number(e.target.value))}
                      className="absolute w-full h-2 appearance-none bg-transparent cursor-pointer z-10"
                      style={{
                        WebkitAppearance: 'none',
                        appearance: 'none'
                      }}
                    />
                    
                    <div 
                      className="absolute left-0 top-0 h-2 rounded-full"
                      style={{ 
                        width: `${Math.min((investment / 1000000) * 100, 100)}%`,
                        backgroundColor: themeColorHex
                      }}
                    ></div>
                  </div>
                </div>
              </div>
                {/* Expected Return Rate */}
              <div>
                <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center mb-2 gap-2">
                  <label className="text-gray-700 text-sm sm:text-base font-medium">Expected return rate (p.a)</label>
                  
                  <div 
                    className="px-2 sm:px-3 py-1.5 sm:py-2 rounded-md flex items-center w-full xs:w-auto"
                    style={{ backgroundColor: `${lightColorHex}30` }}
                  >
                    <input
                      type="number"
                      className="bg-transparent border-none focus:outline-none font-medium w-full text-right"
                      style={{ color: themeColorHex }}
                      value={returnRate}
                      onChange={(e) => setReturnRate(Number(e.target.value))}
                      inputMode="decimal"
                    />
                    <span className="text-gray-500 ml-1">%</span>
                  </div>
                </div>
                
                <div className="w-full bg-gray-100 rounded-full h-2 mb-1">
                  <div className="relative">
                    <input
                      type="range"
                      min="1"
                      max="30"
                      step="0.5"
                      value={returnRate}
                      onChange={(e) => setReturnRate(Number(e.target.value))}
                      className="absolute w-full h-2 appearance-none bg-transparent cursor-pointer z-10"
                      style={{
                        WebkitAppearance: 'none',
                        appearance: 'none'
                      }}
                    />
                    
                    <div 
                      className="absolute left-0 top-0 h-2 rounded-full"
                      style={{ 
                        width: `${(returnRate / 30) * 100}%`,
                        backgroundColor: themeColorHex
                      }}
                    ></div>
                  </div>
                </div>
              </div>
                {/* Time Period */}
              <div>
                <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center mb-2 gap-2">
                  <label className="text-gray-700 text-sm sm:text-base font-medium">Time period</label>
                  
                  <div 
                    className="px-2 sm:px-3 py-1.5 sm:py-2 rounded-md flex items-center w-full xs:w-auto"
                    style={{ backgroundColor: `${lightColorHex}30` }}
                  >
                    <input
                      type="number"
                      className="bg-transparent border-none focus:outline-none font-medium w-full text-right"
                      style={{ color: themeColorHex }}
                      value={timePeriod}
                      onChange={(e) => setTimePeriod(Number(e.target.value))}
                      inputMode="numeric"
                    />
                    <span className="text-gray-500 ml-1">Yr</span>
                  </div>
                </div>
                
                <div className="w-full bg-gray-100 rounded-full h-2 mb-1">
                  <div className="relative">
                    <input
                      type="range"
                      min="1"
                      max="30"
                      value={timePeriod}
                      onChange={(e) => setTimePeriod(Number(e.target.value))}
                      className="absolute w-full h-2 appearance-none bg-transparent cursor-pointer z-10"
                      style={{
                        WebkitAppearance: 'none',
                        appearance: 'none'
                      }}
                    />
                    
                    <div 
                      className="absolute left-0 top-0 h-2 rounded-full"
                      style={{ 
                        width: `${(timePeriod / 30) * 100}%`,
                        backgroundColor: themeColorHex
                      }}
                    ></div>
                  </div>
                </div>
              </div>
                {/* Results Summary */}
              <motion.div 
                className="pt-3 sm:pt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="grid grid-cols-2 gap-2 sm:gap-4">
                  <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-100">
                    <span className="text-gray-500 text-xs">Invested amount</span>
                    <div className="text-gray-900 font-semibold text-lg sm:text-xl lg:text-2xl mt-1 truncate">₹{formatNumber(investment)}</div>
                  </div>
                  
                  <div className="p-3 sm:p-4 rounded-lg border" style={{ backgroundColor: `${lightColorHex}15`, borderColor: `${lightColorHex}` }}>
                    <span className="text-gray-500 text-xs">Est. returns</span>
                    <div className="font-semibold text-lg sm:text-xl lg:text-2xl mt-1 truncate" style={{ color: themeColorHex }}>₹{formatNumber(estimatedReturns)}</div>
                  </div>
                  
                  <div className="bg-gray-800 p-3 sm:p-4 rounded-lg text-white col-span-2">
                    <span className="text-gray-300 text-xs">Total value</span>
                    <div className="font-semibold text-lg sm:text-xl lg:text-2xl mt-1 truncate">₹{formatNumber(totalValue)}</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
              {/* Right Side - Chart */}
            <motion.div 
              className="flex flex-col items-center justify-center mt-6 md:mt-0"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {/* Increased chart size with permanent information display */}
              <div className="relative h-60 w-60 xs:h-72 xs:w-72 sm:h-80 sm:w-80 md:h-72 md:w-72 lg:h-[340px] lg:w-[340px]">
                <Doughnut key={chartKey} data={chartData} options={chartOptions} />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center bg-white bg-opacity-90 rounded-full p-4 shadow-sm border-2" style={{ borderColor: lightColorHex }}>
                  <div className="text-sm sm:text-base font-medium text-gray-700">Returns</div>
                  <div className="text-xl xs:text-2xl sm:text-3xl font-bold" style={{ color: themeColorHex }}>
                    {Math.round((estimatedReturns / investment) * 100)}%
                  </div>
                </div>
              </div>
              
              {/* Permanent information display below chart */}
              <div className="w-full mt-4 p-3 rounded-lg border-2 bg-white" style={{ borderColor: lightColorHex }}>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-sm font-medium text-gray-700">Invested Amount</div>
                    <div className="text-lg font-bold">₹{formatNumber(investment)}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium" style={{ color: themeColorHex }}>Estimated Returns</div>
                    <div className="text-lg font-bold" style={{ color: themeColorHex }}>₹{formatNumber(estimatedReturns)}</div>
                  </div>
                </div>
              </div>
                {/* Enhanced Investment Growth Info */}
              <div className="mt-5 sm:mt-6 w-full">
                <h4 className="text-sm sm:text-base font-bold text-gray-800 mb-2 sm:mb-3 text-center">
                  Your Investment Growth Over Time
                </h4>
                <div className="flex flex-wrap justify-center sm:grid sm:grid-cols-3 gap-3 sm:gap-4 text-sm">
                  {[Math.min(3, timePeriod), Math.min(Math.round(timePeriod/2), timePeriod), timePeriod]
                    .filter((y, i, arr) => y > 0 && arr.indexOf(y) === i) // Remove duplicates
                    .map((year, i) => {
                    const yearData = yearlyData.find(d => d.year === year);
                    return yearData ? (
                      <div 
                        key={i} 
                        className="p-3 rounded-lg shadow-sm min-w-[80px] flex-grow text-center"
                        style={{ 
                          backgroundColor: i === 2 ? `${themeColorHex}15` : 'white',
                          borderLeft: i === 2 ? `4px solid ${themeColorHex}` : `1px solid ${lightColorHex}`
                        }}
                      >
                        <div className="text-gray-600 font-medium">Year {year}</div>
                        <div className="font-bold text-lg truncate mt-1" style={{ color: i === 2 ? themeColorHex : 'inherit' }}>
                          ₹{formatNumber(yearData.amount)}
                        </div>
                        <div className="text-xs mt-1" style={{ color: i === 2 ? themeColorHex : 'gray' }}>
                          +₹{formatNumber(yearData.returns)} <span className="text-gray-400">growth</span>
                        </div>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Action buttons */}
          <motion.div 
            className="flex justify-center xs:justify-end gap-2 sm:gap-3 mt-4 sm:mt-6"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >            <motion.button
              type="button"
              onClick={onClose}
              className="px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm bg-gray-200 hover:bg-gray-300 rounded-md font-medium transition-colors duration-200 flex-1 xs:flex-none"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Close
            </motion.button>
            
            <motion.button
              type="button"
              style={{ backgroundColor: themeColorHex }}
              className="px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm text-white rounded-md font-medium transition-colors duration-200 flex-1 xs:flex-none"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                window.alert(`A financial advisor will contact you soon to discuss your ${fundType.toLowerCase()} mutual fund investment options.`);
                onClose();
              }}
            >
              INVEST NOW
            </motion.button>          </motion.div>
          
          {/* Fund Type Explanation Section */}
          <motion.div
            className="mt-4 sm:mt-6 p-3 sm:p-4 rounded-lg bg-gray-50 border border-gray-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <h4 className="text-sm sm:text-base font-bold text-gray-800 mb-2 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              About {fundType} Funds
            </h4>
            <p className="text-xs sm:text-sm text-gray-600">
              {fundType === "Equity" && 
                "Equity mutual funds invest primarily in stocks, offering higher growth potential with moderate to high risk. Best for long-term wealth creation with investment horizons of 5+ years."}
              {fundType === "Debt" && 
                "Debt funds invest in fixed-income securities like bonds and government securities. They offer stable returns with lower risk compared to equity funds, ideal for conservative investors."}
              {fundType === "Hybrid" && 
                "Hybrid funds invest in a mix of equity and debt instruments, offering balanced returns with moderate risk. They provide diversification and are suitable for medium-term financial goals."}
              {fundType === "Index" && 
                "Index funds passively track market indices like NIFTY or SENSEX. They offer market-linked returns with lower expense ratios and are good for investors who want to match market performance."}
              {fundType === "ELSS" && 
                "ELSS (Equity-Linked Savings Scheme) funds invest primarily in equities while offering tax benefits under Section 80C. They have a mandatory 3-year lock-in period, the shortest among tax-saving options."}
              {fundType === "Liquid" && 
                "Liquid funds invest in short-term money market instruments with high liquidity. They offer better returns than savings accounts with minimal risk, perfect for parking surplus funds for short periods."}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

MutualFundCalculator.propTypes = {
  onClose: PropTypes.func.isRequired,
  fundType: PropTypes.oneOf(['Equity', 'Debt', 'Hybrid', 'Index', 'ELSS', 'Liquid'])
};

export default MutualFundCalculator;
