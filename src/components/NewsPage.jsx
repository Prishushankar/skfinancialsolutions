import React, { useState, useEffect } from 'react';

// The URL for your deployed FastAPI backend
const API_URL = 'https://financescraper.onrender.com/api/all-performance';

// --- Helper Functions & Icons ---

/**
 * A simple chevron icon component.
 * @param {{ isExpanded: boolean }} props
 */
const ChevronIcon = ({ isExpanded }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
        <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
);

/**
 * A utility to format numbers and determine their color.
 * @param {string} value - The string value to format.
 * @returns {{formatted: string, color: string, icon: string}}
 */
const formatValue = (value) => {
    const num = parseFloat(String(value).replace(/,/g, ''));
    if (isNaN(num) || num === 0) {
        return { formatted: value, color: 'text-gray-600', icon: '' };
    }
    const icon = num < 0 ? '▼' : '▲';
    const color = num < 0 ? 'text-red-600' : 'text-green-600';
    return { formatted: `${value}`, color, icon };
};


// --- Mobile-First Components ---

/**
 * Renders a single, expandable card for the mobile view.
 * @param {{ item: object }} props
 */
const IndexCard = ({ item }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const mainValue = formatValue(item["1Week"]);

    // UPDATED: Abbreviated labels for mobile view
    const detailMetrics = [
        { label: 'YTD(%)', value: item.YTD },
        { label: '1M(%)', value: item["1Month"] },
        { label: '3M(%)', value: item["3Months"] },
        { label: '6M(%)', value: item["6Months"] },
        { label: '1Y(%)', value: item["1Year"] },
        { label: '2Y(%)', value: item["2Years"] },
        { label: '3Y(%)', value: item["3Years"] },
    ];

    return (
        <div className="border border-gray-200 rounded-lg shadow-sm mb-3 overflow-hidden">
            <button onClick={() => setIsExpanded(!isExpanded)} className="w-full text-left p-4 bg-white hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between">
                <div>
                    <p className="font-bold text-gray-800">{item.Name}</p>
                    <p className="text-sm text-gray-900 font-semibold">{item.LTP}</p>
                </div>
                <div className="text-right flex items-center">
                    <div className={`font-semibold text-sm ${mainValue.color}`}>
                        {mainValue.icon} {mainValue.formatted}%
                        <span className="text-xs text-gray-500 font-normal ml-1">(1W)</span>
                    </div>
                    <div className="ml-4 text-gray-400">
                        <ChevronIcon isExpanded={isExpanded} />
                    </div>
                </div>
            </button>
            {isExpanded && (
                <div className="bg-gray-50 border-t border-gray-200 p-4">
                    <ul className="space-y-2">
                        {detailMetrics.map(metric => {
                            const metricValue = formatValue(metric.value);
                            return (
                                <li key={metric.label} className="flex justify-between items-center text-sm">
                                    <span className="text-gray-600">{metric.label}</span>
                                    <span className={`font-medium ${metricValue.color}`}>{metricValue.formatted}</span>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
};

/**
 * Renders the card-based view for mobile screens.
 * @param {{ indices: object }} props
 */
const MobileCardView = ({ indices }) => {
    if (!indices || Object.keys(indices).length === 0) return null;

    return (
        <div className="mt-4">
            {Object.entries(indices).map(([category, items]) => (
                <div key={category} className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-3 px-1">{category}</h3>
                    {items.map(item => <IndexCard key={item.Name} item={item} />)}
                </div>
            ))}
        </div>
    );
};


// --- Desktop-First Components ---

/**
 * Renders a single row in the desktop performance table.
 * @param {{ item: object }} props
 */
const IndexRow = ({ item }) => {
    return (
        <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
            <td className="p-3 text-sm font-semibold text-gray-800 whitespace-nowrap">{item.Name}</td>
            <td className="p-3 text-sm text-gray-800 font-bold whitespace-nowrap">{item.LTP}</td>
            <td className={`p-3 text-sm whitespace-nowrap font-medium ${formatValue(item.YTD).color}`}>{item.YTD}</td>
            <td className={`p-3 text-sm whitespace-nowrap font-medium ${formatValue(item["1Week"]).color}`}>{item["1Week"]}</td>
            <td className={`p-3 text-sm whitespace-nowrap font-medium ${formatValue(item["1Month"]).color}`}>{item["1Month"]}</td>
            <td className={`p-3 text-sm whitespace-nowrap font-medium ${formatValue(item["3Months"]).color}`}>{item["3Months"]}</td>
            <td className={`p-3 text-sm whitespace-nowrap font-medium ${formatValue(item["6Months"]).color}`}>{item["6Months"]}</td>
            <td className={`p-3 text-sm whitespace-nowrap font-medium ${formatValue(item["1Year"]).color}`}>{item["1Year"]}</td>
            <td className={`p-3 text-sm whitespace-nowrap font-medium ${formatValue(item["2Years"]).color}`}>{item["2Years"]}</td>
            <td className={`p-3 text-sm whitespace-nowrap font-medium ${formatValue(item["3Years"]).color}`}>{item["3Years"]}</td>
        </tr>
    );
};

/**
 * Renders the full data table for desktop screens.
 * @param {{ indices: object }} props
 */
const PerformanceTable = ({ indices }) => {
    if (!indices || Object.keys(indices).length === 0) return null;
    // UPDATED: Abbreviated headers for desktop table
    const headers = ["Name", "LTP", "YTD(%)", "1W(%)", "1M(%)", "3M(%)", "6M(%)", "1Y(%)", "2Y(%)", "3Y(%)"];

    return (
        <div className="overflow-x-auto mt-6 rounded-lg border border-gray-200 shadow-md">
            <table className="min-w-full bg-white text-left">
                <thead className="bg-gray-50 sticky top-0 z-10">
                    <tr className="border-b-2 border-gray-300">
                        {headers.map(h => <th key={h} className="p-3 text-xs font-bold text-gray-500 uppercase tracking-wider">{h}</th>)}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {Object.entries(indices).map(([category, items]) => (
                        <React.Fragment key={category}>
                            <tr><th colSpan={headers.length} className="p-2 text-sm font-bold text-gray-700 bg-gray-100 sticky top-12 z-10">{category}</th></tr>
                            {items.map(item => <IndexRow key={item.Name} item={item} />)}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};


// --- Shared Components ---

/**
 * Displays the main market data cards for Sensex and Nifty.
 * @param {{ sensexData: object, niftyData: object }} props
 */
const MarketHeader = ({ sensexData, niftyData }) => {
    const sensexValue = formatValue(sensexData?.['1Week']);
    const niftyValue = formatValue(niftyData?.['1Week']);

    return (
        <div className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl shadow">
                    <div className="text-sm text-gray-600 font-medium">SENSEX</div>
                    <div className="text-2xl font-bold text-gray-800">{sensexData?.LTP || 'N/A'}</div>
                    <div className={`text-sm font-semibold ${sensexValue.color}`}>
                        {sensexValue.icon} {sensexValue.formatted}% (1W)
                    </div>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl shadow">
                    <div className="text-sm text-gray-600 font-medium">NIFTY 50</div>
                    <div className="text-2xl font-bold text-gray-800">{niftyData?.LTP || 'N/A'}</div>
                    <div className={`text-sm font-semibold ${niftyValue.color}`}>
                         {niftyValue.icon} {niftyValue.formatted}% (1W)
                    </div>
                </div>
            </div>
        </div>
    );
};

/**
 * A scrolling ticker for key indices.
 * @param {{ items: Array<object> }} props
 */
const ScrollingTicker = ({ items }) => {
    if (!items || items.length === 0) return null;
    const tickerItems = [...items, ...items];

    return (
        <div className="relative w-full overflow-hidden h-12 bg-gray-800 text-white mb-6 rounded-lg">
            <style>{`@keyframes marquee { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } } .animate-marquee { animation: marquee 60s linear infinite; }`}</style>
            <div className="absolute whitespace-nowrap animate-marquee flex items-center h-full">
                {tickerItems.map((item, index) => {
                    const itemValue = formatValue(item["1Week"]);
                    return (
                        <div key={index} className="inline-flex items-center mx-6">
                            <span className="font-bold text-sm">{item.Name}</span>
                            <span className="ml-3 text-sm">{item.LTP}</span>
                            <span className={`ml-2 text-xs font-semibold ${itemValue.color.replace('600', '400')}`}>({itemValue.formatted}%)</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};


// --- Main App Component ---

export default function App() {
    const [marketData, setMarketData] = useState(null);
    const [selectedMarket, setSelectedMarket] = useState('BSE');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(API_URL);
                if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
                const data = await response.json();
                setMarketData(data);
            } catch (err) {
                setError(err.message);
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const sensexData = marketData?.BSE_Indices?.['Key Indices']?.[0];
    const niftyData = marketData?.NSE_Indices?.['Key Indices']?.[0];
    const tickerData = selectedMarket === 'BSE' ? marketData?.BSE_Indices?.['Key Indices'] : marketData?.NSE_Indices?.['Key Indices'];
    const currentIndices = selectedMarket === 'BSE' ? marketData?.BSE_Indices : marketData?.NSE_Indices;

    return (
        <div className="bg-gray-100 min-h-screen font-sans">
            <div className="bg-white rounded-none sm:rounded-2xl shadow-none sm:shadow-xl border-none sm:border border-gray-200 p-4 sm:p-6 w-full max-w-7xl mx-auto">
                <div className="pt-24">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Market Performance</h1>
                    
                    {!loading && marketData && <MarketHeader sensexData={sensexData} niftyData={niftyData} />}
                    {!loading && marketData && <ScrollingTicker items={tickerData} />}

                    <div className="flex space-x-2 border-b border-gray-200">
                        <button onClick={() => setSelectedMarket('BSE')} className={`px-3 sm:px-4 py-2 text-sm font-semibold rounded-t-md transition-colors duration-200 ${selectedMarket === 'BSE' ? 'bg-blue-600 text-white border-b-2 border-blue-600' : 'bg-transparent text-gray-600 hover:bg-gray-200 border-b-2 border-transparent'}`}>BSE Indices</button>
                        <button onClick={() => setSelectedMarket('NSE')} className={`px-3 sm:px-4 py-2 text-sm font-semibold rounded-t-md transition-colors duration-200 ${selectedMarket === 'NSE' ? 'bg-blue-600 text-white border-b-2 border-blue-600' : 'bg-transparent text-gray-600 hover:bg-gray-200 border-b-2 border-transparent'}`}>NSE Indices</button>
                    </div>

                    {loading && (
                        <div className="text-center p-10 font-medium text-gray-500">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                            Loading Market Data...
                        </div>
                    )}

                    {error && (
                        <div className="text-center p-4 my-4 text-red-700 bg-red-100 rounded-lg">
                            <p className="font-bold">⚠️ Could not load data</p>
                            <p className="text-sm">{error}</p>
                        </div>
                    )}

                    {!loading && !error && marketData && (
                        <>
                            {/* Show cards on mobile, hide on medium screens and up */}
                            <div className="md:hidden">
                                <MobileCardView indices={currentIndices} />
                            </div>
                            {/* Hide table on mobile, show on medium screens and up */}
                            <div className="hidden md:block">
                                <PerformanceTable indices={currentIndices} />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
