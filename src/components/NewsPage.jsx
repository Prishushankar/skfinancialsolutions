import React, { useState, useEffect } from 'react';

// The URL for your deployed FastAPI backend
const API_URL = 'https://financescraper.onrender.com/api/all-performance';

/**
 * Renders a single row in the performance table.
 * @param {{ item: object }} props - The properties for the component.
 */
const IndexRow = ({ item }) => {
    // This function determines the text color based on the value (positive/negative)
    const getValueColor = (value) => {
        // Remove commas and convert to a number
        const num = parseFloat(String(value).replace(/,/g, ''));
        if (isNaN(num) || num === 0) return 'text-gray-600'; // Neutral color for zero or non-numeric values
        return num < 0 ? 'text-red-600' : 'text-green-600';
    };

    return (
        <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
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
 * Renders the main table with headers and data sections for a given market.
 * @param {{ indices: object }} props - The properties for the component.
 */
const PerformanceTable = ({ indices }) => {
    if (!indices || Object.keys(indices).length === 0) {
        return <div className="text-center p-10 text-gray-500">No performance data available for this market.</div>;
    }

    const headers = ["Name", "LTP", "YTD(%)", "1Week(%)", "1Month(%)", "3Months(%)", "6Months(%)", "1Year(%)", "2Years(%)", "3Years(%)"];

    return (
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-[0_2px_8px_0_rgba(34,34,64,0.10)] mt-6">
            <table className="min-w-full bg-white text-left">
                <thead className="bg-gray-50 sticky top-0">
                    <tr className="border-b-2 border-gray-300">
                        {headers.map(h => <th key={h} className="p-3 text-xs font-bold text-gray-500 uppercase tracking-wider">{h}</th>)}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {Object.entries(indices).map(([category, items]) => (
                        <React.Fragment key={category}>
                            <tr>
                                <th colSpan={headers.length} className="p-2 text-sm font-bold text-gray-700 bg-gray-100 sticky top-12">
                                    {category}
                                </th>
                            </tr>
                            {items.map(item => <IndexRow key={item.Name} item={item} />)}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

/**
 * Displays the main market data cards for Sensex and Nifty.
 * @param {{ sensexData: object, niftyData: object }} props
 */
const MarketHeader = ({ sensexData, niftyData }) => {
    const getValueColor = (value) => {
        const num = parseFloat(String(value).replace(/,/g, ''));
        if (isNaN(num) || num === 0) return 'text-gray-600';
        return num < 0 ? 'text-red-600' : 'text-green-600';
    };

    return (
        <div className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* SENSEX Card */}
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl shadow-[0_4px_16px_0_rgba(34,34,64,0.12)]">
                    <div className="text-sm text-gray-600 font-medium">SENSEX</div>
                    <div className="text-2xl font-bold text-gray-800">{sensexData?.LTP || 'N/A'}</div>
                    <div className={`text-sm font-semibold ${getValueColor(sensexData?.['1Week'])}`}>
                        {parseFloat(sensexData?.['1Week']) >= 0 ? '▲' : '▼'} {sensexData?.['1Week'] || '0.00'}% (1 Week)
                    </div>
                </div>
                {/* NIFTY Card */}
                <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl shadow-[0_4px_16px_0_rgba(34,34,64,0.12)]">
                    <div className="text-sm text-gray-600 font-medium">NIFTY 50</div>
                    <div className="text-2xl font-bold text-gray-800">{niftyData?.LTP || 'N/A'}</div>
                    <div className={`text-sm font-semibold ${getValueColor(niftyData?.['1Week'])}`}>
                         {parseFloat(niftyData?.['1Week']) >= 0 ? '▲' : '▼'} {niftyData?.['1Week'] || '0.00'}% (1 Week)
                    </div>
                </div>
            </div>
        </div>
    );
};

/**
 * NEW: A scrolling ticker for key indices.
 * @param {{ items: Array<object> }} props
 */
const ScrollingTicker = ({ items }) => {
    if (!items || items.length === 0) return null;

    const getValueColor = (value) => {
        const num = parseFloat(String(value).replace(/,/g, ''));
        if (isNaN(num) || num === 0) return 'text-gray-400';
        return num < 0 ? 'text-red-400' : 'text-green-400';
    };

    // Duplicate items to create a seamless scrolling loop
    const tickerItems = [...items, ...items];

    return (
        <div className="relative w-full overflow-hidden h-12 bg-gray-800 text-white mb-6 rounded-lg">
            {/* We define the animation directly here for self-containment */}
            <style>
                {`
                @keyframes marquee {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 60s linear infinite;
                }
                `}
            </style>
            <div className="absolute whitespace-nowrap animate-marquee flex items-center h-full">
                {tickerItems.map((item, index) => (
                    <div key={index} className="inline-flex items-center mx-6">
                        <span className="font-bold text-sm">{item.Name}</span>
                        <span className="ml-3 text-sm">{item.LTP}</span>
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
 * The main App component that fetches and displays market performance data.
 */
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
                if (!response.ok) {
                    throw new Error(`Failed to fetch data. Status: ${response.status}`);
                }
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

    // Extract Sensex and Nifty data once marketData is available
    const sensexData = marketData?.BSE_Indices?.['Key Indices']?.[0];
    const niftyData = marketData?.NSE_Indices?.['Key Indices']?.[0];
    
    // Data for the ticker - use BSE Key Indices as a default, fallback to NSE
    const tickerData = marketData?.BSE_Indices?.['Key Indices'] || marketData?.NSE_Indices?.['Key Indices'];

    return (
        <div className="bg-gray-100 min-h-screen font-sans p-4 sm:p-6 lg:p-8">
            {/* Enhanced shadow for main container */}
            <div className="bg-white rounded-2xl shadow-[0_8px_32px_0_rgba(34,34,64,0.18)] border border-gray-200 p-6 flex flex-col w-full max-w-7xl mx-auto mt-24">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Market Performance</h1>
                {/* Render the header cards if data is available */}
                {!loading && marketData && <MarketHeader sensexData={sensexData} niftyData={niftyData} />}
                {/* Render the new scrolling ticker */}
                {!loading && marketData && <ScrollingTicker items={tickerData} />}
                <div className="flex space-x-2 border-b border-gray-200 mb-4">
                    <button
                        onClick={() => setSelectedMarket('BSE')}
                        className={`px-4 py-2 text-sm font-semibold rounded-t-md transition-colors duration-200 ${
                            selectedMarket === 'BSE' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-transparent text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        BSE Indices
                    </button>
                    <button
                        onClick={() => setSelectedMarket('NSE')}
                        className={`px-4 py-2 text-sm font-semibold rounded-t-md transition-colors duration-200 ${
                            selectedMarket === 'NSE' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-transparent text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        NSE Indices
                    </button>
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
                    <PerformanceTable 
                        indices={selectedMarket === 'BSE' ? marketData.BSE_Indices : marketData.NSE_Indices} 
                    />
                )}
            </div>
        </div>
    );
}
