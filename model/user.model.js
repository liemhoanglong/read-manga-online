var mongoose = require('mongoose');

// tạo Schema
var userSchema = new mongoose.Schema({
    fullName: String,
    email: {
        type: String,
        required: true
    },
    registerDate: {
        type: Date,
        default: Date.now()
    },
    isBanned: {
        type: Boolean,
        default: false
    },
    password:{
        type: String,
        required: true
    },
    favoriteSeries: [{
        type: mongoose.Types.ObjectId,
        ref: "series"
    }]

});
//tạo model

module.exports = mongoose.model("user", userSchema);
