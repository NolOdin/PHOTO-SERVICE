const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const config = require('config');
const userRoute = require('./routes/user-router')
const photoRoute = require('./routes/photo-router')
const albumRoute = require('./routes/album-router')
const multer = require('multer')
const path = require('path')
const bodyParser = require('body-parser'); 



const PORT = config.get('SERVER_PORT')

const app = express()
app.use(cors())
app.use(express.json())
app.use(bodyParser.json ({limit: '10mb', extended: true}))
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded ({limit: '10mb', extended: true}))
app.use(express.static(path.resolve(__dirname, 'avatars')))

app.use('/user', userRoute )
app.use('/photo',  photoRoute)
app.use('/album', albumRoute )


async function server() {
	try {

	await mongoose.connect(config.get('DB_URL'), {useNewUrlParser: true,
		})
		app.listen(PORT, () => {
		console.log('сервер запущен ...', PORT)
		})

	}catch (e){
		console.log(e)
	}
}

server()