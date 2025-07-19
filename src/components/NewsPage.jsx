import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Renders a single row in the performance table.
 * @param {{ item: object }} props - The properties for the component.
 * @param {object} props.item - The index data for the row.
 */
const IndexRow = ({ item }) => {
    const getValueColor = (value) => {
        const num = parseFloat(String(value).replace(/,/g, ''));
        if (isNaN(num)) return 'text-gray-600';
        return num < 0 ? 'text-red-600' : 'text-green-600';
    };

    return (
        <tr className="border-b border-gray-200 hover:bg-gray-50">
            <td className="p-3 text-sm font-semibold text-gray-800 whitespace-nowrap">{item.Name}</td>
            <td className="p-3 text-sm text-gray-800 font-bold whitespace-nowrap">{item.LTP}</td>
            <td className={`p-3 text-sm whitespace-nowrap font-medium ${getValueColor(item.YTD)}`}>{item.YTD}</td>
            <td className={`p-3 text-sm whitespace-nowrap font-medium ${getValueColor(item["1Week"])}`}>{item["1Week"]}</td>
            <td className={`p-3 text-sm whitespace-nowrap font-medium ${getValueColor(item["1Month"])}`}>{item["1Month"]}</td>
            <td className={`p-3 text-sm whitespace-nowrap font-medium ${getValueColor(item["3Months"])}`}>{item["3Months"]}</td>
            <td className={`p-3 text-sm whitespace-nowrap font-medium ${getValueColor(item["6Months"])}`}>{item["6Months"]}</td>
            <td className={`p-3 text-sm whitespace-nowrap font-medium ${getValueColor(item["1Year"])}`}>{item["1Year"]}</td>
            <td className={`p-3 text-sm whitespace-nowrap font-medium ${getValueColor(item["2Years"])}`}>{item["2Years"]}</td>
            <td className={`p-3 text-sm whitespace-nowrap font-medium ${getValueColor(item["3Years"])}`}>{item["3Years"]}</td>
        </tr>
    );
};

/**
 * Renders the main table with headers and data sections.
 * @param {{ indices: object }} props - The properties for the component.
 */
const PerformanceTable = ({ indices }) => {
    const headers = ["Name", "LTP", "YTD(%)", "1Week(%)", "1Month(%)", "3Months(%)", "6Months(%)", "1Year(%)", "2Years(%)", "3Years(%)"];

    return (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full bg-white text-left">
                <thead className="bg-gray-50">
                    <tr className="border-b-2 border-gray-300">
                        {headers.map(h => <th key={h} className="p-3 text-xs font-bold text-gray-500 uppercase tracking-wider">{h}</th>)}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    <tr><th colSpan={headers.length} className="p-2 text-sm font-bold text-gray-700 bg-gray-100">KEY INDICES</th></tr>
                    {indices["Key Indices"]?.map(item => <IndexRow key={item.Name} item={item} />)}
                    <tr><th colSpan={headers.length} className="p-2 text-sm font-bold text-gray-700 bg-gray-100">SECTORAL INDICES</th></tr>
                    {indices["Sectoral Indices"]?.map(item => <IndexRow key={item.Name} item={item} />)}
                    <tr><th colSpan={headers.length} className="p-2 text-sm font-bold text-gray-700 bg-gray-100">OTHER INDICES</th></tr>
                    {indices["Other Indices"]?.map(item => <IndexRow key={item.Name} item={item} />)}
                </tbody>
            </table>
        </div>
    );
};

/**
 * Displays the main market data cards for Sensex and Nifty.
 * @param {{ marketData: object, marketError: string|null }} props
 */
const MarketHeader = ({ marketData, marketError }) => (
    <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl shadow">
                <div className="text-sm text-gray-600 font-medium">SENSEX</div>
                <div className="text-2xl font-bold text-gray-800">{marketData.sensex.value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                <div className={`text-sm font-semibold ${marketData.sensex.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {marketData.sensex.change >= 0 ? '▲' : '▼'} {marketData.sensex.change.toFixed(2)}%
                </div>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl shadow">
                <div className="text-sm text-gray-600 font-medium">NIFTY 50</div>
                <div className="text-2xl font-bold text-gray-800">{marketData.nifty.value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                <div className={`text-sm font-semibold ${marketData.nifty.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {marketData.nifty.change >= 0 ? '▲' : '▼'} {marketData.nifty.change.toFixed(2)}%
                </div>
            </div>
        </div>
        {marketError && <div className="text-center mt-2 py-1 text-red-600 text-sm">⚠️ {marketError}</div>}
    </div>
);

/**
 * A scrolling ticker for key indices.
 * @param {{ items: Array<object> }} props
 */
const ScrollingTicker = ({ items }) => {
    if (!items || items.length === 0) return null;

    const getValueColor = (value) => {
        const num = parseFloat(String(value).replace(/,/g, ''));
        if (isNaN(num)) return 'text-gray-500';
        return num < 0 ? 'text-red-500' : 'text-green-500';
    };

    // Duplicate items to create a seamless loop
    const tickerItems = [...items, ...items];

    return (
        <div className="relative w-full overflow-hidden h-12 bg-gray-800 text-white mb-6 rounded-lg">
            <div className="absolute whitespace-nowrap animate-marquee">
                {tickerItems.map((item, index) => (
                    <div key={index} className="inline-flex items-center mx-4">
                        <span className="font-bold text-sm">{item.Name}</span>
                        <span className="ml-2 text-sm">{item.LTP}</span>
                        <span className={`ml-2 text-xs font-semibold ${getValueColor(item["1Week"])}`}>
                            ({item["1Week"]}%)
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};


/**
 * The main page component that fetches and displays market performance data.
 * @param {{ onClose?: () => void }} props
 */
const NewsPage = ({ onClose }) => {
    const navigate = useNavigate();
    const [indices, setIndices] = useState(null);
    const [marketData, setMarketData] = useState({ sensex: { value: 0, change: 0 }, nifty: { value: 0, change: 0 } });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [marketError, setMarketError] = useState(null);
    const hasFetchedData = useRef(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            setMarketError(null);

            const R_API_KEY = import.meta.env.VITE_RAPIDAPI_KEY;
            const R_API_HOST = import.meta.env.VITE_RAPIDAPI_HOST;

            const rapidApiOptions = {
                method: 'GET',
                headers: { 'X-RapidAPI-Key': R_API_KEY, 'X-RapidAPI-Host': R_API_HOST }
            };

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
                        setMarketError("Live index data not available.");
                    }
                }).catch(err => setMarketError(err.message));

            const financeScraperPromise = fetch('https://financescraper.onrender.com')
                .then(res => res.ok ? res.json() : Promise.reject(new Error(`Failed to fetch index data. Status: ${res.status}`)))
                .then(data => setIndices(data))
                .catch(err => setError(err.message));

            await Promise.allSettled([marketPromise, financeScraperPromise]);
            setLoading(false);
        };

        if (!hasFetchedData.current) {
            fetchData();
            hasFetchedData.current = true;
        }

        const interval = setInterval(fetchData, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-white/95 backdrop-blur-sm mt-24 rounded-2xl shadow-xl border border-gray-200 p-6 flex flex-col w-full max-w-7xl mx-auto my-12 relative">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-800">Market Performance</h3>
                <button className="text-gray-500 hover:text-red-600 text-3xl font-light" onClick={onClose || (() => navigate('/'))} aria-label="Close">&times;</button>
            </div>

            {loading && !indices ? (
                <div className="text-center p-10 font-medium text-gray-500">Loading Market Data...</div>
            ) : (
                <>
                    <MarketHeader marketData={marketData} marketError={marketError} />
                    <ScrollingTicker items={indices ? indices["Key Indices"] : []} />
                    {error && (
                        <div className="text-center p-4 mb-4 text-red-600 bg-red-50 rounded-lg">
                            <p className="font-bold">⚠️ Could not load performance table</p>
                            <p className="text-sm">{error}</p>
                        </div>
                    )}
                    {indices ? <PerformanceTable indices={indices} /> : !error && <div className="text-center p-10 text-gray-500">No performance data available.</div>}
                </>
            )}
        </div>
    );
};

export default NewsPage;
