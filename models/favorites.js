const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var User = require('./users');
var Dish = require('./dishes');


var favoriteSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    dishes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dish'
    }]
},{
    timeStamps: true
},{ minimize: false });

var Favorites = mongoose.model('Favorite', favoriteSchema);
module.exports = Favorites;