import React, { useState, useEffect } from 'react';

// NOTE: Make sure you have Tailwind CSS configured in your Vite + React project.
// You should also link to Google Fonts (Inter) and Font Awesome in your main `index.html` file.
/*
  In your public/index.html:
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
*/

// Video data can be stored in an array for easier mapping and management.
const videoData = [
  {
    id: 'wvzvMveh5UM',
    title: 'Understanding Financial Markets',
    description: 'A deep dive into the fundamentals of financial markets. Learn how to make informed decisions for your investments.',
  },
  {
    id: 'Cglne0tw9nA',
    title: 'Strategic Investment Tips',
    description: 'Discover key strategies for building a robust investment portfolio with advice from our financial experts.',
  },
];

// Reusable VideoCard component
const VideoCard = ({ video, onWatchNow }) => (
  <div className="bg-white rounded-xl shadow-xl overflow-hidden transition-shadow duration-300 hover:shadow-2xl flex flex-col border border-slate-200">
    <div className="relative video-container cursor-pointer" onClick={() => onWatchNow(video.id)}>
      <iframe
        src={`https://www.youtube.com/embed/${video.id}`}
        title={video.title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
        style={{ pointerEvents: 'none' }} // Prevents iframe from capturing clicks
      ></iframe>
    </div>
    <div className="p-8 flex-grow flex flex-col">
      <h3 className="text-xl font-bold mb-3 text-slate-800">{video.title}</h3>
      <p className="text-slate-600 flex-grow">{video.description}</p>
      <a
        href={`https://www.youtube.com/watch?v=${video.id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center text-blue-700 font-semibold hover:text-blue-900 transition-colors duration-300 self-start"
      >
        Watch on YouTube <i className="fas fa-external-link-alt ml-2"></i>
      </a>
    </div>
  </div>
);

// Modal Component
const VideoModal = ({ videoId, onClose }) => {
  if (!videoId) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-black w-full max-w-4xl rounded-lg shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 md:-top-4 md:-right-4 bg-white rounded-full h-10 w-10 flex items-center justify-center text-gray-800 hover:bg-gray-200 transition z-10"
          aria-label="Close video player"
        >
          <i className="fas fa-times text-xl"></i>
        </button>
        <div className="modal-video-container">
          <iframe
            id="modal-iframe"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};


export default function Videos() {
  const [activeVideoId, setActiveVideoId] = useState(null);

  // Effect to handle 'Escape' key press for closing the modal
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        setActiveVideoId(null);
      }
    };
    window.addEventListener('keydown', handleEsc);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return (
    <>
      {/* We inject the custom CSS using a style tag in JSX. */}
      <style>{`
        body {
          font-family: 'Inter', sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        .video-container {
          position: relative;
          padding-bottom: 56.25%; /* 16:9 */
          height: 0;
          overflow: hidden;
          background: #e2e8f0;
        }
        .video-container iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        .gradient-text {
          background: linear-gradient(to right, #1e293b, #475569);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
        }
        .modal-video-container {
          position: relative;
          padding-bottom: 56.25%; /* 16:9 */
          height: 0;
          overflow: hidden;
        }
        .modal-video-container iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      `}</style>
      
      <div className="bg-slate-50 text-slate-700 pt-24">
        {/* Header Section */}
        <header className="bg-white border-b border-slate-200">
          <div className="container mx-auto px-6 py-12 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold gradient-text tracking-tight">
              Financial Tutorials
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
              Your trusted resource for expert analysis and strategic guidance on the financial markets.
            </p>
          </div>
        </header>

        {/* Main Content - Video Grid */}
        <main className="container mx-auto px-6 py-20">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 max-w-6xl mx-auto">
            {videoData.map((video) => (
              <VideoCard key={video.id} video={video} onWatchNow={setActiveVideoId} />
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-24">
            <a
              href="https://www.youtube.com/@SKFinancialSolutions"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-800 text-white font-bold py-4 px-10 rounded-lg shadow-lg hover:bg-slate-700 transition-all duration-300 transform hover:scale-105"
            >
              Explore All Videos on YouTube
            </a>
          </div>
        </main>

       

        {/* Video Modal Rendered Here */}
        <VideoModal videoId={activeVideoId} onClose={() => setActiveVideoId(null)} />
      </div>
    </>
  );
}
