const { User } = require('../../models');

const typeSubscription = ['starter', 'pro', 'business'];

const updateSubscription = async (req, res, next) => {
	 try {
        const { _id } = req.user;
	const { subscription } = req.body;
	const wichSubscription = typeSubscription.find(
		item => item === subscription
	);
	if (!wichSubscription) {
		throw Error('This type of subscription does not exist');
	}
	await User.findByIdAndUpdate(_id, req.body, {new: true});
	res.json({
		user: {
			subscription,
		},
		massage: 'Subscription renewed',
	});
} catch(error){
    next(error)
}
};

module.exports = updateSubscription;