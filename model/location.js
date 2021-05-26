var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const locationSchema = new Schema({
    type: String,
    title:  String,
    description: String,
    image_url:   String,
    user_id: Number
});



module.exports = mongoose.model('Location', locationSchema)
