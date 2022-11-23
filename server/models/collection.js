var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Images = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    url: {
        type: String
    }
})

module.exports = mongoose.model('Images', Images);