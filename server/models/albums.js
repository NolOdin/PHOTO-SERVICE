const {Schema, model} = require('mongoose');

const Albums = new Schema({
    
    title: {type: String },
    owner: {type: Schema.Types.ObjectId, ref: 'Users'}
	
})

module.exports = model('Albums', Albums)