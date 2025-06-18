const TrustedBrands = () => {  const brands = [
    {
      name: "SBI Mutual Fund",
      logo: "/sbimutual.svg.png",
    },
    {
      name: "Motilal Oswal Mutual Fund",
      logo: "/motilalmf.png",
    },
    {
      name: "SBI Life Insurance",
      logo: "/sbilife.png",
    },
    {
      name: "HDFC Mutual Fund",
      logo: "/hdfcmf.png",
    },
    {
      name: "HDFC Life",
      logo: "/HDFC_Life.png",
    },
          {
      name: "DSP Mutual Fund",
      logo: "/dspindia.png",
    },
    {
      name: "ICICI Mutual Fund",
      logo: "/icicmf.jpg",
    },
    {
      name: "ICICI Insurance",
      logo: "/icicinsurance.png",
    },
    {
      name: "Axis Bank Mutual Fund",
      logo: "/axis.png",
    },
    {
      name: "Kotak Mahindra Mutual Fund",
      logo: "/kotak.jpg",
    },
    {
      name: "Bandhan Bank Mutual Fund",
      logo: "/bandhanmf.svg",
    },
    {
      name: "Bajaj Finance",
      logo: "/bajajmf.png",
    },
    {
      name: "Nippon India Mutual Fund",
      logo: "/nipponmf.png",
    },
  
    
    
    {
      name: "HDFC Mutual Fund (2)",
      logo: "/hdfcmf.png",
    },
    {
      name: "SBI Mutual Fund (2)",
      logo: "/sbimutual.svg.png",
    },
  ];

  // Duplicate brands for seamless infinite scroll
  const duplicatedBrands = [...brands, ...brands];

  return (
    <section className="bg-secondary-light py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-primary text-sm font-medium uppercase tracking-wider mb-4 font-poppins">
            PARTNERED WITH
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-text-primary mb-6 font-poppins">
            India&apos;s Top Financial Institutions
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed font-poppins">
            We&apos;ve partnered with India&apos;s premier financial institutions to bring you the best mutual fund and insurance products. Our partnerships with leading banks, mutual fund houses, and insurance providers ensure you have access to the widest range of trusted financial solutions tailored to your needs.
          </p>
        </div>{" "}        {/* Carousel */}
        <div className="relative overflow-hidden">
          <div className="flex animate-marquee">
            {duplicatedBrands.map((brand, index) => (
              <div
                key={`${brand.name}-${index}`}
                className="flex-shrink-0 w-48 px-3 mb-6"
              >
                <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center justify-center h-24">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="max-w-full max-h-full object-contain hover:scale-105 transition-all duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBrands;
