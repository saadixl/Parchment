var mongoose = require('mongoose');
var shortid = require('shortid');
mongoose.connect('mongodb://127.0.0.1/parchment');


var urlSchema = new mongoose.Schema({
    handle: {
        type: String,
        unique: true,
        'default': shortid.generate
    },
    markUp: {
        type: String
    }
});

// Creating a new model using the schema
var URL = mongoose.model('URL', urlSchema);

// Exporting the model
module.exports = URL;
