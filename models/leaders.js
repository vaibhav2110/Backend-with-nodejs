const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var leaderSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	image:{
		type: String,
		required: true
	},
	designation:{
		type: String,
		default: ''
	},
	abbr:{
		type: String,
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

var Leaders = mongoose.model('leader', leaderSchema);

module.exports = Leaders;