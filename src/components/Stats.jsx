import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

const Stats = () => {
  const stats = useMemo(() => [
    {
      number: 30,
      suffix: "+",
      label: "Financial Awareness Campaigns",
    },
    {
      number: 1000,
      suffix: "+",
      label: "Clients Served",
    },
    {
      number: 5,
      suffix: "+",
      label: "States & Expanding",
    },
    {
      number: 15,
      suffix: "+",
      label: "Experienced Team Members",
    },
  ], []);
  
  const [animatedNumbers, setAnimatedNumbers] = useState(stats.map(() => 0));
  
  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60; // 60 steps for smooth animation
    const stepDuration = duration / steps;
    const timers = [];

    stats.forEach((stat, index) => {
      let currentStep = 0;
      const increment = stat.number / steps;

      const timer = setInterval(() => {
        currentStep++;
        const newValue = Math.min(
          Math.round(increment * currentStep),
          stat.number
        );

        setAnimatedNumbers((prev) => {
          const newNumbers = [...prev];
          newNumbers[index] = newValue;
          return newNumbers;
        });

        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, stepDuration);
      
      timers.push(timer);
    });
    
    return () => {
      timers.forEach(timer => clearInterval(timer));
    };
  }, [stats]);
  
  return (
    <section className="bg-blue-600 py-20 px-4 sm:px-6 lg:px-8 mt-10 font-poppins">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div 
              key={index} 
              className="text-center relative"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Decorative circle background */}
              <div className="absolute -inset-4 rounded-full bg-blue-600/20 transform -rotate-6"></div>
              
              <div className="relative">
                <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-2 flex justify-center items-center">
                  <span className="tabular-nums tracking-tight">{animatedNumbers[index]}</span>
                  <span className="text-yellow-300">{stat.suffix}</span>
                </div>
                <div className="text-lg text-white/80 font-medium relative">
                  {stat.label}
                  <div className="absolute h-1 w-12 bg-blue-400/50 rounded-full left-1/2 transform -translate-x-1/2 bottom-[-8px]"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
