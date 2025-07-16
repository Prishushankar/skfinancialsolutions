import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
  return (
    <Router>
      <ScrollToTop />
      <div className="overflow-x-hidden max-w-full">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/mutual-funds" element={<MutualFundPage />} />
          <Route path="/insurance" element={<InsurancePage />} />
          <Route path="/loans" element={<LoanPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/news" element={<NewsRoutePage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
