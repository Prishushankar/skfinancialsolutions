import React, { useState, useEffect } from "react";

const CaseStudies = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [isMobile, setIsMobile] = useState(false);
  
  // Adjust items per view based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
        setIsMobile(true);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
        setIsMobile(false);
      } else {
        setItemsPerView(3);
        setIsMobile(false);
      }
    };
    
    // Set initial value
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const caseStudies = [
    {
      id: 1,
      companyName: "Mrs.Priyanka",
      subtitle: "Bussiness Owner",
      logo: "/female.jpg",
      insight: "Thanks to their advice, I diversified my investments and saw consistent growth even during uncertain market conditions. A truly client-focused firm!",
      result: "Client since 2009",
      backgroundColor: "bg-orange-100",
    },
    {
      id: 2,
      companyName: "Mrs.Swapna",
      subtitle: "Doctor",
      logo: "/female.jpg",
      insight: "I've been a client since 2005, and the level of personal attention and financial insight I've received is unmatched.",
      result: "Client since 2005",
      backgroundColor: "bg-green-100",
    },
    {
      id: 3,
      companyName: "Mr.Rakesh",
      subtitle: "Engineer",
      logo: "/male.png",
      insight: "Transparent, reliable, and always available for guidance. Their team helped me secure insurance plans that perfectly fit my family's needs",
      result: "Client since 2010",
      backgroundColor: "bg-orange-100",
    },
    {
      id: 10,
      companyName: "Trusted by 1000+ People",
      logo: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop&crop=center",
      insight: "Delivering exceptional Growth",
      result: "Join our success stories",
      backgroundColor: "bg-indigo-100",
      isSpecial: true,
    },
  ];
  
  const maxIndex = Math.max(0, caseStudies.length - itemsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <section className="bg-gray-50 pt-12 sm:pt-16 md:pt-20 px-4 sm:px-6 lg:px-20">
      <div className="mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <p className="text-primary text-sm sm:text-md font-medium uppercase tracking-wider mb-2 sm:mb-4 font-poppins">
            CASE STUDIES
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary font-poppins">
            Reviews from Our Clients
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 sm:-translate-x-4 z-10 w-8 h-8 sm:w-10 md:w-12 sm:h-10 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            aria-label="Previous slide"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            disabled={currentIndex === maxIndex}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 sm:translate-x-4 z-10 w-8 h-8 sm:w-10 md:w-12 sm:h-10 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            aria-label="Next slide"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
          
          {/* Carousel Track */}
          <div className="overflow-hidden pb-8 sm:pb-12">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
              }}
            >
              {caseStudies.map((study) => (
                <div 
                  key={study.id} 
                  className={`${
                    isMobile ? 'w-full' : 
                    itemsPerView === 2 ? 'w-1/2' : 'w-1/3'
                  } flex-shrink-0 px-2 sm:px-3 md:px-4 mb-6 sm:mb-10 md:mb-20`}
                >
                  <div
                    className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full ${
                      study.isSpecial ? "border-2 border-primary" : ""
                    }`}
                  >
                    {/* Image Section */}
                    <div
                      className={`${study.backgroundColor} h-36 sm:h-48 flex items-center justify-center relative`}
                    >
                      {study.isSpecial ? (
                        <img
                          src={study.logo}
                          alt={study.companyName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <img
                          src={study.logo}
                          alt={study.companyName}
                          className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-white shadow-lg"
                        />
                      )}
                    </div>
                    
                    {/* Content Section */}
                    <div className="p-4 sm:p-6">
                      {/* Company Info */}
                      <div className="mb-3 sm:mb-4">
                        <h3 className="text-primary text-base sm:text-lg font-bold font-poppins">
                          {study.companyName}
                        </h3>
                        {study.subtitle && (
                          <p className="text-xs text-gray-500 uppercase tracking-wider font-poppins mt-1">
                            {study.subtitle}
                          </p>
                        )}
                      </div>

                      {/* Insight */}
                      <p className="text-text-secondary text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 font-poppins">
                        {study.insight}
                      </p>

                      {/* Result */}
                      <div className="mb-4 sm:mb-6">
                        <div className="bg-primary/10 rounded-lg p-3 sm:p-4">
                          <p className="text-primary font-semibold text-xs sm:text-sm font-poppins">
                            {study.result}
                          </p>
                        </div>
                      </div>
                      
                      {/* CTA Button */}
                      {!study.isSpecial ? (
                        <button className="w-full border-2 border-primary text-primary font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg hover:bg-primary hover:text-white transition-colors duration-300 flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm font-poppins">
                          View Case Study
                          <svg
                            className="w-3 h-3 sm:w-4 sm:h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        </button>
                      ) : (
                        <button className="w-full bg-primary text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg hover:bg-primary/80 transition-colors duration-300 flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm font-poppins">
                          Get Started
                          <svg
                            className="w-3 h-3 sm:w-4 sm:h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Mobile Pagination Dots */}
          <div className="flex justify-center space-x-2 mt-2 sm:mt-4 md:hidden">
            {[...Array(caseStudies.length - itemsPerView + 1)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2 h-2 rounded-full ${
                  currentIndex === i ? "bg-primary" : "bg-gray-300"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
