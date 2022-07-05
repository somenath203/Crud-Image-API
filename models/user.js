const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    avatar: {
        type: String,
        required: true
    },
    cloudinary_id: {
        type: String
    }
});

module.exports = mongoose.model('User', userSchema);