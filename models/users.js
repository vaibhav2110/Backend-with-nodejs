const mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

const Schema = mongoose.Schema;


var UserSchema = new Schema({
    firstname: {
      type: String,
      default: ''
    },
    lastname: {
      type: String,
      default: ''
    },
    facebookId: String,
	admin: {
		type: Boolean,
		default: false
	}
});

UserSchema.plugin(passportLocalMongoose);
var Users = mongoose.model('user', UserSchema);
module.exports = Users;

