// Google Analytics utility functions
export const GA_TRACKING_ID = import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-WGE2K318YQ';

// Page view tracking
export const pageview = (url) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_location: url,
    });
  }
};

// Event tracking
export const event = ({ action, category, label, value }) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Custom events for your financial app
export const trackUserSignup = () => {
  event({
    action: 'signup',
    category: 'User',
    label: 'User Registration',
  });
};

export const trackUserLogin = () => {
  event({
    action: 'login',
    category: 'User',
    label: 'User Login',
  });
};

export const trackCalculatorUsage = (calculatorType) => {
  event({
    action: 'calculator_usage',
    category: 'Tools',
    label: calculatorType,
  });
};

export const trackContactForm = () => {
  event({
    action: 'contact_form',
    category: 'Lead',
    label: 'Contact Form Submission',
  });
};

export const trackPageView = (pageName) => {
  event({
    action: 'page_view',
    category: 'Navigation',
    label: pageName,
  });
};

export const trackProductInterest = (productType) => {
  event({
    action: 'product_interest',
    category: 'Products',
    label: productType,
  });
};

export const trackWhatsAppClick = (source) => {
  event({
    action: 'whatsapp_click',
    category: 'Communication',
    label: `WhatsApp - ${source}`,
  });
};
