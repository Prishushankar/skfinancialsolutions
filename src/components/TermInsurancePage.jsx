import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const TermInsurancePage = ({ onClose }) => {
  // State for form data
  const [gender, setGender] = useState('male');
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [coverageAmount, setCoverageAmount] = useState('1');  // in Crores
  const [monthlyPremium, setMonthlyPremium] = useState('487');
  const [emailSent, setEmailSent] = useState(false);
  const [whatsappUpdates, setWhatsappUpdates] = useState(true);
  const [formErrors, setFormErrors] = useState({});
  
  // Calculate premium based on coverage and other factors
  useEffect(() => {
    // This is a simplified calculation just for demonstration
    // In a real app, this would come from an API or more complex calculation
    const baseRate = 487;
    const coverageMultiplier = parseFloat(coverageAmount);
    const genderMultiplier = gender === 'female' ? 0.9 : 1; // Women generally get lower rates
    
    const calculatedPremium = Math.round(baseRate * coverageMultiplier * genderMultiplier);
    setMonthlyPremium(calculatedPremium.toString());
  }, [coverageAmount, gender]);
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    const errors = {};
    
    if (!name.trim()) {
      errors.name = "Name is required";
    }
    
    if (!birthDate) {
      errors.birthDate = "Date of birth is required";
    } else {
      // Calculate age
      const today = new Date();
      const birthDateObj = new Date(birthDate);
      let age = today.getFullYear() - birthDateObj.getFullYear();
      const monthDiff = today.getMonth() - birthDateObj.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
        age--;
      }
      
      if (age < 18) {
        errors.birthDate = "You must be at least 18 years old";
      } else if (age > 65) {
        errors.birthDate = "Maximum age for term insurance is 65 years";
      }
    }
    
    if (!phoneNumber.trim()) {
      errors.phoneNumber = "Phone number is required";
    } else if (!/^[6-9]\d{9}$/.test(phoneNumber.trim())) {
      errors.phoneNumber = "Please enter a valid 10-digit Indian mobile number";
    }
    
    setFormErrors(errors);
    
    // If no errors, proceed with form submission
    if (Object.keys(errors).length === 0) {
      // In a real application, you would send this data to your backend
      const formData = {
        gender,
        name,
        birthDate,
        phoneNumber,
        coverageAmount: `₹${coverageAmount} Crore`,
        monthlyPremium: `₹${monthlyPremium}`,
        whatsappUpdates
      };
      
      console.log('Form submitted with data:', formData);
      
      // Simulate sending email
      setEmailSent(true);
      
      // You could also reset form here if needed
      // setTimeout(() => {
      //   setEmailSent(false);
      //   onClose();
      // }, 3000);
    }
  };  return (
    <div className="fixed inset-0 bg-gray-900/70 flex items-center justify-center z-50 p-1 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-[95%] sm:w-full max-w-7xl h-auto flex flex-col md:flex-row">{/* Left Section - Information */}
        <div className="bg-navy-700 text-white p-3 sm:p-5 md:w-2/5">
          <button 
            onClick={onClose}
            className="absolute left-4 top-4 md:hidden text-white hover:text-blue-200"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 md:mb-4">Term Insurance</h2>
          <p className="text-blue-100 mb-3 sm:mb-4 text-xs sm:text-sm md:text-base">
            Term insurance is the most basic type of life insurance. It offers financial cover for a specific tenure, called the policy term, in exchange for fixed premiums. Term insurance plan secures the financial future of your loved ones in your absence.
          </p>
          
          <div className="mt-4 md:mt-6">            <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 border-l-4 border-blue-400 pl-2">Benefits of Term Insurance:</h3>
            <ul className="space-y-1.5 sm:space-y-2 md:space-y-3">
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 mt-0.5 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold">+</span>
                </div>
                <span className="ml-3">High Coverage at Low Premium</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 mt-0.5 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold">+</span>
                </div>
                <span className="ml-3">Save Upto 15%* Online Discount</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 mt-0.5 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold">+</span>
                </div>
                <span className="ml-3">Dedicated Claim Assistance</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 mt-0.5 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold">+</span>
                </div>
                <span className="ml-3">Tax-Free Life Cover Amount</span>
              </li>
            </ul>
          </div>
            <div className="mt-4 md:mt-6 grid grid-cols-2 gap-3 md:gap-4">
            <div className="bg-navy-800 p-3 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="p-2 bg-blue-500/20 rounded mr-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 16V8C16 5.79086 14.2091 4 12 4V4C9.79086 4 8 5.79086 8 8V16" stroke="#90CAF9" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M20 16H4C2.89543 16 2 16.8954 2 18V20C2 20.5523 2.44772 21 3 21H21C21.5523 21 22 20.5523 22 20V18C22 16.8954 21.1046 16 20 16Z" stroke="#90CAF9" strokeWidth="1.5"/>
                  </svg>
                </div>
                <div>
                  <div className="font-semibold">15 lakh</div>
                  <div className="text-xs text-blue-200">Families Secured</div>
                </div>
              </div>
            </div>
            <div className="bg-navy-800 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="p-2 bg-blue-500/20 rounded mr-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#90CAF9" strokeWidth="1.5"/>
                    <path d="M12 6V12L16 14" stroke="#90CAF9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <div className="font-semibold">₹13,50,000 Crore</div>
                  <div className="text-xs text-blue-200">of Life Cover Assured</div>
                </div>
              </div>
            </div>
          </div>
            <div className="mt-4 md:mt-6 flex items-center">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <div className="ml-2">
              <span className="font-bold">4.8</span>
              <span className="text-sm text-blue-200 ml-2">501 Reviews</span>
            </div>
          </div>
        </div>
          {/* Right Section - Form */}
        <div className="p-3 sm:p-5 md:w-3/5 relative">
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>          <div className="mb-4 md:mb-6">
            <div className="mb-2">
              <span className="text-xl md:text-2xl font-semibold text-blue-600">₹{coverageAmount} Crore</span>
              <span className="ml-2 text-gray-600">Life cover starting from</span>
              <span className="ml-2 text-blue-600 font-semibold">₹{monthlyPremium}/month</span>
              <span className="text-blue-600 text-xs align-top">+</span>
            </div>
            <div className="inline-block bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm">
              <span className="mr-1">🔍</span> Lowest Price Guarantee*
            </div>
          </div>
            {/* Coverage Amount Selection */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1.5">Coverage Amount</label>
            <div className="grid grid-cols-4 gap-1.5 md:gap-2">
              {['1', '2', '3', '5'].map((amount) => (
                <button
                  key={amount}
                  type="button"
                  className={`py-1.5 md:py-2 text-sm border ${coverageAmount === amount ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-300 text-gray-600'} rounded-md hover:bg-blue-50 transition-colors`}
                  onClick={() => setCoverageAmount(amount)}
                >
                  ₹{amount} Crore
                </button>
              ))}
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-2 md:space-y-3">
            {/* Gender Selection */}
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  className="h-5 w-5 text-blue-600"
                  checked={gender === 'male'}
                  onChange={() => setGender('male')}
                />
                <span className="ml-2 text-gray-700">Male</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="radio"
                  className="h-5 w-5 text-blue-600"
                  checked={gender === 'female'}
                  onChange={() => setGender('female')}
                />
                <span className="ml-2 text-gray-700">Female</span>
              </label>
            </div>
              {/* Name Input */}
            <div>
              <div className="relative rounded-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>                <input
                  type="text"
                  className={`w-full pl-10 pr-4 py-2 md:py-2.5 border ${formErrors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="Name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (formErrors.name) {
                      setFormErrors({...formErrors, name: null});
                    }
                  }}
                  required
                />
              </div>
              {formErrors.name && <p className="mt-1 text-red-500 text-sm">{formErrors.name}</p>}
            </div>
            
            {/* Date of Birth */}
            <div>
              <div className="relative rounded-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                </div>                <input
                  type="date"
                  className={`w-full pl-10 pr-4 py-2 md:py-2.5 border ${formErrors.birthDate ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="Date of Birth"
                  value={birthDate}
                  onChange={(e) => {
                    setBirthDate(e.target.value);
                    if (formErrors.birthDate) {
                      setFormErrors({...formErrors, birthDate: null});
                    }
                  }}
                  max={new Date().toISOString().split('T')[0]} /* Prevent selecting future dates */
                  required
                />
              </div>
            </div>
            
            {/* Phone Number */}
            <div>
              <div className="relative rounded-md flex">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <div className="absolute inset-y-0 left-10 flex items-center pointer-events-none">
                  <span className="text-gray-500 border-r pr-3">+91</span>
                </div>                <input
                  type="tel"
                  className={`w-full pl-24 pr-4 py-2 md:py-2.5 border ${formErrors.phoneNumber ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="Mobile Number"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                    if (formErrors.phoneNumber) {
                      setFormErrors({...formErrors, phoneNumber: null});
                    }
                  }}
                  required
                />
              </div>
            </div>
            
            {/* WhatsApp Updates */}
            <div className="flex items-center">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-5 w-5 text-blue-600 rounded"
                  checked={whatsappUpdates}
                  onChange={() => setWhatsappUpdates(!whatsappUpdates)}
                />
                <div className="ml-2 flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-green-500 mr-1" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span>Get Updates on WhatsApp</span>
                </div>
              </label>
              
              <div className="ml-2 relative">
                <div className={`w-12 h-6 ${whatsappUpdates ? 'bg-green-500' : 'bg-gray-200'} rounded-full flex items-center px-1 transition-colors duration-300`}>
                  <div className={`w-4 h-4 bg-white rounded-full transform transition-transform duration-300 ${whatsappUpdates ? 'translate-x-6' : ''}`}></div>
                </div>
              </div>
            </div>
              {/* Expert assistance note */}
            <div className="flex items-start border border-gray-200 p-2 rounded-lg bg-blue-50">
              <div className="flex-shrink-0 mr-2 mt-1">
                <svg className="h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="text-xs md:text-sm text-gray-600">
                Only certified SK Financial Solutions expert will assist you
              </div>
            </div>
            
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2.5 md:py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow transition-colors focus:ring focus:ring-blue-300"
            >
              Check Your Premium Now
            </button>
          </form>          {/* Success Message */}
          {emailSent && (
            <div className="absolute inset-0 bg-white bg-opacity-90 flex flex-col items-center justify-center p-4 md:p-6">
              <div className="h-12 w-12 md:h-14 md:w-14 bg-green-100 rounded-full flex items-center justify-center mb-3">
                <svg className="h-8 w-8 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">Thank you for your request!</h3>
              <p className="text-center text-sm md:text-base text-gray-600 mb-4">An SK Financial Solutions advisor will contact you shortly with your personalized term insurance quote.</p>
              <button
                onClick={onClose}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow transition-colors"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

TermInsurancePage.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default TermInsurancePage;
