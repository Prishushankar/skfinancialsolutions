import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from '@formspree/react';

const EmailForm = () => {
  const [state, handleSubmit] = useForm("xjkrojop"); // Replace with your actual Formspree form ID
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [focusedField, setFocusedField] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    service: 'mutual-funds',
    message: ''
  });

  // Service options for the dropdown
  const serviceOptions = [
    { value: "mutual-funds", label: "Mutual Funds" },
    { value: "insurance", label: "Insurance" },
    { value: "loans", label: "Loans" },
    { value: "tax-planning", label: "Tax Planning" },
    { value: "retirement", label: "Retirement Planning" },
  ];
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: undefined
      });
    }
  };

  // Validate form inputs
  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) errors.name = "Name is required";
    
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      errors.email = "Invalid email address";
    }
    
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^\d{10}$/i.test(formData.phone.replace(/\s/g, ''))) {
      errors.phone = "Phone must be 10 digits";
    }
    
    if (!formData.message.trim()) errors.message = "Message is required";
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };  // Handle form submission using Formspree React hook
  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Using Formspree React hook to handle form submissions
      const formData1 = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        service: serviceOptions.find(option => option.value === formData.service)?.label || formData.service,
        message: formData.message
      };
      
      handleSubmit(formData1);
    }
  };
  
  // Handle Formspree submission state changes
  React.useEffect(() => {
    if (state.succeeded) {
      setIsSubmitted(true);
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        city: '',
        service: 'mutual-funds',
        message: ''
      });
    } else if (state.errors && state.errors.length > 0) {
      setFormErrors({
        ...formErrors,
        submit: 'Failed to send message. Please try again or contact us directly.'
      });
    }
  }, [state.succeeded, state.errors, formErrors]);

  // CSS classes for consistent styling
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
  return isSubmitted ? (
    <motion.div 
      className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="mx-auto w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 500, delay: 0.2 }}
      >
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </motion.div>
      <h2 className="text-2xl font-bold text-text-primary mb-4">Thank You!</h2>
      <p className="text-text-secondary mb-6">
        We&apos;ve received your message and will get back to you shortly.
      </p>
      <motion.button
        className="bg-primary text-white hover:bg-primary-dark px-6 py-3 rounded-lg font-medium transition-all duration-200"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsSubmitted(false)}
      >
        Send Another Message
      </motion.button>
    </motion.div>
  ) : (    <motion.form
      onSubmit={handleFormSubmit}
      className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Display form-wide errors */}
      {formErrors.submit && (
        <motion.div 
          className="mb-6 bg-red-50 border border-red-200 text-red-600 rounded-lg p-4 text-sm"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {formErrors.submit}
        </motion.div>
      )}
      
      <motion.div className="mb-5" variants={itemVariants}>
        <label htmlFor="user_name" className={labelClasses}>
          Full Name
        </label>
        <motion.div
          animate={{
            boxShadow: focusedField === "name" ? "0 0 0 2px rgba(46, 56, 242, 0.3)" : "none",
          }}
        >            <input
              type="text"              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onFocus={() => setFocusedField("name")}
              onBlur={() => setFocusedField(null)}
              className={`${inputClasses} ${formErrors.name ? "border-red-500" : "border-gray-200"}`}
              placeholder="John Doe"
            />
          </motion.div>
        {formErrors.name && (
          <motion.p
            className="mt-1 text-sm text-red-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {formErrors.name}
          </motion.p>
        )}
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <motion.div className="mb-5" variants={itemVariants}>
          <label htmlFor="user_email" className={labelClasses}>
            Email
          </label>
          <motion.div
            animate={{
              boxShadow: focusedField === "email" ? "0 0 0 2px rgba(46, 56, 242, 0.3)" : "none",
            }}
          >            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
              className={`${inputClasses} ${formErrors.email ? "border-red-500" : "border-gray-200"}`}
              placeholder="email@example.com"
            />
          </motion.div>
          {formErrors.email && (
            <motion.p
              className="mt-1 text-sm text-red-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {formErrors.email}
            </motion.p>
          )}
        </motion.div>
        
        <motion.div className="mb-5" variants={itemVariants}>
          <label htmlFor="user_phone" className={labelClasses}>
            Phone Number
          </label>
          <motion.div
            animate={{
              boxShadow: focusedField === "phone" ? "0 0 0 2px rgba(46, 56, 242, 0.3)" : "none",
            }}
          >            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onFocus={() => setFocusedField("phone")}
              onBlur={() => setFocusedField(null)}
              className={`${inputClasses} ${formErrors.phone ? "border-red-500" : "border-gray-200"}`}
              placeholder="9876543210"
            />
          </motion.div>
          {formErrors.phone && (
            <motion.p
              className="mt-1 text-sm text-red-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {formErrors.phone}
            </motion.p>
          )}
        </motion.div>
      </div>
      
      <motion.div className="mb-5" variants={itemVariants}>
        <label htmlFor="user_city" className={labelClasses}>
          City
        </label>
        <motion.div
          animate={{
            boxShadow: focusedField === "city" ? "0 0 0 2px rgba(46, 56, 242, 0.3)" : "none",
          }}
        >            <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            onFocus={() => setFocusedField("city")}
            onBlur={() => setFocusedField(null)}
            className={`${inputClasses} border-gray-200`}
            placeholder="Mumbai"
          />
        </motion.div>
      </motion.div>
      
      <motion.div className="mb-5" variants={itemVariants}>
        <label htmlFor="service" className={labelClasses}>
          Service You&apos;re Interested In
        </label>
        <motion.div
          animate={{
            boxShadow: focusedField === "service" ? "0 0 0 2px rgba(46, 56, 242, 0.3)" : "none",
          }}
        >
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            onFocus={() => setFocusedField("service")}
            onBlur={() => setFocusedField(null)}
            className={`${inputClasses} border-gray-200`}
          >
            {serviceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </motion.div>
      </motion.div>
      
      <motion.div className="mb-6" variants={itemVariants}>
        <label htmlFor="message" className={labelClasses}>
          Message
        </label>
        <motion.div
          animate={{
            boxShadow: focusedField === "message" ? "0 0 0 2px rgba(46, 56, 242, 0.3)" : "none",
          }}
        >
          <textarea
            id="message"
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            onFocus={() => setFocusedField("message")}
            onBlur={() => setFocusedField(null)}
            className={`${inputClasses} ${formErrors.message ? "border-red-500" : "border-gray-200"} resize-none`}
            placeholder="How can we help you?"
          ></textarea>
        </motion.div>
        {formErrors.message && (
          <motion.p
            className="mt-1 text-sm text-red-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {formErrors.message}
          </motion.p>
        )}
      </motion.div>
        <motion.div variants={itemVariants}>
        <motion.button
          type="submit"
          className="w-full bg-primary text-white hover:bg-primary-dark px-6 py-3 rounded-lg font-medium transition-all duration-200 flex justify-center items-center"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={state.submitting}
        >
          {state.submitting ? (
            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : "Send Message"}
        </motion.button>
      </motion.div>
    </motion.form>
  );
};

export default EmailForm;
