const CoinMarketCap = require('coinmarketcap-api');

const apiKey = '62427f41-c67d-4f23-9543-77a5b9e1147a'; // Replace with your CoinMarketCap API key
const client = new CoinMarketCap(apiKey);

const getCryptoRates = async (req, res) => {

    // Get tickers to fetch latest rates
    const response = await client.getTickers({ limit: 50 }); // Limit to fetch top 10        
    const data = response.data;

    const extractFields = (crypto) => {
        return {
            name: crypto.name,
            price: crypto.quote.USD.price,
            volume_change_24h: crypto.quote.USD.volume_change_24h,
        };
    };

    // Sort data to find top gainers and losers
    const sortedByPercentChange = data.sort((a, b) => b.quote.USD.percent_change_24h - a.quote.USD.percent_change_24h);

    // Extract and format top gainers and losers
    const topGainers = sortedByPercentChange.slice(0, 10).map(extractFields);
    const topLosers = sortedByPercentChange.slice(-10).reverse().map(extractFields);

    res.status(200).json({ status: 'success', topGainers, topLosers });
};

module.exports = { getCryptoRates };
