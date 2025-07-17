import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const NewsPage = ({ onClose }) => {
  const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const [marketData, setMarketData] = useState({
    sensex: { value: 0, change: 0 },
    nifty: { value: 0, change: 0 },
  });
  const [loading, setLoading] = useState(true);
  const [newsError, setNewsError] = useState(null);
  const [marketError, setMarketError] = useState(null);
  const hasFetchedData = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      // Clear previous errors before fetching
      setNewsError(null);
      setMarketError(null);

      const R_API_KEY = import.meta.env.VITE_RAPIDAPI_KEY;
      const R_API_HOST = import.meta.env.VITE_RAPIDAPI_HOST;
      const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;

      // Safer check for all keys
      if (!R_API_KEY || R_API_KEY.includes('YOUR') || !R_API_HOST || !NEWS_API_KEY || NEWS_API_KEY.includes('your-api-key')) {
        setNewsError("One or more API keys are not configured.");
        setMarketError("Please check your .env file and Vercel settings.");
        setLoading(false);
        return;
      }

      const rapidApiOptions = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': R_API_KEY,
          'X-RapidAPI-Host': R_API_HOST
        }
      };

      // We will run them and handle their success or failure independently
      const marketPromise = fetch('https://yahoo-finance1.p.rapidapi.com/market/v2/get-quotes?region=IN&symbols=%5ENSEI%2C%5EBSESN', rapidApiOptions)
        .then(res => res.ok ? res.json() : Promise.reject(new Error('Failed to fetch market data.')))
        .then(marketJson => {
          const sensexQuote = marketJson?.quoteResponse?.result?.find(q => q.symbol === '^BSESN');
          const niftyQuote = marketJson?.quoteResponse?.result?.find(q => q.symbol === '^NSEI');
          if (sensexQuote && niftyQuote) {
            setMarketData({
              sensex: { value: sensexQuote.regularMarketPrice, change: sensexQuote.regularMarketChangePercent },
              nifty: { value: niftyQuote.regularMarketPrice, change: niftyQuote.regularMarketChangePercent },
            });
          } else {
            setMarketError("Index data not available.");
          }
        })
        .catch(err => {
          console.error("Market data fetch error:", err);
          setMarketError("Failed to load market data.");
        });

      const newsPromise = fetch(`https://newsapi.org/v2/top-headlines?country=in&category=business&pageSize=10&apiKey=${NEWS_API_KEY}`)
        .then(res => res.ok ? res.json() : Promise.reject(new Error('Failed to fetch news.')))
        .then(newsJson => {
          if (newsJson?.status === "error") {
            throw new Error(newsJson.message || "News API error.");
          }
          if (newsJson?.articles && newsJson.articles.length > 0) {
            const formattedNews = newsJson.articles.map((article) => ({
              title: article.title,
              description: article.description,
              source: article.source.name,
              publishedAt: new Date(article.publishedAt),
              url: article.url,
            }));
            setNews(formattedNews);
          } else {
            setNewsError("No news articles available at the moment.");
          }
        })
        .catch(err => {
          console.error("News fetch error:", err);
          setNewsError(err.message);
        });

      setLoading(true);
      // Use Promise.allSettled to ensure both fetches complete regardless of individual failure
      await Promise.allSettled([marketPromise, newsPromise]);
      setLoading(false);
    };

    if (!hasFetchedData.current) {
      fetchData();
      hasFetchedData.current = true;
    }

    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getTimeAgo = (date) => {
    if (!(date instanceof Date) || isNaN(date)) return '';
    const now = new Date();
    const diffInHours = Math.floor(Math.abs(now - date) / 36e5);
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(Math.abs(now - date) / 6e4);
      return `${diffInMinutes}m ago`;
    }
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const handleNewsClick = (newsItem) => {
    if (newsItem.url) window.open(newsItem.url, "_blank");
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200 p-8 flex flex-col w-full max-w-lg mx-auto my-12 relative min-h-[590px]">
      <div className="flex items-center justify-between mb-8 relative">
        <div className="flex items-center">
          <h3 className="text-2xl font-bold text-gray-800 flex items-center">
            <svg className="w-7 h-7 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" /><path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" /></svg>
            Market News
          </h3>
          <div className="flex items-center text-green-600 text-base font-semibold ml-4">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            Live
          </div>
        </div>
        <button className="text-gray-400 hover:text-red-600 text-2xl font-bold bg-white rounded-full p-2 shadow focus:outline-none focus:ring-2 focus:ring-red-400 ml-3" onClick={onClose || (() => navigate('/'))} aria-label="Close News">&times;</button>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl">
          <div className="text-xs text-gray-600 font-medium">SENSEX</div>
          <div className="text-xl font-bold text-gray-800">{marketData.sensex.value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          <div className={`text-xs font-semibold ${marketData.sensex.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>{marketData.sensex.change >= 0 ? '+' : ''}{marketData.sensex.change.toFixed(2)}%</div>
        </div>
        <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl">
          <div className="text-xs text-gray-600 font-medium">NIFTY 50</div>
          <div className="text-xl font-bold text-gray-800">{marketData.nifty.value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          <div className={`text-xs font-semibold ${marketData.nifty.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>{marketData.nifty.change >= 0 ? '+' : ''}{marketData.nifty.change.toFixed(2)}%</div>
        </div>
      </div>
      {marketError && (<div className="text-center py-2 text-red-600 text-sm">⚠️ {marketError}</div>)}
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar" style={{ scrollbarWidth: 'thin', scrollbarColor: '#CBD5E1 #F1F5F9', maxHeight: '420px' }}>
        {loading ? (
          <div className="space-y-4 pt-2">{[1, 2, 3, 4].map((i) => (<div key={i} className="animate-pulse"><div className="h-4 bg-gray-200 rounded mb-2"></div><div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div><div className="h-3 bg-gray-200 rounded w-1/2"></div></div>))}</div>
        ) : newsError ? (
          <div className="text-center py-8">
            <div className="text-red-600 text-base mb-2">⚠️ {newsError}</div>
          </div>
        ) : (
          <div className="space-y-6 pb-2 pt-2">
            {news.map((item, index) => (
              <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0 cursor-pointer hover:bg-blue-50 p-3 rounded-lg transition-colors duration-200" onClick={() => handleNewsClick(item)}>
                <h4 className="text-base font-semibold text-gray-800 mb-1 line-clamp-2 hover:text-blue-700 transition-colors">{item.title}</h4>
                <p className="text-xs text-gray-600 mb-2 line-clamp-2">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-blue-600 font-medium">{item.source}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">{getTimeAgo(item.publishedAt)}</span>
                    <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsPage;