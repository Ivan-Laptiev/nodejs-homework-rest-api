const { HttpError, createVerifyEmail, sendEmail } = require("../../helpers");
const { User } = require("../../models");
const { verifyEmailSchema } = require("../../schemas");

const resendVerify = async(req,res, next) => {
	try {
		const { error } = verifyEmailSchema.validate(req.body);
	if (error) { 
		throw HttpError(400, "Bad Request");
	}
	const {email} = req.body;
	const user = await User.findOne({email})

	if (!user){
		throw HttpError(400, "Email not registered")
	}

	if( user.verify) {
		throw HttpError(400, "Verification has already been passed")
	}

	const mail = await createVerifyEmail(email, user.verificationToken);
	await sendEmail(mail);

	res.json({
		message: "Verify email resend"
	})
} catch(error) {
	next(error)
  }  
}

module.exports = resendVerify; 