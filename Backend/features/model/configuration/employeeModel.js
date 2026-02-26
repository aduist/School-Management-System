const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator')

const EmployeeSchema = new Schema({
	firstName: { type: String, required: true, trim: true },
	middleName: { type: String, required: true, trim: true },
	lastName: { type: String, required: true, trim: true },
	gender: { type: String, required: true, enum: ['Male', 'Female'] },
	phoneNumber: { type: Number, required: true, unique: true, trim: true },
	email: {type: String, unique: true, trim: true, validate: validator.isEmail},
	username: { type: String, required: true, min: 6, unique: true, trim: true },
	password: { type: String, required: true, min: 6, trim: true },
    role: {type: String, required: true, enum: ['Teacher', 'Registirar', 'Director']},
    classTeacherOf: {type: Schema.Types.ObjectId, ref: 'Section'},
    teacherOf: {type: Array},
	secured: {type: Boolean, default: false},
    teachsNow: [
        {
            subject: {type: String, required: true, trim: true},
            class: {type: String, required: true, enum: ['9A', '9B', '9C', '9D', '9E', '10A', '10B', '10C', '10E', '11A', '11B', '11C', '11D', '12A', '12B', '12C', '12D']},
        }
    ]
}, {
	timestamps: true
});

EmployeeSchema.pre('save', async function (next) {
	try {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(this.password, salt);
		this.password = hashedPassword;
		next();
	} catch (error) {
		next(error);
	}
});

EmployeeSchema.methods.isValidPassword = async function (password) {
	try {
		return await bcrypt.compare(password, this.password)
	} catch (error) {
		throw error
	}
}
EmployeeSchema.virtual('fullName').get(function () {
	return this.firstName + "" + this.middleName + "" + this.lastName;
})

const Employee = model('Employee', EmployeeSchema);
module.exports = Employee;