const Router = require('express');
const AlbumService = require('../controllers/album-controller')
const {isAuth} = require ('../middleware/auth');

const router = new Router()

router.post('/load-albums', isAuth, AlbumService.createAlbums )
router.get('/get-albums', AlbumService.getAlbums )
router.delete('/delete-albums/:id', isAuth, AlbumService.deleteAlbums )
router.patch('/update-album/:id', isAuth, AlbumService.updateAlbums )





module.exports = router