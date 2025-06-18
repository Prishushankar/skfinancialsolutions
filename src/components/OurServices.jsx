import { useState, useEffect, useRef } from "react";

const OurServices = () => {
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef([]);  const services = [
    {      id: "mutual-funds",      title: "Mutual Fund Solutions",
      description:
        "Expert-curated mutual fund portfolios designed to match your financial goals, risk tolerance, and investment horizon.",
      features: [
        "SIP & Lumpsum Investments",
        "Tax-Saving ELSS Funds",
        "Child Future Fund Selection",
        "Goal-Based Investment Planning",
      ],      image:
        "/green.jpg",
      icon: (
        <svg
          className="w-8 h-8 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      id: "child-planning",
      title: "Child Education Planning",
      description:
        "Secure your child's future with specialized financial plans designed to fund their education, career development, and important life milestones.",
      features: [
        "Education Fund Planning",
        "Child Insurance Plans",
        "Sukanya Samriddhi Yojana",
        "Higher Education & Global Study Funding",
      ],
      image:
        "/gradute.jpg",
      icon: (
        <svg
          className="w-8 h-8 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
    },
    {
      id: "life-insurance",      title: "Insurance Solutions",
      description:
        "Comprehensive life insurance plans that provide financial security for your family with customized coverage options to protect what matters most.",
      features: [
        "Term Life Insurance",
        "Whole Life Insurance",
        "ULIPs & Endowment Plans",
        "Child Future Protection Plans",
      ],
      image:
        "/Insurance.jpg",
      icon: (
        <svg
          className="w-8 h-8 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
    },
    {
      id: "health-insurance",
      title: "Health Insurance Coverage",
      description:
        "Tailored health insurance policies that offer comprehensive medical coverage for individuals and families, ensuring peace of mind during health emergencies.",
      features: [
        "Family Floater Plans",
        "Critical Illness Coverage",
        "Senior Citizen Health Plans",
        "Group Health Insurance",
      ],
      image:
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      icon: (
        <svg
          className="w-8 h-8 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      ),
    },
    {
      id: "home-loans",
      title: "Home & Property Loans",
      description:
        "Affordable home loan solutions with competitive interest rates and flexible repayment options to help you achieve your dream of homeownership.",
      features: [
        "Residential Property Loans",
        "Home Improvement Loans",
        "Land Purchase Financing",
        "Balance Transfer & Top-up",
      ],
      image:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      icon: (
        <svg
          className="w-8 h-8 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
    },
    {
      id: "personal-loans",
      title: "Personal & Business Loans",
      description:
        "Quick and hassle-free personal and business loan solutions with minimal documentation to address your immediate financial requirements.",
      features: [
        "Personal Loans",
        "Business & MSME Loans",
        "Education Financing",
        "Professional Loans",
      ],
      image:
        "https://images.unsplash.com/photo-1579621970795-87facc2f976d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      icon: (
        <svg
          className="w-8 h-8 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
    },
    {
      id: "retirement-planning",
      title: "Retirement Planning",
      description:
        "Comprehensive retirement solutions that secure your future with strategic savings and investment plans designed for long-term financial independence.",
      features: [
        "NPS & Pension Plans",
        "Senior Citizen Savings Schemes",
        "Post-Retirement Income Planning",
        "Estate & Legacy Planning",
      ],
      image:
        "/old.jpg",
      icon: (
        <svg
          className="w-8 h-8 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
  ];

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sectionRefs.current.forEach((ref, index) => {
        if (ref) {
          const { offsetTop, offsetHeight } = ref;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(index);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="bg-black text-white py-20 px-4 sm:px-6 lg:px-20">
      <div className=" mx-auto">
        {/* Header */}        <div className="mb-16">
          <p className="text-primary text-md font-medium uppercase tracking-wider mb-4 font-poppins">
            OUR FINANCIAL SERVICES
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold mb-6 font-poppins">
            Comprehensive Financial Solutions.
            <span className="block">For Every Stage of Life.</span>
          </h2>
        </div>

        {/* Services Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Content - Scrollable Sections */}
          <div className="space-y-32 mb-60">
            {services.map((service, index) => (
              <div
                key={service.id}
                ref={(el) => (sectionRefs.current[index] = el)}
                className="py-20 flex flex-col justify-center"
              >
                {/* Icon */}
                <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mb-8">
                  {service.icon}
                </div>

                {/* Title */}
                <h3 className="text-3xl sm:text-4xl font-bold mb-6 font-poppins">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-300 text-lg mb-8 leading-relaxed font-poppins">
                  {service.description}
                </p>                {/* Features List */}
                <div className="space-y-4 mt-2">
                  <h4 className="text-primary text-lg font-semibold mb-3 font-poppins">Key Offerings:</h4>
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-white font-medium font-poppins">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right Image - Sticky */}
          <div className="relative">
            <div className="sticky top-28 h-[80vh]">
              <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-2xl h-full w-10/12 relative ml-28">
                {services.map((service, index) => (
                  <img
                    key={service.id}
                    src={service.image}
                    alt={service.title}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                      index === activeSection ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}                {/* Overlay with service indicator */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-black/70 backdrop-blur-sm rounded-lg p-4">
                    <h4 className="text-white font-bold text-lg font-poppins">
                      {services[activeSection]?.title}
                    </h4>
                    <p className="text-gray-300 text-sm mt-1 mb-2 font-poppins">
                      Talk to our advisors about your {services[activeSection]?.id.replace(/-/g, ' ')} needs
                    </p>
                    <div className="flex space-x-2 mt-2">
                      {services.map((_, index) => (
                        <div
                          key={index}
                          className={`h-1 rounded-full transition-all duration-300 ${
                            index === activeSection
                              ? "bg-primary w-8"
                              : "bg-gray-400 w-2"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurServices;
