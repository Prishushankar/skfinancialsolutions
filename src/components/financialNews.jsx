import React, { useState, useEffect } from 'react';

// --- CONFIGURATION ---
const NEWS_API_URL = 'https://finnewsscraper-1.onrender.com/api/indian-news';
const MUTUAL_FUND_API_URL = 'https://mutualfundnewsscraper.onrender.com/api/news';

// --- DATA ---
// Reordered topics to place "Mutual Funds" after "All"
const newsTopics = ["All", "Mutual Funds", "Indian Stock Market (NSE & BSE)", "Indian Economy News", "Startup India Funding"];


// --- HELPER COMPONENTS & ICONS ---

const LoadingSpinner = ({ message = "Fetching Latest News..." }) => (
    <div className="flex flex-col items-center justify-center h-64 text-gray-400">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-400 mb-4"></div>
        <p className="text-lg font-medium">{message}</p>
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


// --- CORE COMPONENTS ---

const NewsCard = ({ article }) => {
    const [imageError, setImageError] = useState(false);
    const rawUrl = article.image || article.img;
    const imageUrl = rawUrl && rawUrl.startsWith('http') ? rawUrl : null;

    const handleImageError = () => {
        setImageError(true);
    };

    return (
        <a
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col bg-gray-800/40 backdrop-blur-sm rounded-2xl border border-violet-500/20 overflow-hidden shadow-lg hover:shadow-violet-400/20 hover:-translate-y-2 transition-all duration-300 group"
        >
            <div className="h-52 w-full overflow-hidden flex-shrink-0">
                {imageUrl && !imageError ? (
                    <img
                        src={imageUrl}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={handleImageError}
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
    // Consolidated state for all news articles
    const [allNews, setAllNews] = useState([]);
    const [filteredNews, setFilteredNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeFilter, setActiveFilter] = useState('All');

    // Effect for fetching and combining all news data
    useEffect(() => {
        const fetchAllNews = async () => {
            setLoading(true);
            setError(null);
            try {
                // Fetch both APIs concurrently
                const [marketNewsResponse, mutualFundNewsResponse] = await Promise.all([
                    fetch(NEWS_API_URL),
                    fetch(MUTUAL_FUND_API_URL)
                ]);

                if (!marketNewsResponse.ok) throw new Error(`Market News API Error: ${marketNewsResponse.status}`);
                if (!mutualFundNewsResponse.ok) throw new Error(`Mutual Fund API Error: ${mutualFundNewsResponse.status}`);

                const marketNewsData = await marketNewsResponse.json();
                const mutualFundNewsData = await mutualFundNewsResponse.json();

                // Add a 'topic' to mutual fund news for filtering
                const taggedMutualFundNews = mutualFundNewsData.map(article => ({
                    ...article,
                    topic: 'Mutual Funds'
                }));

                // Combine all news sources
                const combinedNews = [
                    ...marketNewsData.filter(item => item && item.title && item.link),
                    ...taggedMutualFundNews.filter(item => item && item.title && item.link)
                ];
                
                setAllNews(combinedNews);
                setFilteredNews(combinedNews); // Initially show all news

            } catch (err) {
                setError(err.message);
                console.error("Failed to fetch news:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchAllNews();
    }, []);


    const handleFilterChange = (topic) => {
        setActiveFilter(topic);
        if (topic === 'All') {
            setFilteredNews(allNews);
        } else {
            // Filter by the specific topic, including the new "Mutual Funds" topic
            setFilteredNews(allNews.filter(article => article.topic === topic));
        }
    };

    return (
        <div className="bg-gradient-to-br from-gray-900 via-violet-900 to-gray-900 min-h-screen font-sans text-gray-300">
            <div className="container mx-auto px-4 py-12 sm:py-16">
                
                {/* --- UNIFIED NEWS SECTION --- */}
                <section id="news">
                    <header className="text-center mb-8 pb-8 border-b border-violet-500/20">
                        <h1 className="text-5xl font-extrabold text-white tracking-tighter mb-2">Market Pulse</h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">Your daily brief on the Indian market, economy, startups, and mutual funds.</p>
                    </header>
                    <main>
                        <div className="flex flex-nowrap overflow-x-auto gap-2 sm:gap-4 mb-12 pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}>
                            {newsTopics.map(topic => (
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

                        {loading && <LoadingSpinner message="Fetching Financial News..." />}
                        {error && <ErrorDisplay message={error} />}

                        {!loading && !error && (
                            filteredNews.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                                    {filteredNews.map((article, index) => (
                                        <NewsCard key={`${article.link}-${index}`} article={article} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-16">
                                    <p className="text-xl font-medium text-gray-500">No articles found for "{activeFilter}".</p>
                                </div>
                            )
                        )}
                    </main>
                </section>

            </div>
            
            {/* --- FOOTER --- */}
            <footer className="bg-gray-900/50 mt-24 border-t border-violet-500/20">
                <div className="container mx-auto px-6 py-8 text-center text-gray-400">
                    <p className="font-semibold text-lg text-white">SK Financial Solutions</p>
                    <p className="text-sm mt-2">&copy; 2025 SK Financial Solutions. All Rights Reserved.</p>
                    <div className="mt-6">
                        <a href="#" className="text-gray-400 hover:text-white mx-3"><i className="fab fa-twitter fa-lg"></i></a>
                        <a href="#" className="text-gray-400 hover:text-white mx-3"><i className="fab fa-linkedin-in fa-lg"></i></a>
                        <a href="https://www.youtube.com/@SKFinancialSolutions" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white mx-3"><i className="fab fa-youtube fa-lg"></i></a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
