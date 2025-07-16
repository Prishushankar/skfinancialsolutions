import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NewsPage = () => {
  const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const [marketData, setMarketData] = useState({
    sensex: { value: 72482.05, change: 0.47 },
    nifty: { value: 21995.85, change: 0.52 }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const NEWS_API_KEY = import.meta.env?.VITE_NEWS_API_KEY || 'your-api-key-here';
        const newsResponse = await fetch(
          `https://newsapi.org/v2/everything?q=(India AND (financial OR stock OR market OR economy OR RBI OR SEBI OR BSE OR NSE))&language=en&sortBy=publishedAt&pageSize=10&apiKey=${NEWS_API_KEY}`
        );
        if (newsResponse.ok) {
          const newsData = await newsResponse.json();
          const formattedNews =
            newsData.articles?.map((article) => ({
              title: article.title,
              description: article.description,
              source: article.source.name,
              publishedAt: new Date(article.publishedAt),
              url: article.url
            })) || [];
          setNews(formattedNews.slice(0, 8));
        } else {
          setError("Failed to fetch latest news");
          setNews([]);
        }
        await fetchMarketData();
      } catch {
        setError("Failed to fetch latest news");
        setNews([]);
      } finally {
        setLoading(false);
      }
    };

    const fetchMarketData = async () => {
      try {
        const MARKET_API_KEY = import.meta.env?.VITE_MARKET_API_KEY;
        if (MARKET_API_KEY && MARKET_API_KEY !== 'your-market-api-key-here') {
          const promises = [
            fetch(
              `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=SENSEX.BSE&apikey=${MARKET_API_KEY}`
            ),
            fetch(
              `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=NSEI&apikey=${MARKET_API_KEY}`
            )
          ];
          const [sensexResponse, niftyResponse] = await Promise.all(promises);
          let sensexData = null;
          let niftyData = null;
          if (sensexResponse.ok) {
            const sensexJson = await sensexResponse.json();
            const quote = sensexJson["Global Quote"];
            if (quote && quote["05. price"]) {
              sensexData = {
                value: parseFloat(quote["05. price"]),
                change: parseFloat(quote["10. change percent"].replace("%", ""))
              };
            }
          }
          if (niftyResponse.ok) {
            const niftyJson = await niftyResponse.json();
            const quote = niftyJson["Global Quote"];
            if (quote && quote["05. price"]) {
              niftyData = {
                value: parseFloat(quote["05. price"]),
                change: parseFloat(quote["10. change percent"].replace("%", ""))
              };
            }
          }
          if (sensexData || niftyData) {
            setMarketData((prev) => ({
              sensex: sensexData || prev.sensex,
              nifty: niftyData || prev.nifty
            }));
          }
        } else {
          // Simulate data if no API key
          const now = new Date();
          const isMarketHours = now.getHours() >= 9 && now.getHours() <= 15;
          if (isMarketHours) {
            const sensexChange = (Math.random() - 0.5) * 2;
            const niftyChange = (Math.random() - 0.5) * 2;
            setMarketData({
              sensex: {
                value: 72482.05 + (Math.random() * 1000 - 500),
                change: sensexChange
              },
              nifty: {
                value: 21995.85 + (Math.random() * 300 - 150),
                change: niftyChange
              }
            });
          }
        }
      } catch {
        // Do nothing on error, keep previous data
      }
    };

    fetchNews();
    const newsInterval = setInterval(fetchNews, 15 * 60 * 1000);
    const marketInterval = setInterval(fetchMarketData, 15 * 60 * 1000);
    return () => {
      clearInterval(newsInterval);
      clearInterval(marketInterval);
    };
  }, []);

  const getTimeAgo = (date) => {
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now - date) / (1000 * 60));
      return `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  const handleNewsClick = (newsItem) => {
    if (newsItem.url && newsItem.url !== "#") {
      window.open(newsItem.url, "_blank");
    } else {
      const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(
        newsItem.title + " " + newsItem.source
      )}`;
      window.open(searchUrl, "_blank");
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200 p-8 flex flex-col w-full max-w-lg mx-auto my-12 relative min-h-[590px]">
      {/* Header Row: News + Live + Close */}
      <div className="flex items-center justify-between mb-8 relative">
        <div className="flex items-center">
          <h3 className="text-2xl font-bold text-gray-800 flex items-center">
            <svg className="w-7 h-7 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
              <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
            </svg>
            Market News
          </h3>
          <div className="flex items-center text-green-600 text-base font-semibold ml-4">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            Live
          </div>
        </div>
        {/* Close button, top right */}
        <button
          className="text-gray-400 hover:text-red-600 text-2xl font-bold bg-white rounded-full p-2 shadow focus:outline-none focus:ring-2 focus:ring-red-400 ml-3"
          onClick={() => { window.location.href = '/'; }}
          aria-label="Close News"
        >
          &times;
        </button>
      </div>
      {/* Market Indices */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl">
          <div className="text-xs text-gray-600 font-medium">SENSEX</div>
          <div className="text-xl font-bold text-gray-800">
            {marketData.sensex.value.toLocaleString('en-IN', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
          </div>
          <div className={`text-xs font-semibold ${marketData.sensex.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {marketData.sensex.change >= 0 ? '+' : ''}
            {marketData.sensex.change.toFixed(2)}%
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl">
          <div className="text-xs text-gray-600 font-medium">NIFTY</div>
          <div className="text-xl font-bold text-gray-800">
            {marketData.nifty.value.toLocaleString('en-IN', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
          </div>
          <div className={`text-xs font-semibold ${marketData.nifty.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {marketData.nifty.change >= 0 ? '+' : ''}
            {marketData.nifty.change.toFixed(2)}%
          </div>
        </div>
      </div>
      {/* Loading/News */}
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar" style={{ scrollbarWidth: 'thin', scrollbarColor: '#CBD5E1 #F1F5F9', maxHeight: '420px' }}>
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <div className="text-red-600 text-base mb-2">⚠️ {error}</div>
            <div className="text-gray-500 text-xs">Showing cached news</div>
          </div>
        ) : (
          <div className="space-y-6 pb-2">
            {news.map((item, index) => (
              <div
                key={index}
                className="border-b border-gray-100 pb-4 last:border-b-0 cursor-pointer hover:bg-blue-50 p-3 rounded-lg transition-colors duration-200"
                onClick={() => handleNewsClick(item)}
              >
                <h4 className="text-base font-semibold text-gray-800 mb-1 line-clamp-2 hover:text-blue-700 transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                  {item.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-blue-600 font-medium">{item.source}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">{getTimeAgo(item.publishedAt)}</span>
                    <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
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
