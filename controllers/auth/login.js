const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { User } = require('../../models');
const { loginSchema } = require('../../schemas');
const { HttpError } = require('../../helpers');
require("dotenv").config();
const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
	try{
	const { error } = loginSchema.validate (req.body);
	if (error) {
		throw HttpError(400, error.message);
	}
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (!user) {
		throw HttpError(401, 'Email not found');
	}

	if(!user.verify){
		throw HttpError(401, 'Email not verify');
	}

	const passwordCompare = await bcrypt.compare(password, user.password);
	if (!passwordCompare) {
		throw HttpError(401, 'Email or password is wrong');
	}

	const payload = {
		id: user._id,
	};
	const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '9h' });
	await User.findByIdAndUpdate(user._id, { token });
	res.json({
		token,
		user: {
			email: user.email,
			subscription: user.subscription,
		},
	});
} catch(error) {
	next(error)
  }  
};

module.exports = login;