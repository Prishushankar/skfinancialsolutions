import { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import EmailForm from './EmailForm';

// Enhanced SVG Components
const FinancialSupportSVG = () => {
  const buildingControls = useAnimation();
  const graphControls = useAnimation();
  
  useEffect(() => {
    const sequence = async () => {
      await buildingControls.start({ height: 250, transition: { duration: 0.8, ease: "easeInOut" }});
      return await graphControls.start({ scale: 1, opacity: 1, transition: { duration: 0.5 }});
    };
    sequence();
    
    // Start looping animation for graph
    const interval = setInterval(() => {
      graphControls.start({
        pathLength: [0, 1],
        transition: { duration: 1.5, ease: "easeInOut" }
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, [buildingControls, graphControls]);
  
  return (
    <svg
      viewBox="0 0 500 400" 
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <defs>
        <linearGradient id="buildingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f0f4f8" />
          <stop offset="100%" stopColor="#e2e8f0" />
        </linearGradient>
        
        <linearGradient id="graphGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#2e38f2" />
        </linearGradient>
        
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Building/Office with gradient */}
        <motion.rect
          x="100" y="100"
          width="300" height="250"
          fill="url(#buildingGradient)"
          stroke="#2e38f2"
          strokeWidth="2"
          initial={{ height: 0 }}
          animate={buildingControls}
          rx="8" 
          ry="8"
        />
        
        {/* Windows with better shading */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8, staggerChildren: 0.1 }}
        >
          {[
            {x: 130, y: 130},
            {x: 200, y: 130},
            {x: 270, y: 130},
            {x: 130, y: 200},
            {x: 270, y: 200}
          ].map((pos, i) => (
            <motion.rect
              key={i}
              x={pos.x} y={pos.y}
              width="50" height="50"
              fill="#d4e6ff"
              stroke="#2e38f2"
              strokeWidth="1"
              rx="4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.8 + (i * 0.1) }}
              whileHover={{ fill: "#bfd4ff", transition: { duration: 0.2 } }}
            />
          ))}
        </motion.g>
        
        {/* Financial graphs/charts with interactive animation */}
        <motion.g
          initial={{ opacity: 0, scale: 0.9 }}
          animate={graphControls}
        >
          <rect x="200" y="200" width="50" height="50" fill="#d4e6ff" stroke="#2e38f2" strokeWidth="1" rx="4" />
          
          <motion.path 
            d="M205,235 C210,228 215,220 220,225 C225,230 230,215 235,210 C240,218 245,225" 
            stroke="url(#graphGradient)" 
            strokeWidth="3" 
            fill="none"
            filter="url(#glow)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 1.5 }}
          />
          
          {/* Data points */}
          {[205, 215, 225, 235, 245].map((x, i) => {
            const y = [235, 220, 230, 210, 225][i];
            return (
              <motion.circle 
                key={i} 
                cx={x} 
                cy={y} 
                r="3" 
                fill="#2e38f2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.7 + (i * 0.1) }}
              />
            );
          })}
        </motion.g>
        
        {/* Door with hover effect */}
        <motion.rect
          x="220" y="290"
          width="60" height="60"
          fill="#d4e6ff"
          stroke="#2e38f2"
          strokeWidth="1.5"
          rx="4"
          initial={{ y: 350 }}
          animate={{ y: 290 }}
          whileHover={{ fill: "#bfd4ff", scale: 1.03, transition: { duration: 0.2 } }}
          transition={{ duration: 0.7, delay: 0.9 }}
        />
        
        {/* Currency symbols floating around with improved animation */}
        <motion.g>
          {[
            { symbol: "₹", x: 160, y: 90, color: "#2e38f2", delay: 0 },
            { symbol: "₹", x: 320, y: 90, color: "#10B981", delay: 0.5 },
            { symbol: "$", x: 80, y: 180, color: "#2e38f2", delay: 0.8 },
            { symbol: "₹", x: 400, y: 150, color: "#10B981", delay: 1.2 },
            { symbol: "€", x: 120, y: 60, color: "#2e38f2", delay: 1.5 }
          ].map((item, i) => (
            <motion.text
              key={i}
              x={item.x}
              y={item.y}
              fontSize="22"
              fontWeight="bold"
              fill={item.color}
              filter="url(#glow)"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                y: [item.y, item.y - 15, item.y],
                x: [item.x, item.x + ((i % 2 === 0) ? 10 : -10), item.x]
              }}
              transition={{
                opacity: { delay: item.delay, duration: 0.5 },
                scale: { delay: item.delay, duration: 0.5 },
                y: { 
                  delay: item.delay + 0.5,
                  duration: 4, 
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                },
                x: { 
                  delay: item.delay + 0.5,
                  duration: 5, 
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }
              }}
            >
              {item.symbol}
            </motion.text>
          ))}
        </motion.g>
        
        {/* Growth arrows */}
        <motion.g>
          {[
            { x: 90, y: 140, rotation: 45 },
            { x: 380, y: 180, rotation: 30 },
            { x: 410, y: 260, rotation: 60 }
          ].map((arrow, i) => (
            <motion.path
              key={i}
              d="M0,10 L10,0 L20,10"
              strokeWidth="3"
              stroke="#10B981"
              fill="none"
              transform={`translate(${arrow.x}, ${arrow.y}) rotate(${arrow.rotation})`}
              initial={{ opacity: 0, pathLength: 0 }}
              animate={{ opacity: 1, pathLength: 1 }}
              transition={{ 
                delay: 2 + (i * 0.3),
                duration: 0.8
              }}
            />
          ))}
        </motion.g>
      </motion.g>
    </svg>
  );
};

// Interactive Chat Bubble Animation
const ChatBubbleAnimation = () => {
  return (
    <div className="relative h-32 w-full">
      <motion.div
        className="absolute right-16 top-0 bg-blue-500 text-white p-3 rounded-lg rounded-tr-none"
        initial={{ opacity: 0, y: 20, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <p className="text-sm">How can I help with your financial goals?</p>
      </motion.div>
      
      <motion.div
        className="absolute left-16 top-16 bg-gray-200 text-gray-800 p-3 rounded-lg rounded-tl-none"
        initial={{ opacity: 0, y: 20, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 1.3, duration: 0.5 }}
      >
        <p className="text-sm">I&apos;m interested in retirement planning.</p>
      </motion.div>
    </div>
  );
};

// Financial Growth Animation
const FinancialGrowthAnimation = () => {
  const chartRef = useRef(null);
  
  return (
    <div className="relative h-40 w-full overflow-hidden rounded-xl bg-gradient-to-r from-slate-50 to-blue-50 p-4">
      <motion.h4 
        className="text-sm font-semibold text-gray-700 mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Your Investment Growth
      </motion.h4>
      
      <svg ref={chartRef} className="w-full h-24" viewBox="0 0 300 100">
        {/* X and Y axis */}
        <motion.line x1="0" y1="80" x2="300" y2="80" stroke="#94a3b8" strokeWidth="1" 
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6 }}
        />
        <motion.line x1="0" y1="0" x2="0" y2="80" stroke="#94a3b8" strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6 }}
        />
        
        {/* Growth path */}
        <motion.path
          d="M0,80 C20,75 40,70 60,65 S100,55 120,40 S160,25 180,20 S240,10 300,5"
          fill="none"
          stroke="#2e38f2"
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.8, duration: 1.5, ease: "easeInOut" }}
        />
        
        {/* Area under the curve with gradient */}
        <motion.path
          d="M0,80 C20,75 40,70 60,65 S100,55 120,40 S160,25 180,20 S240,10 300,5 L300,80 Z"
          fill="url(#chartGradient)"
          opacity="0.2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ delay: 2, duration: 0.8 }}
        />
        
        <defs>
          <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2e38f2" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        
        {/* Data points */}
        {[
          { x: 0, y: 80 },
          { x: 60, y: 65 },
          { x: 120, y: 40 },
          { x: 180, y: 20 },
          { x: 300, y: 5 }
        ].map((point, i) => (
          <motion.circle
            key={i}
            cx={point.x}
            cy={point.y}
            r="4"
            fill="#2e38f2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 2.2 + (i * 0.1) }}
          />
        ))}
      </svg>
      
      <div className="flex justify-between mt-1 text-xs text-gray-500">
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}>Now</motion.span>
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.7 }}>5Y</motion.span>
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.9 }}>10Y</motion.span>
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.1 }}>15Y</motion.span>
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.3 }}>20Y</motion.span>
      </div>
    </div>
  );
};

const Contact = () => {
  // Form data and UI state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    message: "",
    service: "mutual-funds",
  });
  
  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [typingField, setTypingField] = useState(null);
  const [showAssistant, setShowAssistant] = useState(false);
  const [showTips, setShowTips] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const [showCalculator, setShowCalculator] = useState(false);
  const formRef = useRef(null);
  
  const interestRate = useRef(8);
  const [calculatorValues, setCalculatorValues] = useState({
    principal: 10000,
    years: 10
  });
  
  // Financial tips content
  const financialTips = {
    "mutual-funds": "Consider SIP for long-term wealth creation with rupee cost averaging.",
    "insurance": "Term insurance offers high coverage at affordable premiums.",
    "loans": "Compare interest rates and processing fees across multiple lenders.",
    "tax-planning": "ELSS mutual funds offer tax benefits under Section 80C with potentially higher returns.",
    "retirement": "Start early and leverage the power of compounding for your retirement corpus."
  };
  
  // Service options
  const serviceOptions = [
    { value: "mutual-funds", label: "Mutual Funds", icon: "📈" },
    { value: "insurance", label: "Insurance", icon: "🛡️" },
    { value: "loans", label: "Loans", icon: "💰" },
    { value: "tax-planning", label: "Tax Planning", icon: "📋" },
    { value: "retirement", label: "Retirement Planning", icon: "🏖️" },
  ];
  
  // Virtual Assistant Messages
  const [assistantMessages, setAssistantMessages] = useState([
    { type: 'assistant', text: "Hello! How can I help with your financial planning today?", id: 1 }
  ]);
  
  // Show calculator animation based on service selection
  useEffect(() => {
    if (formData.service === 'mutual-funds' || formData.service === 'retirement') {
      setTimeout(() => {
        setShowCalculator(true);
      }, 500);
    } else {
      setShowCalculator(false);
    }
  }, [formData.service]);
  
  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/i.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = "Phone must be 10 digits";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Start typing animation
    setTypingField(name);
    setTimeout(() => setTypingField(null), 1000);
    
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Show financial tips when selecting a service
    if (name === 'service') {
      setShowTips({ [name]: true });
      setTimeout(() => {
        setShowTips({});
      }, 6000);
    }
    
    // Simulate assistant response when user fills out more than 2 fields
    if (Object.values(formData).filter(Boolean).length >= 2 && !showAssistant) {
      setTimeout(() => {
        setShowAssistant(true);
        setTimeout(() => {
          setAssistantMessages(prev => [
            ...prev, 
            { 
              type: 'assistant', 
              text: `I see you're interested in ${serviceOptions.find(opt => opt.value === formData.service).label}. Can I help you with any specific questions?`, 
              id: 2 
            }
          ]);
        }, 800);
      }, 2000);
    }
    
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };
  
  // Progress to next step in multi-step form
  const handleNext = (e) => {
    e.preventDefault();
    
    const fieldsToValidateInStep1 = ['name', 'email', 'phone'];
    const step1Errors = {};
    
    fieldsToValidateInStep1.forEach(field => {
      if (!formData[field].trim()) {
        step1Errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      } else if (field === 'email' && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
        step1Errors.email = "Invalid email address";
      } else if (field === 'phone' && !/^\d{10}$/i.test(formData.phone.replace(/\s/g, ''))) {
        step1Errors.phone = "Phone must be 10 digits";
      }
    });
    
    setErrors(step1Errors);
    
    if (Object.keys(step1Errors).length === 0) {
      // Add an assistant message when proceeding to the next step
      setAssistantMessages(prev => [
        ...prev, 
        { 
          type: 'assistant', 
          text: "Great! Now please tell us more about how we can help you.", 
          id: 3 
        }
      ]);
      
      // Smooth scroll to top of form
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      
      setCurrentStep(2);
    }
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Add user message to chat
      const userMessage = `I'm interested in ${serviceOptions.find(opt => opt.value === formData.service).label}. ${formData.message}`;
      setAssistantMessages(prev => [...prev, { type: 'user', text: userMessage, id: 4 }]);
      
      // Simulating form submission
      setTimeout(() => {
        setIsSubmitting(false);
        setAssistantMessages(prev => [
          ...prev, 
          { 
            type: 'assistant', 
            text: "Thank you for sharing your financial goals. Our team will contact you soon!", 
            id: 5 
          }
        ]);
        
        setTimeout(() => {
          setIsSubmitted(true);
        }, 1500);
      }, 1500);
    }
  };
  
  // Handle going back to first step
  const handleBack = (e) => {
    e.preventDefault();
    setCurrentStep(1);
  };
  
  // Handle calculator value changes
  const handleCalculatorChange = (e) => {
    const { name, value } = e.target;
    setCalculatorValues(prev => ({
      ...prev,
      [name]: Number(value)
    }));
  };
  
  // Calculate future value
  const getFutureValue = () => {
    const { principal, years } = calculatorValues;
    const rate = interestRate.current / 100;
    return Math.round(principal * Math.pow(1 + rate, years));
  };
  
  // Add user message to chat
  const addUserMessage = (text) => {
    setAssistantMessages(prev => [...prev, { type: 'user', text, id: Date.now() }]);
    
    // Simulate assistant thinking and response
    setTimeout(() => {
      const responses = {
        "tell me more about mutual funds": "Mutual funds pool money from investors to invest in stocks, bonds, or other assets. They're managed by professionals and offer diversification, even for small investments.",
        "what about tax planning": "Effective tax planning can help you save money through legitimate deductions and exemptions. ELSS funds, PPF, and NPS are popular tax-saving instruments in India.",
        "retirement planning options": "For retirement planning, consider options like NPS, PPF, or retirement mutual funds. Starting early is key to building a substantial corpus through the power of compounding."
      };
      
      const bestResponse = Object.entries(responses).reduce((best, [key, response]) => {
        const similarity = [...text.toLowerCase().matchAll(key)].length;
        return similarity > best.similarity ? { text: response, similarity } : best;
      }, { text: "Thank you for your interest. An advisor will contact you with more details about your query.", similarity: 0 });
      
      setAssistantMessages(prev => [...prev, { 
        type: 'assistant', 
        text: bestResponse.text, 
        id: Date.now() + 1 
      }]);
    }, 1500);
  };
  
  const inputClasses = "w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 bg-white";
  const labelClasses = "block text-sm font-medium text-text-secondary mb-1";

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    },
  };
  
  // Quick response options
  const quickResponses = [
    "Tell me more about mutual funds",
    "What about tax planning",
    "Retirement planning options"
  ];

  return (
    <div className="w-full bg-gradient-to-b from-white to-gray-50 py-16 lg:py-24 font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">Get in Touch With Us</h1>
          <p className="text-text-secondary max-w-2xl mx-auto text-lg">
            Have questions about financial planning or investment strategies? Our expert team is here to help you achieve your financial goals.
          </p>
        </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left side: Illustration */}
          <motion.div
            className="hidden lg:block h-[400px]"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="bg-white rounded-2xl p-8 h-full shadow-lg border border-gray-100 flex items-center justify-center">
              <FinancialSupportSVG />
            </div>
          </motion.div>
          
          {/* Right side: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="w-full"
          >
            <EmailForm />
          </motion.div>
        </div>
        
        {/* Contact details cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          {/* Location */}
          <motion.div 
            className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex items-start"
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            transition={{ duration: 0.2 }}
          >
            <div className="mr-4 bg-primary/10 p-3 rounded-full">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-text-primary mb-1">Our Office</h3>
              <p className="text-text-secondary">
                SK Financial Solutions<br />
                Jagdeopath<br />
                Patna, Bihar 800014<br />
              </p>
            </div>
          </motion.div>
          
          {/* Email */}
          <motion.div 
            className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex items-start"
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            transition={{ duration: 0.2 }}
          >
            <div className="mr-4 bg-primary/10 p-3 rounded-full">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-text-primary mb-1">Email Us</h3>
              <p className="text-text-secondary mb-1">skfinancialsolutions2025@gmail.com</p>
              <p className="text-text-secondary"></p>
            </div>
          </motion.div>
          
          {/* Phone */}
          <motion.div 
            className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex items-start"
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            transition={{ duration: 0.2 }}
          >
            <div className="mr-4 bg-primary/10 p-3 rounded-full">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-text-primary mb-1">Call Us</h3>
              <p className="text-text-secondary mb-1">+91 9199200558</p>
              <p className="text-text-secondary">+91 9431383133</p>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Google Map */}
        <motion.div 
          className="mt-16 h-96 rounded-xl overflow-hidden shadow-lg border border-gray-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3598.0023362684497!2d85.06990667485074!3d25.604838615070097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed57b7ccb91ac3%3A0x8ea51cae7154dddd!2sJagdeo%20Path%2C%20Patna%2C%20Bihar!5e0!3m2!1sen!2sin!4v1750302056661!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
