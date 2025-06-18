import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const RetirementCalculator = ({ onClose }) => {
  // State for form inputs
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [lifeExpectancy, setLifeExpectancy] = useState(85);
  const [monthlyExpense, setMonthlyExpense] = useState(50000);
  const [currentCorpus, setCurrentCorpus] = useState(500000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [expenseFactor, setExpenseFactor] = useState(70);
  
  // State for results
  const [requiredCorpus, setRequiredCorpus] = useState(0);
  const [monthlySavingsRequired, setMonthlySavingsRequired] = useState(0);
  const [showResults, setShowResults] = useState(false);
  
  // Calculate retirement corpus needed
  const calculateRetirement = () => {
    // Years in retirement
    const yearsInRetirement = lifeExpectancy - retirementAge;
    
    // Inflation adjusted monthly expense at retirement
    const inflationRate = 6;
    const yearsToRetirement = retirementAge - currentAge;
    const inflationAdjustedMonthlyExpense = 
      monthlyExpense * Math.pow((1 + inflationRate / 100), yearsToRetirement);
    
    // Retirement corpus needed (adjusted for expense factor)
    const adjustedMonthlyExpense = inflationAdjustedMonthlyExpense * (expenseFactor / 100);
    const annualExpense = adjustedMonthlyExpense * 12;
    
    // Using the 4% rule with adjustments for expected return
    const withdrawalRate = 4 + (expectedReturn - 12) / 2; // Adjust withdrawal rate based on expected returns
    const safeWithdrawalRate = Math.max(Math.min(withdrawalRate, 6), 3) / 100;
    
    // Required corpus at retirement
    const requiredCorpusAtRetirement = annualExpense / safeWithdrawalRate;
    
    // Future value of current corpus
    const futureValueOfCurrentCorpus = 
      currentCorpus * Math.pow((1 + expectedReturn / 100), yearsToRetirement);
    
    // Additional corpus needed
    const additionalCorpusNeeded = Math.max(requiredCorpusAtRetirement - futureValueOfCurrentCorpus, 0);
    
    // Monthly savings required (PMT formula)
    const monthlyRate = expectedReturn / 100 / 12;
    const periods = yearsToRetirement * 12;
    
    let monthlySavings = 0;
    if (periods > 0 && monthlyRate > 0) {
      monthlySavings = additionalCorpusNeeded * monthlyRate / 
        (Math.pow(1 + monthlyRate, periods) - 1);
    }
    
    setRequiredCorpus(Math.round(requiredCorpusAtRetirement));
    setMonthlySavingsRequired(Math.round(monthlySavings));
    setShowResults(true);
  };
  
  // Format numbers with commas
  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-IN').format(num);
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-1 sm:p-2 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-7xl w-[95%] md:w-full h-auto overflow-y-auto">
        {/* Header */}
        <div className="bg-indigo-600 p-5 rounded-t-xl relative">
          <button 
            onClick={onClose}
            className="absolute right-6 top-6 text-white hover:text-indigo-100"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>          <h2 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">Retirement Calculator</h2>
          <p className="text-indigo-100 text-sm sm:text-base">
            Plan your retirement by understanding how much you need to save to maintain your desired lifestyle.
          </p>
        </div>
        
        {/* Calculator Form */}
        <div className="p-4 md:p-5">
          {!showResults ? (            <form onSubmit={(e) => {
              e.preventDefault();
              calculateRetirement();
            }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {/* Current Age */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Age
                  </label>
                  <div className="mb-4">
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      value={currentAge}
                      onChange={(e) => setCurrentAge(Number(e.target.value))}
                      min="18"
                      max="70"
                    />
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                    <div className="relative">
                      <input
                        type="range"
                        min="18"
                        max="70"
                        value={currentAge}
                        onChange={(e) => setCurrentAge(Number(e.target.value))}
                        className="absolute w-full h-2 appearance-none bg-transparent cursor-pointer"
                      />
                      <div 
                        className="bg-indigo-500 h-2 rounded-full" 
                        style={{ width: `${((currentAge - 18) / 52) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>18</span>
                    <span>70</span>
                  </div>
                </div>

                {/* Retirement Age */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Retirement Age
                  </label>
                  <div className="mb-4">
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      value={retirementAge}
                      onChange={(e) => setRetirementAge(Number(e.target.value))}
                      min="45"
                      max="80"
                    />
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                    <div className="relative">
                      <input
                        type="range"
                        min="45"
                        max="80"
                        value={retirementAge}
                        onChange={(e) => setRetirementAge(Number(e.target.value))}
                        className="absolute w-full h-2 appearance-none bg-transparent cursor-pointer"
                      />
                      <div 
                        className="bg-orange-500 h-2 rounded-full" 
                        style={{ width: `${((retirementAge - 45) / 35) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>45</span>
                    <span>80</span>
                  </div>
                </div>

                {/* Life Expectancy */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Life Expectancy
                  </label>
                  <div className="mb-4">
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      value={lifeExpectancy}
                      onChange={(e) => setLifeExpectancy(Number(e.target.value))}
                      min="60"
                      max="100"
                    />
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                    <div className="relative">
                      <input
                        type="range"
                        min="60"
                        max="100"
                        value={lifeExpectancy}
                        onChange={(e) => setLifeExpectancy(Number(e.target.value))}
                        className="absolute w-full h-2 appearance-none bg-transparent cursor-pointer"
                      />
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${((lifeExpectancy - 60) / 40) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>60</span>
                    <span>100</span>
                  </div>
                </div>

                {/* Monthly Expense */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Monthly Expense (₹)
                  </label>
                  <div className="mb-4">
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      value={monthlyExpense}
                      onChange={(e) => setMonthlyExpense(Number(e.target.value))}
                      min="10000"
                      max="1000000"
                      step="1000"
                    />
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                    <div className="relative">
                      <input
                        type="range"
                        min="10000"
                        max="500000"
                        step="1000"
                        value={monthlyExpense}
                        onChange={(e) => setMonthlyExpense(Number(e.target.value))}
                        className="absolute w-full h-2 appearance-none bg-transparent cursor-pointer"
                      />
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${(monthlyExpense / 500000) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>₹10k</span>
                    <span>₹5L</span>
                  </div>
                </div>

                {/* Current Retirement Corpus */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Retirement Corpus (₹)
                  </label>
                  <div className="mb-4">
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      value={currentCorpus}
                      onChange={(e) => setCurrentCorpus(Number(e.target.value))}
                      min="0"
                      max="10000000"
                      step="10000"
                    />
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                    <div className="relative">
                      <input
                        type="range"
                        min="0"
                        max="10000000"
                        step="10000"
                        value={currentCorpus}
                        onChange={(e) => setCurrentCorpus(Number(e.target.value))}
                        className="absolute w-full h-2 appearance-none bg-transparent cursor-pointer"
                      />
                      <div 
                        className="bg-purple-500 h-2 rounded-full" 
                        style={{ width: `${(currentCorpus / 10000000) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>₹0</span>
                    <span>₹1Cr</span>
                  </div>
                </div>

                {/* Expected Return */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expected Return on Investment (%)
                  </label>
                  <div className="mb-4">
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      value={expectedReturn}
                      onChange={(e) => setExpectedReturn(Number(e.target.value))}
                      min="6"
                      max="15"
                      step="0.5"
                    />
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                    <div className="relative">
                      <input
                        type="range"
                        min="6"
                        max="15"
                        step="0.5"
                        value={expectedReturn}
                        onChange={(e) => setExpectedReturn(Number(e.target.value))}
                        className="absolute w-full h-2 appearance-none bg-transparent cursor-pointer"
                      />
                      <div 
                        className="bg-yellow-500 h-2 rounded-full" 
                        style={{ width: `${((expectedReturn - 6) / 9) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>6%</span>
                    <span>15%</span>
                  </div>
                </div>

                {/* Expense Factor */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    Expense Factor (%)
                    <div className="relative ml-1 group">
                      <svg className="w-4 h-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                      </svg>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block w-64 bg-black text-white text-xs rounded p-2">
                        Percentage of current expenses you expect to need during retirement. Lower values mean a more frugal lifestyle.
                      </div>
                    </div>
                  </label>
                  <div className="mb-4">
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      value={expenseFactor}
                      onChange={(e) => setExpenseFactor(Number(e.target.value))}
                      min="50"
                      max="100"
                    />
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                    <div className="relative">
                      <input
                        type="range"
                        min="50"
                        max="100"
                        value={expenseFactor}
                        onChange={(e) => setExpenseFactor(Number(e.target.value))}
                        className="absolute w-full h-2 appearance-none bg-transparent cursor-pointer"
                      />
                      <div 
                        className="bg-red-500 h-2 rounded-full" 
                        style={{ width: `${((expenseFactor - 50) / 50) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>

              {/* Footer note */}
              <div className="mt-4 text-xs text-gray-500">
                <p>* Inflation has been assumed at 6% for calculation purposes</p>
              </div>

              {/* Action buttons */}              <div className="flex justify-end gap-2 sm:gap-3 mt-4 sm:mt-5">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3 sm:px-5 py-1.5 sm:py-2 text-sm sm:text-base bg-gray-200 hover:bg-gray-300 rounded-md font-medium transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 sm:px-6 py-1.5 sm:py-2 text-sm sm:text-base bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-medium transition-colors duration-200"
                >
                  Calculate
                </button>
              </div>
            </form>
          ) : (
            <div className="py-4">
              {/* Results Section */}              <div className="bg-indigo-50 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
                <h3 className="text-base sm:text-lg font-semibold text-indigo-800 mb-3 sm:mb-4">Your Retirement Plan</h3>
                
                <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">                  <div className="bg-white rounded-lg p-3 sm:p-5 shadow-sm">
                    <div className="text-gray-600 text-xs sm:text-sm mb-1">Corpus Required at Retirement</div>
                    <div className="text-indigo-700 text-lg sm:text-2xl font-bold">₹{formatNumber(requiredCorpus)}</div>
                    <div className="text-gray-500 text-xs mt-1">
                      Target amount needed by age {retirementAge}
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-5 shadow-sm">
                    <div className="text-gray-600 text-sm mb-1">Monthly Investment Needed</div>
                    <div className="text-indigo-700 text-2xl font-bold">₹{formatNumber(monthlySavingsRequired)}</div>
                    <div className="text-gray-500 text-xs mt-1">
                      Required monthly savings for next {retirementAge - currentAge} years
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-5 shadow-sm">
                    <div className="text-gray-600 text-sm mb-1">Years Until Retirement</div>
                    <div className="text-indigo-700 text-2xl font-bold">{retirementAge - currentAge} years</div>
                    <div className="text-gray-500 text-xs mt-1">
                      Time left to build your retirement corpus
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-5 shadow-sm">
                    <div className="text-gray-600 text-sm mb-1">Post-Retirement Duration</div>
                    <div className="text-indigo-700 text-2xl font-bold">{lifeExpectancy - retirementAge} years</div>
                    <div className="text-gray-500 text-xs mt-1">
                      Expected retirement period to be covered by your corpus
                    </div>
                  </div>
                </div>
                
                {/* Info section */}
                <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <div className="flex items-start">
                    <div className="text-blue-500 mr-3 mt-0.5">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-sm text-blue-700">
                      This calculation is a useful guideline but actual results may vary based on market performance, 
                      inflation rates, and lifestyle changes. We recommend reviewing your retirement plan regularly with our advisors.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Action buttons */}              <div className="flex flex-wrap justify-end gap-2 sm:gap-3">
                <button
                  onClick={() => setShowResults(false)}
                  className="px-3 sm:px-5 py-1.5 sm:py-2 text-sm sm:text-base bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-md font-medium transition-colors duration-200"
                >
                  Update Values
                </button>
                <button
                  onClick={() => {
                    window.alert("A financial advisor will contact you soon to discuss your retirement planning options.");
                    onClose();
                  }}
                  className="px-4 sm:px-6 py-1.5 sm:py-2 text-sm sm:text-base bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-medium transition-colors duration-200"
                >
                  Talk to an Advisor
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

RetirementCalculator.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default RetirementCalculator;
