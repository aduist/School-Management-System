const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator')

const UserSchema = new Schema({
	firstName: { type: String, required: true, trim: true },
	middleName: { type: String, required: true, trim: true },
	lastName: { type: String, required: true, trim: true },
	sex: { type: String, required: true, trim: true },
	phone: { type: String, required: true, unique: true, trim: true },
	email: {
		type: String,
		unique: true,
		trim: true,
		validate: validator.isEmail
	},
	role: {
		type: String,
		required: true,
		trim: true,
		default: 'manager',
		enum: [
			'admin',
			'cashier',
			'pharmacist',
			'store',
			'technical',
			'manager',
			'owner'
		]
	},
	username: { type: String, required: true, min: 6, unique: true, trim: true },
	password: { type: String, required: true, min: 6, trim: true },
	createdBy: { type: String },
	status: { type: Boolean, default: true },
}, {
	timestamps: true,
	toObject: { virtual: true },
	toJSON: { virtual: true }
});

UserSchema.pre('save', async function (next) {
	try {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(this.password, salt);
		this.password = hashedPassword;
		next();
	} catch (error) {
		next(error);
	}
});

UserSchema.methods.isValidPassword = async function (password) {
	try {
		return await bcrypt.compare(password, this.password)
	} catch (error) {
		throw error
	}
}
UserSchema.virtual('fullName').get(function () {
	return this.firstName + "" + this.middleName + "" + this.lastName;
})

const User = model('user', UserSchema);
module.exports = User;