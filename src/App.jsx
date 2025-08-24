import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import NewsRoutePage from "./pages/NewsRoutePage";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Stats from "./components/Stats";
import TrustedBrands from "./components/TrustedBrands";
import OurServices from "./components/OurServices";
import Industries from "./components/Industries";
import WhyChoose from "./components/WhyChoose";
import CaseStudies from "./components/CaseStudies";
import Footer from "./components/Footer";
import MutualFundPage from "./components/MutualFundPage";
import InsurancePage from "./components/InsurancePage";
import LoanPage from "./components/LoanPage";
import About from "./components/about";
import Contact from "./components/Contact";
import ScrollToTop from "./components/ScrollToTop";
import FinancialNews from "./components/financialNews";
import Videos from "./components/videos"; // Importing the Videos component
import Signup from './components/Signup';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import WhatsAppFloat from './components/WhatsAppFloat';
import { pageview } from './utils/analytics';
import { optimizeScrollPerformance } from './hooks/useSmoothScroll';


// Component to track page views
const PageViewTracker = () => {
  const location = useLocation();
  
  useEffect(() => {
    pageview(location.pathname + location.search);
  }, [location]);
  
  return null;
};

const HomePage = () => {
  return (
    <>
      <Hero />
      <Services />
      <Stats />
      <TrustedBrands />
      <OurServices />
      <Industries />
      <WhyChoose />
      <CaseStudies />
    </>
  );
};

const App = () => {
  // Initialize scroll performance optimizations
  useEffect(() => {
    optimizeScrollPerformance();
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <AuthProvider>
        <div className="overflow-x-hidden max-w-full gpu-accelerated">
          <PageViewTracker />
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute />}> 
              <Route path="/mutual-funds" element={<MutualFundPage />} />
              <Route path="/insurance" element={<InsurancePage />} />
              <Route path="/loans" element={<LoanPage />} />
              <Route path="/news" element={<NewsRoutePage />} />
              <Route path="/financial-news" element={<FinancialNews />} />
            </Route>
          </Routes>
          <Footer />
          <WhatsAppFloat />
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
