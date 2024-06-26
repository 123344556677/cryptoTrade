const axios = require('axios');

const apiKey = 'K5117OYL31TOJWCT'; // Replace with your Alpha Vantage API key

const getUnitedHealthStockRate = async (req, res) => {

    const response = await axios.get(`https://www.alphavantage.co/query`, {
        params: {
            function: 'GLOBAL_QUOTE',
            symbol: 'UNH',
            apikey: apiKey
        }
    });

    const data = response.data;
    const stockInfo = data['Global Quote'];

    if (!stockInfo) {
        return res.status(404).json({ status: 'error', message: 'Stock data not found' });
    }

    const currentRate = {
        symbol: stockInfo['01. symbol'],
        price: parseFloat(stockInfo['05. price']),
        volume: parseInt(stockInfo['06. volume']),
        lastTradingDay: stockInfo['07. latest trading day'],
        previousClose: parseFloat(stockInfo['08. previous close']),
        change: parseFloat(stockInfo['09. change']),
        changePercent: stockInfo['10. change percent']
    };

    res.status(200).json({ status: 'success', currentRate });

};

module.exports = { getUnitedHealthStockRate };
