const { Schema, model } = require('mongoose');
const validator = require('validator')

const SectionSchema = new Schema({
    name: {type: String, enum: ['9A', '9B', '9C', '9D', '9E', '10A', '10B', '10C', '10D', '10E', '11A', '11B', '11C', '11D', '12A', '12B', '12C', '12D']},
	classNum: {type: Number},
    section: {type: String, enum: ['A', 'B', 'C', 'D', 'E']},
    classTeacherId: {type: Schema.Types.ObjectId, ref: 'Employee'},
    maleMonitorId: {type: Schema.Types.ObjectId, ref: 'student'},
    femaleMonitorId: {type: Schema.Types.ObjectId, ref: 'student'},
    students: {type: Array},
    male: {type: Number, default: 0},
    female: {type: Number, default: 0}
}, {
	timestamps: true
});

SectionSchema.virtual('fullName').get(function () {
	return this.firstName + "" + this.middleName + "" + this.lastName;
})

const Section = model('Section', SectionSchema);
module.exports = Section;