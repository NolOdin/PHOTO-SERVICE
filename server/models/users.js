const {Schema, model} = require('mongoose');

const Users = new Schema({
	
    login: {type: String },
	email: {type: String, required: true},
	password: {type: String},
	registerDate:  {
        type: Date,
        default: function(){return Date.now()}
    },

})

module.exports = model('Users', Users)