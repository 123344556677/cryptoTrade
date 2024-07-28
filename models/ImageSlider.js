const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
        unique: true
    }
});

const ImageSliderSchema = new mongoose.Schema({
    images: [ImageSchema]
});

module.exports = mongoose.model('ImageSlider', ImageSliderSchema);
