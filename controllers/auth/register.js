const {User} = require ("../../models");
const {registerSchema} = require ("../../schemas");
const {HttpError} = require("../../helpers");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar")

const register = async(req, res, next) =>{
	try{
    const {error} = registerSchema.validate(req.body);
    if(error) {
        throw HttpError(400, error.message);
	}
	const { email, password, description, token } = req.body;
	const user = await User.findOne({ email });
	if (user) {
		throw HttpError(409, 'Email in use');
	}
	const hashPassword = await bcrypt.hash(password, 10);
	const avatarURL = gravatar.url(email);

	const newUser = await User.create({
		email,
		password: hashPassword,
		description,
		token,
		avatarURL
	});
	res.status(201).json({
		user: {
			email: newUser.email,
			subscription: 'starter', 
		},
	});
} catch(error){
	next(error)
}
}; 
    

module.exports = register;