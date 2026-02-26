const createError = require('http-errors');
const User = require('../../model/configuration/userModel');
const {
	AccessToken,
	verifyRefreshToken
} = require("../../../helpers/jwtHelper");
const { comparePassword, hashPassword } = require('../../../helpers/generate_hash');

//signup, login, changepasswword, verfiy, 
module.exports = {
	signUp: async (req, res, next) => {
		try {
			const { firstName, middleName, lastName, sex, phone, email, role, username, password } = req.body;
			if (!firstName || !middleName || !lastName || !sex ||
				!phone || !email || !role || !username || !password) throw createError.BadRequest();
			const doesExist = await User.findOne({
				$and: [
					{ phone: phone }
				]
			});
			if (doesExist) throw createError.Conflict(`${phone} is already has been registered `);
			const newUser = new User({
				firstName,
				middleName,
				lastName,
				sex, phone,
				email,
				role,
				username,
				password,
				// createdBy: req.payload.username
			})
			const user = await newUser.save();
			if (user) {
				return res.status(200).json({
					message: 'user account create successfully',
					user,
				})
			} else {
				return res.status(500).json({
					error: "Fail to sign up"
				});
			}
		} catch (error) {
			if (error.isJoi === true) err.status = 422;
			next(error)
		}
	},
	signIn: async (req, res, next) => {
		try {
			// const checkInput = await signinSchema.validateAsync(req.body);
			const user = await User.findOne({ username: req.body.username });
			if (!user) throw createError.NotFound('User not registered')
			const isMatch = await user.isValidPassword(req.body.password);
			if (!isMatch) throw createError.Unauthorized('username/password not valid');
			if (!user.status === true) {
				return res.status(403).json({
					message: 'You account is suspended or deactivated.'
				})
			}
			const accessToken = await AccessToken(user.id);
			// const refreshToken = await signRefreshToken(user.id);
			return res.status(200).json({
				message: 'sign in successfully',
				user,
				accessToken,
				// refreshToken
			})

		} catch (error) {
			if (error.isJoi === true) return next(createError.BadRequest("Invalid user name or password"))
			next(error)
		}
	},
	refreshToken: async (req, res, next) => {
		try {
			const { refreshToken } = req.body;
			if (!refreshToken) throw createError.BadRequest()
			const userId = await verifyRefreshToken(refreshToken)
			const accessToken = await AccessToken(userId);
			// const refToken = await signRefreshToken(userId)
			return res.send({
				accessToken: accessToken,
				// refreshToken: refToken
			})
		} catch (error) {
			next(error)

		}
	},
	signOut: async (req, res, next) => {
		try {
			const { refreshToken } = req.body;
			if (!refreshToken) throw createError.BadRequest()
			const userId = await verfiyAccessToken(refreshToken);
			client.DELETE(userId, (err, val) => {
				if (err) {
					console.log(err.message)
					throw createError.InternalServerError();
				}
				res.status(204)
			})

		} catch (error) {
			next(error)
		}
	},

	changePassword: async (req, res, next) => {
		try {
			const userId = req.payload._id;
			const user = req.payload;
			const { oldPassword, confirmPassword, newPassword } = req.body;
			const findUser = await User.findOne({ _id: userId._id });
			if (!findUser) return res.status(400).json({
				message: 'User doesn\'t exist'
			})
			if (newPassword !== confirmPassword) return res.status(400).json({
				message: 'New & ConfIrm password doesn\'t match'
			})

			const isValidPassword = await comparePassword(oldPassword, user.password);
			console.log(isValidPassword);
			if (isValidPassword) return res.status(400).json({
				message: 'Wrong Password'
			})
			const hashNewPassword = await hashPassword(newPassword);
			findUser.password = hashNewPassword;
			const correctPassword = await findUser.save();
			if (correctPassword) {
				const newChangedPassword = await User.findOneAndUpdate(
					{ _id: user.Id },
					{ createdBy: user.username },
					{ password: hashNewPassword },
					{ new: true },
				)
				findUser.save(newChangedPassword)
				return res.status(200).json({
					message: `Password Changed successfully`
				})
			}
		} catch (error) {
			next(error)
		}

	},

	reset: async (req, res, next) => {
	},

	deactivate: async (req, res, next) => {
	},
}
