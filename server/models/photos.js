const {Schema, model} = require('mongoose');

const Photos = new Schema({
    
    albumId: {type: Schema.Types.ObjectId, ref: 'Albums'},
    albumTitle: {type: String},
    title: {type: String},
    url: {type: String, default: ''},
    thumbnailUrl: {type: String, default: ''},
    owner: {type: Schema.Types.ObjectId, ref: 'Users'}
    
})

module.exports = model('Photos', Photos)