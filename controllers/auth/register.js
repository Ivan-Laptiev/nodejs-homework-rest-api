const {User} = require ("../../models");
const {registerSchema} = require ("../../schemas");
const {HttpError, sendEmail, createVerifyEmail} = require("../../helpers");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar")
const {nanoid} = require("nanoid")

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
	const verificationToken = nanoid();

	const newUser = await User.create({
		email,
		password: hashPassword,
		description,
		token,
		avatarURL,
		verificationToken
	});

	const mail = createVerifyEmail(email, verificationToken)
	await sendEmail(mail);

	res.status(201).json({
		user: {
			email: newUser.email,
			subscription: 'starter',
			verificationToken: newUser.verificationToken, 
		},
	});
} catch(error){
	next(error)
}
}; 
    

module.exports = register;