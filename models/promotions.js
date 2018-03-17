const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);

var Currency = mongoose.Types.Currency;
const Schema = mongoose.Schema;

var promotionSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	image:{
		type: String,
		required: true
	},
	label:{
		type: String,
		default: ''
	},
	price:{
		type: Currency,
		required: true
	},
	description:{
		type: String,
		required: true
	},
	features:{
		type:Boolean,
		default: false
	}

},{
	timestamps: true
});

var Promotions = mongoose.model('promotion', promotionSchema);

module.exports = Promotions;