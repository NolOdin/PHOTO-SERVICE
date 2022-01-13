const Router = require('express');
const PhotoService = require('../controllers/photo-controller')
const uploadImg = require('../middleware/upload')
const {isAuth} = require ('../middleware/auth');

const router = new Router()

router.post('/load-photos', isAuth, uploadImg, PhotoService.createPhotos )
router.get('/get-photos', PhotoService.getPhotos )
router.delete('/delete-photos/:id', isAuth, PhotoService.deletePhotos )



module.exports = router