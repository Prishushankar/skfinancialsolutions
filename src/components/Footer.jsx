import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const handleContactClick = (event) => {
    event.preventDefault();
    navigate('/contact');
    window.scrollTo(0, 0);
  };
  return (
    <footer className="bg-primary text-white py-20 px-4 sm:px-6 lg:px-20">
      <div className="mx-auto">
        {/* Main Footer Content */}
        <div className="mb-10">          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 leading-tight font-poppins">
            Secure Your Financial Future with SK Financial Solutions
          </h1>          <Link 
            to="/contact" 
            className="inline-block bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 font-poppins"
            onClick={handleContactClick}
          >
            <span className="flex items-center gap-2">
              Let&apos;s Talk
              <svg
                className="w-5 h-5"
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
            </span>
          </Link>
          
        </div>
        <hr className="mb-8 border-white/20" />
        {/* Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6 font-poppins">
              FINANCIAL SERVICES
            </h3>            <ul className="space-y-4">              <li>
                <Link
                  to="/mutual-funds"
                  className="text-white/80 hover:text-white transition-colors font-poppins"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Mutual Funds
                </Link>
              </li>
              <li>
                <Link
                  to="/insurance"
                  className="text-white/80 hover:text-white transition-colors font-poppins"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Insurance Products
                </Link>
              </li>
              <li>
                <Link
                  to="/loans"
                  className="text-white/80 hover:text-white transition-colors font-poppins"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Loan Services
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/80 hover:text-white transition-colors font-poppins"
                >
                  Retirement Planning
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/80 hover:text-white transition-colors font-poppins"
                >
                  Tax Planning
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/80 hover:text-white transition-colors font-poppins"
                >
                  Financial Consulting
                </a>
              </li>
            </ul>
          </div>
          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-6 font-poppins">
              COMPANY
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className="text-white/80 hover:text-white transition-colors font-poppins"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/80 hover:text-white transition-colors font-poppins"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/80 hover:text-white transition-colors font-poppins"
                >
                  Financial Insights
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/80 hover:text-white transition-colors font-poppins"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>
          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-6 font-poppins">
              LEGAL
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className="text-white/80 hover:text-white transition-colors font-poppins"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/80 hover:text-white transition-colors font-poppins"
                >
                  Terms of Services
                </a>
              </li>
            </ul>

            <div className="mt-8">
              <h4 className="text-sm font-semibold mb-4 font-poppins">
                STAY CONNECTED
              </h4>
              <div className="flex gap-4">
                {/* LinkedIn Icon */}
                <a
                  href="#"
                  className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                {/* WhatsApp Icon */}
                <a
                  href="#"
                  className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6 font-poppins">
              CONTACT US
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-white/80 font-poppins">skfinancialsolutions2025@gmail.com</p>
              </div>

              <div className="mb-4">
                <p className="text-white/80 font-poppins">
                  Phone: +91 9199200558
                </p>
              </div>

              <div>
                <p className="text-lg font-semibold mb-2 font-poppins">
                  Office Address
                </p>
                <p className="text-white/80 text-sm leading-relaxed font-poppins">
                  SK Financial Solutions,
                  <br />
                  Jagdeopath,
                  <br />
                  Patna, Bihar, 800014
                </p>
              </div>
            </div>
          </div>
        </div>        {/* Bottom Copyright */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-white/60 text-sm font-poppins">
              © {new Date().getFullYear()} SK Financial Solutions. All rights reserved.
            </p>
            <p className="text-white/60 text-sm font-poppins mt-2 sm:mt-0">
              Developed by{" "}
              <a 
                href="https://www.linkedin.com/in/priyanshu-shankar-067831256/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white transition-colors duration-300 underline"
              >
                Priyanshu Shankar
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
