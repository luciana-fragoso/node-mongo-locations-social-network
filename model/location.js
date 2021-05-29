var mongoose = require('mongoose');

var Schema = mongoose.Schema;

const locationSchema = new Schema({
    title:  String,
    description: String,
    image_url:   String,
    user_id: String,
    comments: [{user_id: String,comment:String}],
    isApproved: Boolean,
    numLikes: [String],
    numDislikes: [String]
});



module.exports = mongoose.model('Location', locationSchema)
