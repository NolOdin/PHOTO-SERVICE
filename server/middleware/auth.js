const jwt  = require("jsonwebtoken");
const config = require('config');



const getToken = (user) => {
    
    try {
         return jwt.sign({
             _id: user._id,
             email: user.email,
             login: user.login,
             password: user.password
            }, 
            config.JWT_SECRET || `somethingsecret`,   {
                expiresIn: '48h'
        });
        
    } catch (error) {
        return console.log(error.message);
    }  
}
const isAuth = (req, res, next) => {
    const token = req.headers.authorization || req.headers.Authorization;
    if(token) {
        const onlyToken = token.slice(7, token.length);
        jwt.verify(onlyToken,
            config.JWT_SECRET || `somethingsecret`, 
             (error, decode)=>{
            if(error) {
                return res.status(401).send({message: 'Ошибка при создании токена!', error: error.message });
            }else {
            req.user = decode;
            return next();
            }
        });
    } else {
        return res.status(401).send({message: 'Токен не предоставляется!'});
    }

}

module.exports = { getToken, isAuth } ;