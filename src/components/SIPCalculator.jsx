import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { trackCalculatorUsage } from '../utils/analytics';

const SIPCalculator = ({ onClose }) => {
  // State for form inputs
  const [monthlySIP, setMonthlySIP] = useState(5000);
  const [returnRate, setReturnRate] = useState(12);
  const [timePeriod, setTimePeriod] = useState(10);
  
  // State for results
  const [investedAmount, setInvestedAmount] = useState(0);
  const [estimatedReturns, setEstimatedReturns] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  
  // Calculate returns when inputs change
  useEffect(() => {
    // Track calculator usage on first load
    trackCalculatorUsage('SIP Calculator');
    
    // Calculate SIP returns using formula: FV = P × ((1 + r)^n - 1) / r × (1 + r)
    const monthlyRate = returnRate / 12 / 100;
    const months = timePeriod * 12;
    const invested = monthlySIP * months;
    
    // SIP formula for future value
    const futureValue = monthlySIP * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    
    setInvestedAmount(invested);
    setEstimatedReturns(Math.round(futureValue - invested));
    setTotalValue(Math.round(futureValue));
  }, [monthlySIP, returnRate, timePeriod]);
  
  // Format numbers with commas (Indian format)
  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-IN').format(num);
  };  
    return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start sm:items-center justify-center z-50 p-1 sm:p-2 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-7xl w-[95%] md:w-full my-4 sm:my-2 max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-primary p-4 sm:p-5 rounded-t-xl relative">
          <button 
            onClick={onClose}
            className="absolute right-4 sm:right-6 top-4 sm:top-6 text-white hover:text-indigo-100"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-2">SIP Calculator</h2>
          <p className="text-indigo-100 text-xs sm:text-sm md:text-base">
            Calculate returns on your Systematic Investment Plan (SIP)
          </p>
        </div>
          {/* Calculator Form */}        <div className="p-2 sm:p-3 md:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
            <div className="space-y-3 sm:space-y-5">
              {/* Monthly SIP */}
              <div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                  <label className="text-gray-700 text-sm sm:text-base font-medium mb-1 sm:mb-0">Monthly SIP amount</label>
                  <div className="bg-indigo-50 px-3 sm:px-4 py-1 sm:py-1.5 rounded-md flex items-center text-sm sm:text-base w-full sm:w-auto">
                    <span className="text-gray-500 mr-1">₹</span>
                    <input
                      type="number"
                      className="bg-transparent border-none focus:outline-none text-indigo-700 font-medium w-full sm:w-24 text-right"
                      value={monthlySIP}
                      onChange={(e) => setMonthlySIP(Math.max(100, Number(e.target.value)))}
                    />
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 mb-1">
                  <div className="relative">
                    <input
                      type="range"
                      min="100"
                      max="100000"
                      step="100"
                      value={monthlySIP}
                      onChange={(e) => setMonthlySIP(Number(e.target.value))}
                      className="absolute w-full h-2 appearance-none bg-transparent cursor-pointer z-10"
                      style={{
                        WebkitAppearance: 'none',
                        appearance: 'none'
                      }}
                    />
                    <div 
                      className="absolute left-0 top-0 h-2 rounded-full bg-primary" 
                      style={{ width: `${Math.min((monthlySIP / 100000) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>₹100</span>
                  <span>₹1,00,000</span>
                </div>
              </div>
              
              {/* Expected Return Rate */}
              <div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                  <label className="text-gray-700 text-sm sm:text-base font-medium mb-1 sm:mb-0">Expected return rate (p.a)</label>
                  <div className="bg-indigo-50 px-3 sm:px-4 py-1 sm:py-1.5 rounded-md flex items-center w-full sm:w-auto">
                    <input
                      type="number"
                      className="bg-transparent border-none focus:outline-none text-indigo-700 font-medium w-full sm:w-16 text-right"
                      value={returnRate}
                      onChange={(e) => setReturnRate(Number(e.target.value))}
                      min="1"
                      max="30"
                      step="0.1"
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
                      className="absolute left-0 top-0 h-2 rounded-full bg-primary" 
                      style={{ width: `${(returnRate / 30) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>1%</span>
                  <span>30%</span>
                </div>
              </div>
              
              {/* Time Period */}
              <div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                  <label className="text-gray-700 text-sm sm:text-base font-medium mb-1 sm:mb-0">Investment period</label>
                  <div className="bg-indigo-50 px-3 sm:px-4 py-1 sm:py-1.5 rounded-md flex items-center w-full sm:w-auto">
                    <input
                      type="number"
                      className="bg-transparent border-none focus:outline-none text-indigo-700 font-medium w-full sm:w-16 text-right"
                      value={timePeriod}
                      onChange={(e) => setTimePeriod(Number(e.target.value))}
                      min="1"
                      max="40"
                    />
                    <span className="text-gray-500 ml-1">Yr</span>
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 mb-1">
                  <div className="relative">
                    <input
                      type="range"
                      min="1"
                      max="40"
                      value={timePeriod}
                      onChange={(e) => setTimePeriod(Number(e.target.value))}
                      className="absolute w-full h-2 appearance-none bg-transparent cursor-pointer z-10"
                      style={{
                        WebkitAppearance: 'none',
                        appearance: 'none'
                      }}
                    />
                    <div 
                      className="absolute left-0 top-0 h-2 rounded-full bg-primary" 
                      style={{ width: `${(timePeriod / 40) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>1 yr</span>
                  <span>40 yrs</span>
                </div>
              </div>
                {/* Results Summary */}
              <div className="pt-3 sm:pt-4">
                <div className="grid grid-cols-3 gap-2 sm:gap-4">
                  <div className="flex flex-col">
                    <span className="text-gray-500 text-[10px] sm:text-xs md:text-sm">Investment</span>
                    <span className="text-gray-900 font-semibold text-xs sm:text-sm md:text-base lg:text-xl">₹{formatNumber(investedAmount)}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-500 text-[10px] sm:text-xs md:text-sm">Est. returns</span>
                    <span className="text-indigo-600 font-semibold text-xs sm:text-sm md:text-base lg:text-xl">₹{formatNumber(estimatedReturns)}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-500 text-[10px] sm:text-xs md:text-sm">Total value</span>
                    <span className="text-gray-900 font-semibold text-xs sm:text-sm md:text-base lg:text-xl">₹{formatNumber(totalValue)}</span>
                  </div>
                </div>
              </div>
            </div>
              {/* Right Side - Chart */}
            <div className="flex items-center justify-center mt-4 lg:mt-0">              <div className="flex flex-col items-center">
                <div className="h-36 w-36 sm:h-56 sm:w-56 md:h-64 md:w-64 lg:h-72 lg:w-72 relative">
                  {/* Donut chart using SVG for better accuracy */}
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    {/* Background circle (invested amount) */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#f3f4f6"
                      strokeWidth="20"
                    />
                    
                    {/* Returns arc */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#6366f1"
                      strokeWidth="20"
                      strokeDasharray={`${(estimatedReturns / totalValue) * 251.2} 251.2`}
                      strokeDashoffset="0"
                      transform="rotate(-90 50 50)"
                    />
                    
                    {/* Inner white circle for donut hole */}
                    <circle
                      cx="50"
                      cy="50"
                      r="30"
                      fill="white"
                    />
                  </svg>
                </div>
                  {/* Legend - moved outside of the chart container with proper spacing */}
                <div className="mt-3 sm:mt-4 w-full">
                  <div className="flex flex-row justify-center space-x-4 md:space-x-8">
                    <div className="flex items-center justify-center">
                      <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-gray-100 mr-1 sm:mr-2"></div>
                      <span className="text-xs sm:text-sm text-gray-600">Invested amount</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-indigo-500 mr-1 sm:mr-2"></div>
                      <span className="text-xs sm:text-sm text-gray-600">Est. returns</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>          {/* Additional information */}
          <div className="mt-8 sm:mt-6 bg-blue-50 p-3 sm:p-4 rounded-lg border border-blue-100">
            <div className="flex items-start">
              <div className="text-blue-500 mr-2 sm:mr-3 mt-0.5 flex-shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-xs sm:text-sm text-blue-700">
                SIP (Systematic Investment Plan) allows you to invest a fixed amount at regular intervals. The power of compounding and rupee cost averaging can help build substantial wealth over time.
              </p>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex justify-end gap-2 sm:gap-3 mt-4 sm:mt-5">
            <button
              type="button"
              onClick={onClose}
              className="px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm bg-gray-200 hover:bg-gray-300 rounded-md font-medium transition-colors duration-200"
            >
              Close
            </button>
            <button
              type="button"
              className="px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm bg-primary hover:bg-indigo-700 text-white rounded-md font-medium transition-colors duration-200"
              onClick={() => {
                window.alert("A financial advisor will contact you soon to discuss your SIP investment options.");
                onClose();
              }}
            >
              START SIP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

SIPCalculator.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default SIPCalculator;
