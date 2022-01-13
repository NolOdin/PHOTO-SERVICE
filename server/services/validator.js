const {body, validationResult} = require('express-validator/check');

const validators = {
userValidator: [body('email').isEmail()
				.withMessage('invalid mail!')]
}

module.exports = validators;