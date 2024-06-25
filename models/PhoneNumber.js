const mongoose = require('mongoose');

const PhoneNumberSchema = new mongoose.Schema({
    number: {
        type: String
    }
});

const PhoneNumbersSchema = new mongoose.Schema({
    numbers: [PhoneNumberSchema]
});

module.exports = mongoose.model('PhoneNumber', PhoneNumbersSchema);
