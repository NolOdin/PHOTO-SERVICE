const axios = require('axios');
const Photos = require('../models/photos');
const Albums = require('../models/albums')





class PhotoSevice {

    async createPhotos(req, res) {
        
           
        try {
             
                    const {url, thumbnailUrl } = req.body

                    const findAlbum = await Albums.findOne({ "albumTitle" : req.body.albumTitle });
                    if(!findAlbum){
                        return res.status(201).json({message:'Album is not found!'})
                    }
                    
                    const photo = new Photos({url, thumbnailUrl, title: req.file.originalname, owner: req.user._id, albumId: findAlbum._id  })
                    if(!photo){
                        return res.status(201).json({message:'Photo is not created!'})
                    }
                    await photo.save()
                    return res.json(photo)

            
            } catch (error) {
                console.log(error.message);
               return res.status(500).send({message: 'Photo creation error!'}); 
            }
            
    }
    async getPhotos(req, res) {
		try {

		const photos = await Photos.find()
		.then(photos => res.send(photos))
		return res.json({photos})

		}catch(e){
			console.log(e)
			return res.status(500).json({message:'Cannot get Photos !'})
		}
	}
    async deletePhotos(req, res) {
        try {
            const delPhoto = await Photos.findOneAndDelete({_id: req.params.id })
            if (!delPhoto) {
                return res.status(400).json({message: 'Photos is not found'})
            }
            return res.json({message: 'Photo was deleted'})
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: 'Server error'})
        }
    }


    

}

module.exports = new PhotoSevice()


  /* 
                async function getData (url) {
            const {data} = await axios.get(url)
            return data
            }
               
               const a = await getData('http://jsonplaceholder.typicode.com/photos')
                
                    let count = 0
                    let chCount = 0
                    for (let i = 0; i < a.length; i++) {
                        chCount += 1
                        if(chCount == 51){
                            
                            for (let k = 0; k < 1 ; k ++) {
                                count += 1
                                const obj = a[i]
                                const albumData = obj.albumId
                                albumData  = req.body
                                const album = new Album({  
                                   albumData
                                });
                                k = 0
                            }
                        chCount = 0
                        }
                    } */
                    
