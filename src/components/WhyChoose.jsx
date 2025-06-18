import { useState } from "react";

const WhyChoose = () => {
  const [hoveredSection, setHoveredSection] = useState(0);
  const reasons = [
    {
      id: "operator-led",
      title: "Finance, Backed by Experience",
      description:
        "We’ve scaled portfolios, streamlined claims, and optimized loans—grounded in real success stories.",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: "product-neutral",
      title: "Recommendations That Work for You",
      description:
        "We don’t push products. We deliver what’s right—always aligned with your financial goals.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: "end-to-end",
      title: "End-to-End Financial Execution",
      description:
        "From planning SIPs to managing insurance and loans—we handle it all.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: "plug-play-team",
      title: "Your Extended Finance Team",
      description:
        "Expert advisors who work seamlessly with your in-house teams.",
      image:
        "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: "result-obsessed",
      title: "Results That Speak",
      description:
        "Returns, protection, savings—your outcomes define our success.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
  ];

  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-20">
      <div className=" mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Content */}
          <div>
            {/* Header */}
            <div className="mb-12">
              <p className="text-primary text-sm font-medium uppercase tracking-wider mb-4 font-poppins">
                WHAT LEAD US
              </p>
              <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-text-primary font-poppins">
                Why SK Financial ?
              </h2>
            </div>

            {/* Timeline Items */}
            <div className="space-y-8">
              {reasons.map((reason, index) => (
                <div
                  key={reason.id}
                  className={`relative pl-8 transition-all duration-300 cursor-pointer ${
                    hoveredSection === index ? "opacity-100" : "opacity-40"
                  }`}
                  onMouseEnter={() => setHoveredSection(index)}
                >
                  {/* Timeline dot */}
                  <div
                    className={`absolute left-0 top-2 w-4 h-4 rounded-full transition-all duration-300 ${
                      hoveredSection === index ? "bg-primary" : "bg-gray-300"
                    }`}
                  ></div>

                  {/* Timeline line */}
                  {index < reasons.length - 1 && (
                    <div className="absolute left-2 top-6 w-px h-16 bg-gray-200"></div>
                  )}

                  {/* Content */}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-3 font-poppins">
                      {reason.title}
                    </h3>
                    <p className="text-text-secondary text-base leading-relaxed font-poppins">
                      {reason.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>{" "}
          {/* Right Content */}
          <div className="relative">
            {/* Image Gallery */}
            <div className="relative h-[600px] py-10 mt-32 rounded-3xl overflow-hidden shadow-lg">
              {reasons.map((reason, index) => (
                <img
                  key={reason.id}
                  src={reason.image}
                  alt={reason.title}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                    index === hoveredSection ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}

              {/* Decorative dots */}
              <div className="absolute top-4 right-4">
                <div className="grid grid-cols-3 gap-1">
                  {[...Array(9)].map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 bg-white/50 rounded-full"
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
