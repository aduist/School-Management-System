const Joi = require('@hapi/joi');


const personalInfo = Joi.object().keys({
	firstName: Joi.string().alphanum().min(3).max(20).trim(true).required(),
	middleName: Joi.string().alphanum().min(3).max(20).trim(true).required(),
	lastName: Joi.string().alphanum().min(3).max(20).trim(true).required(),
	gender: Joi.string().valid('Male', 'Female').trim(true).required(),
	phoneNumber: Joi.numeric().length(10).trim(true).required(),
	email: Joi.string().trim(true).lowercase().email({minDomainSegments: 2, tlds: ['com', 'net']}),
	religion: Joi.string().valid('None', 'Orthodox', 'Catholic', 'Protestant', 'Muslim').trim(true).required(),
	birthDate: Joi.date().required(),
	nameOfSchool: Joi.string().required()
})

const placeInfo = Joi.object().keys({
	zone: Joi.string().alphanum().trim(true).required(),
	wereda: Joi.string().alphanum().trim(true).required(),
	tabya: Joi.string().alphanum().trim(true).required(),
	ketena: Joi.string().alphanum().trim(true).required(),
})

const threeData = Joi.object().keys({
	fullName: Joi.string().alphanum().trim(true).required(),
	phoneNumber: Joi.numeric().length(10).trim(true).required(),
	jobStatus: Joi.string().required().trim(true)
})
	


module.exports = {
	personalInfo,
	placeInfo,
	threeData
}