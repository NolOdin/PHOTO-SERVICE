const fs = require('fs')
const {validationResult} = require('express-validator/check');
const {getToken, isAuth} = require ('../middleware/auth');
const  bcrypt = require('bcrypt');
const Users = require('../models/users');

class UserSevice {

    async createUsers(req, res) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(442).json({errors: errors.array()})
            }
            const foundUser = await Users.findOne ({ "email" : req.body.email });
            if(foundUser) {
                return res.status(442).json({errors: 'email is already taken!'})
            }
            const {login, email, password} = req.body;
           
            const user = new Users({  login,
                email,
                password: await bcrypt.hashSync(password, 10)
            });
            const newUser = await user.save();
            return newUser ? res.status(200).send({user:newUser, token:getToken(user)}) : res.status(404).send({message: 'invalid user data!'});
                
            } catch (error) {
                console.log(error.message);
               return res.status(500).send({message: 'user creation error'}); 
            }
            
    }
    async getUsers(req, res) {
		try {

		const users = await Users.find()
		.then(users => res.send(users))
		return res.json({users})

		}catch(e){
			console.log(e)
			return res.status(500).json({message:'Cannot get users !'})
		}
	}

    async loginUsers(req, res) {
        try {
            const { email, password } = req.body;        
            const loggedUser = await Users.findOne({ "email" : req.body.email });  
            
             if(!loggedUser){
                return res.status(404).send({ message: 'email is not found!' })
             } else {
                    if(bcrypt.compareSync(password, loggedUser.password)) {
                        const { _id, login, email, isAuth } = loggedUser;
                        return res.status(200).send({ _id, login, email, isAuth, token:getToken(loggedUser)});
                    }else {
                        return res.status(404).send({message: 'Invalid Password!'});
                    }
             }
       } catch (error) {     
            return res.status(500).send({error: error.message, message:"Internal Server Error"});
       }     
	}



}

module.exports = new UserSevice()