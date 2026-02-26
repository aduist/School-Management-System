const User = require("../../model/configuration/userModel");

// list, active, inactive, toggle, 
module.exports = {
	getUsers: async (req, res, next) => {
		try {
			const users = await User.find().select('-password');
			if (users) {
				return res.status(200).json({
					message: 'users account list',
					users
				});
			} else {
				return res.status(500).json({
					error: "Fail To fetch users"
				});
			}
		} catch (error) {
			next(error)
		}
	},
	getActiveUser: async (req, res, next) => {
		try {
			const pipeline = [
				{ '$match': { status: true } }
			];
			const users = await User.aggregate(pipeline)
			if (users) {
				console.log(users)
				return res.status(200).json({
					message: 'Active users account list',
					users
				});
			} else {
				return res.status(500).json({
					error: "Fail to get active users"
				});
			}
		} catch (error) {
			next(error)
		}

	},
	getInactiveUser: async (req, res, next) => {
		try {
			const pipeline = [
				{ '$match': { status: false } }
			];
			const users = await User.aggregate(pipeline)
			if (users) {
				return res.status(200).json({
					message: 'Inactive users account list',
					users
				});
			} else {
				return res.status(500).json({
					error: "Fail To fetch Inactive users"
				});
			}
		} catch (error) {
			next(error)
		}
	},

	deactivateUser: async (req, res, next) => {
		try {
			const _user = await User.findOne({ _id: req.params.id });
			_user.status = !_user.status;
			const user = await _user.save();
			if (user.status === true) {
				return res.status(200).json({
					message: `Account is Activated`,
					info: user.status
				});
			} else if (user.status === false) {
				return res.status(500).json({
					message: `Account is Deactivated`,
					info: user.status,
				});
			} else {
				return res.status(500).json({
					error: "Fails to deactivate/activate user"
				});
			}
		} catch (error) {
			next(error)
		}

	},
}