import { useEffect, useRef } from 'react';

const WhatsAppFloat = () => {
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    // Create the floating button element
    const floatContainer = document.createElement('div');
    floatContainer.id = 'whatsapp-float-container';
    floatContainer.style.cssText = `
      position: fixed !important;
      bottom: 30px !important;
      right: 30px !important;
      z-index: 2147483647 !important;
      pointer-events: none !important;
    `;

    const button = document.createElement('button');
    button.setAttribute('aria-label', 'Chat on WhatsApp');
    button.style.cssText = `
      width: 60px !important;
      height: 60px !important;
      border-radius: 50% !important;
      background-color: #25d366 !important;
      border: 3px solid #fff !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      cursor: pointer !important;
      box-shadow: 0 8px 22px rgba(37, 211, 102, 0.45) !important;
      transition: transform 0.25s, box-shadow 0.25s !important;
      pointer-events: auto !important;
    `;

    // Add WhatsApp icon SVG
    button.innerHTML = `
      <svg width="30" height="30" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
      </svg>
    `;

    // Create tooltip
    const tooltip = document.createElement('div');
    tooltip.style.cssText = `
      position: absolute !important;
      bottom: 70px !important;
      right: 0px !important;
      background-color: #333 !important;
      color: #fff !important;
      padding: 6px 10px !important;
      border-radius: 6px !important;
      font-size: 12px !important;
      white-space: nowrap !important;
      opacity: 0 !important;
      transition: opacity 0.25s !important;
      pointer-events: none !important;
    `;
    tooltip.textContent = 'Chat with us on WhatsApp';

    // Add hover effects
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'scale(1.08)';
      tooltip.style.opacity = '1';
    });

    button.addEventListener('mouseleave', () => {
      button.style.transform = 'scale(1)';
      tooltip.style.opacity = '0';
    });

    // Add click handler
    button.addEventListener('click', () => {
      const phone = '919199200558';
      const msg = encodeURIComponent("Hi! I'm interested in your financial services and would like to know more about your offerings. Could you please assist me?");
      window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
    });

    // Assemble the component
    floatContainer.appendChild(button);
    floatContainer.appendChild(tooltip);

    // Append directly to body
    document.body.appendChild(floatContainer);

    // Cleanup function
    return () => {
      if (document.body.contains(floatContainer)) {
        document.body.removeChild(floatContainer);
      }
      isInitialized.current = false;
    };
  }, []);

  return null; // This component doesn't render anything in React
};

export default WhatsAppFloat;
