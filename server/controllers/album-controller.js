const axios = require('axios');
const Albums = require('../models/albums');





class AlbumSevice {

    async createAlbums(req, res) {
        
          
        try {
               
            const {title } = req.body
            const album = new Albums({title, owner: req.user._id})

            if(!album){
                return res.status(201).json({message:'Album is not created!'})
            }
            await album.save()
            return res.json(album)
            
            } catch (error) {
                console.log(error.message);
               return res.status(500).send({message: 'Album creation error!'}); 
            }
            
    }
    async getAlbums(req, res) {
		try {

		const albums = await Albums.find()
		.then(albums => res.send(albums))
		return res.json({albums})

		}catch(e){
			console.log(e)
			return res.status(500).json({message:'Cannot get Albums !'})
		}
	}

    async updateAlbums(req, res) {
        try{
            const {id} = req.params
            const { title } = req.body
            const updateAlb = { title, _id: id }
                await Albums.findByIdAndUpdate(id, updateAlb, { new: true });
            if(!updateAlb){
                return res.status(201).json({message:'Alubm is not updated!'})
            }

            return res.json(updateAlb)
        }catch(error){
            console.log(error)
        }
    }
    async deleteAlbums(req, res) {
        try {
            const delAlbum = await Albums.findOneAndDelete({_id: req.params.id })
            if (!delAlbum) {
                return res.status(400).json({message: 'Album not found'})
            }
            return res.json({message: 'Album was deleted'})
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: 'Server error'})
        }
    }

    

}

module.exports = new AlbumSevice()