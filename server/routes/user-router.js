const Router = require('express');
const UserService = require('../controllers/user-controller')
const {userValidator} = require('../services/validator')




const router = new Router()

router.get('/', UserService.getUsers )
router.post('/register', userValidator, UserService.createUsers )
router.post('/login', UserService.loginUsers )




module.exports = router