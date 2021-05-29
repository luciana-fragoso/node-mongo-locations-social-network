var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type: String, required: true, index: true},
    email: {type: String,
        required: true, 
        unique: true,    
    },
    password:{type: String, required: true},
    role: {
        type: String,
        default: 'user',
        enum: ["user", "admin"]
       },
       accessToken: {
        type: String
       }
    
});
module.exports = mongoose.model('User', userSchema)