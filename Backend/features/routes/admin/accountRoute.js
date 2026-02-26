const express = require('express');
const router = express.Router();
const { isAuth, Permits } = require('../../../helpers/jwtHelper');

const {
	signUp,
	signIn,
	changePassword,
	reset,
	refreshToken,
	signOut
} = require("../../controller/admin/authController");

const {
	getUsers,
	getActiveUser,
	getInactiveUser,
	deactivateUser,
} = require('../../controller/admin/userController');


//router protect, role only for manage permits
router
	.get('/users',
		isAuth,
		Permits(['manager', 'admin']),
		getUsers)
	.get('/activeUsers',
		isAuth,
		Permits(['manager', 'admin']),
		getActiveUser)
	.get('/inactiveUsers',
		isAuth,
		Permits(['manager', 'admin']),
		getInactiveUser)
	.post('/signup', signUp)
	.post('/signin', signIn)
	.post('/changePassword',
		isAuth,
		changePassword)
	.post('/refreshToken', refreshToken)
	.post('/signout', signOut)
	.put('/deactivate/:id',
		isAuth,
		Permits(['manager', 'admin']),
		deactivateUser)

module.exports = router;