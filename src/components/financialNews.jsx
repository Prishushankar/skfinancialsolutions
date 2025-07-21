import React, { useState, useEffect } from 'react';

// --- CONFIGURATION ---
const API_URL = 'https://finnewsscraper-1.onrender.com/api/indian-news';

// --- HELPER COMPONENTS & ICONS ---

const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center h-64 text-gray-400">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-400 mb-4"></div>
        <p className="text-lg font-medium">Fetching Latest News...</p>
    </div>
);

const ErrorDisplay = ({ message }) => (
    <div className="text-center p-6 my-6 bg-red-900/20 border border-red-500/30 rounded-lg">
        <p className="font-bold text-red-300">⚠️ An Error Occurred</p>
        <p className="text-sm text-red-400 mt-1">{message}</p>
    </div>
);

const ImagePlaceholder = () => (
    <div className="flex items-center justify-center h-full bg-gray-700/50 text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <polyline points="21 15 16 10 5 21"></polyline>
        </svg>
    </div>
);

const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block mr-1.5 opacity-70">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
);


// --- CORE COMPONENT ---

const NewsCard = ({ article }) => {
    const imageUrl = article.img && article.img.startsWith('http') ? article.img : null;

    return (
        <a
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col bg-gray-800/40 backdrop-blur-sm rounded-2xl border border-violet-500/20 overflow-hidden shadow-lg hover:shadow-violet-400/20 hover:-translate-y-2 transition-all duration-300 group"
        >
            <div className="h-52 w-full overflow-hidden flex-shrink-0">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                            const parent = e.currentTarget.parentElement;
                            if (parent) {
                                e.currentTarget.style.display = 'none';
                                const placeholder = document.createElement('div');
                                placeholder.innerHTML = `<div class="flex items-center justify-center h-full bg-gray-700/50 text-gray-500"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg></div>`;
                                parent.appendChild(placeholder.firstChild);
                            }
                        }}
                    />
                ) : (
                    <ImagePlaceholder />
                )}
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <p className="text-xs font-bold text-violet-400 uppercase tracking-wider mb-2">{article.media || 'News Source'}</p>
                <h3 className="text-lg font-bold text-gray-100 leading-tight mb-3 flex-grow group-hover:text-white transition-colors duration-200">
                    {article.title}
                </h3>
                <p className="text-sm text-gray-400 mb-4 line-clamp-3">
                    {article.desc}
                </p>
                <div className="text-sm text-gray-500 mt-auto pt-3 border-t border-violet-500/10 flex items-center">
                    <ClockIcon />
                    <span>{article.date}</span>
                </div>
            </div>
        </a>
    );
};


// --- MAIN APP COMPONENT ---

export default function App() {
    const [allNews, setAllNews] = useState([]);
    const [filteredNews, setFilteredNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeFilter, setActiveFilter] = useState('All');

    const topics = ["All", "Indian Stock Market (NSE & BSE)", "Indian Economy News", "Startup India Funding"];

    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error(`API Error: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                const validNews = data.filter(item => item && item.title && item.link);
                setAllNews(validNews);
                setFilteredNews(validNews);
            } catch (err) {
                setError(err.message);
                console.error("Failed to fetch news:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, []);

    const handleFilterChange = (topic) => {
        setActiveFilter(topic);
        if (topic === 'All') {
            setFilteredNews(allNews);
        } else {
            setFilteredNews(allNews.filter(article => article.topic === topic));
        }
    };

    return (
        <div className="bg-gradient-to-br from-gray-900 via-violet-900 to-gray-900 min-h-screen font-sans text-gray-300 pt-24">
            <div className="container mx-auto px-4 py-8 sm:py-12">
                <header className="text-center mb-8 pb-8 border-b border-violet-500/20">
                     <h1 className="text-5xl font-extrabold text-white tracking-tighter mb-2">
                        Market Pulse
                    </h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Your daily brief on the Indian market, economy, and startup ecosystem.
                    </p>
                </header>

                <style>{`
.hide-scrollbar::-webkit-scrollbar { display: none; }
.hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
`}</style>

                <main>
                    <div className="flex flex-nowrap overflow-x-auto gap-2 sm:gap-4 mb-12 pb-2 hide-scrollbar" style={{ WebkitOverflowScrolling: 'touch' }}>
                        {topics.map(topic => (
                            <button
                                key={topic}
                                onClick={() => handleFilterChange(topic)}
                                className={`px-4 py-2 text-sm sm:text-base font-semibold rounded-full transition-all duration-300 min-w-max ${
                                    activeFilter === topic
                                        ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/20'
                                        : 'bg-gray-800/40 text-gray-300 hover:bg-gray-700/60 hover:text-white border border-violet-500/20'
                                }`}
                            >
                                {topic.includes('(') ? topic.split(' (')[0] : topic}
                            </button>
                        ))}
                    </div>

                    {loading && <LoadingSpinner />}
                    {error && <ErrorDisplay message={error} />}

                    {!loading && !error && (
                        <>
                            {filteredNews.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                                    {filteredNews.map((article, index) => (
                                        <NewsCard key={`${article.link}-${index}`} article={article} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-16">
                                    <p className="text-xl font-medium text-gray-500">No articles found for this topic.</p>
                                </div>
                            )}
                        </>
                    )}
                </main>
                
                <footer className="text-center mt-16 pt-8 border-t border-violet-500/20">
                    <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Market Pulse. All Rights Reserved.</p>
                </footer>
            </div>
        </div>
    );
}
