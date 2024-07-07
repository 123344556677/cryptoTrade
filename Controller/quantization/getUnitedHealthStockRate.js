const axios = require('axios');
const { NotFoundError } = require('../../errors');
const apiKey = 'a5152acf06c04e7d8b2e67977ca5b8ef'; // Replace with your Twelve Data API key

const getUnitedHealthStockRate = async (req, res) => {

    const response = await axios.get(`https://api.twelvedata.com/quote`, {
        params: {
            symbol: 'UNH',
            apikey: apiKey
        }
    });

    const data = response.data;

    if (!data || data.status === 'error') {
        throw new NotFoundError('Stock data not found');
    }

    const currentRate = {
        symbol: data.symbol,
        price: parseFloat(data.close),
        volume: parseInt(data.volume),
        lastTradingDay: data.datetime,
        previousClose: parseFloat(data.previous_close),
        change: parseFloat(data.change),
        changePercent: data.percent_change
    };

    res.status(200).json({ status: 'success', currentRate });

};

module.exports = { getUnitedHealthStockRate };
