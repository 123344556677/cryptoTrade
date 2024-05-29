const { validate } = require("crypto-address-validators");
const { BadRequestError } = require('../errors')

const validateWalletAddress = async (address) => {

    const valid = await validate(address, "USDT", "TRC20");
    if (!valid) {
        throw new BadRequestError("Invalid TRC20 wallet address");
    }

};

module.exports = validateWalletAddress