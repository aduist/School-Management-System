const JWT = require('jsonwebtoken');
const createError = require('http-errors');
const User = require('../features/model/configuration/userModel');

module.exports = {
	AccessToken: (userData) => {
		return new Promise((resolve, reject) => {
			const role = userData.role ? userData.role : 'Student'
			const payload = {
				userId: userData._id,
				fullName: userData.firstName + " " + userData.middleName + " " + userData.lastName,
				role: role
			};
			const secret = process.env.ACCESS_TOKEN_SECRET;
			const options = {
				issuer: "kshsStem",
				audience: userData._id,
			}
			JWT.sign(payload, secret, (err, token) => {
				if (err) {
					reject(createError.InternalServerError(err))
				}
				resolve(token)
			})
		})
	},

	isAuth: async (req, res, next) => {
		const bearer = req.headers.authorization;
		if (!bearer) return res.status(403).json({
			message: "You are not authorized to access"
		});
		const [, token] = bearer.split(" ");
		if (!token) return res.status(400).json({
			message: "You have to login!"
		});
		const decodePayload = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET);
		const user = await User.findOne({ _id: decodePayload.aud });
		if (!user) {
			return res.status(400).json({
				message: "user no longer exist"
			});
		}
		req.payload = user;
		next();
	},

	Permits: (data) => {
		return (req, res, next) => {
			const role = req.payload.role;
			if (data.includes(role)) {
				next()
			} else {
				return res.status(403).json({
					message: 'Your don have a permission'
				})
			}
		}
	},

	RefreshToken: (userId) => {
		return new Promise((resolve, reject) => {
			const payload = {
			};
			const secret = process.env.REFRESH_TOKEN_SECRET;
			const options = {
				expiresIn: "1y",
				issuer: "apex.com",
				audience: userId,
			}
			JWT.sign(payload, secret, options, (err, token) => {
				if (err) {
					console.log(err.message);
					reject(createError.InternalServerError())
				}
				resolve(token)
			})
		})
	},

	verifyRefreshToken: (refreshToken) => {
		return new Promise((resolve, reject) => {
			JWT.verify(refreshToken,
				process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
					if (err) return reject(createError.Unauthorized())
					const userId = payload.audience;
					resolve(userId);
				})
		})
	},




}