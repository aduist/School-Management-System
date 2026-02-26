const { Schema, model } = require('mongoose');

const StudentSchema = new Schema({
	firstName: { type: String, required: true, trim: true },
	middleName: { type: String, required: true, trim: true },
	lastName: { type: String, required: true, trim: true },
	gender: { type: String, required: true, enum: ['Male', 'Female'] },
	phoneNumber: { type: String, required: true, unique: true, trim: true },
	email: {type: String, unique: true, trim: true},
    religion: {type: String, trim: true, required: true},
    birthData: {
        birthDate: {type: Date, required: true},
        zone: {type: String, required: true, trim: true},
        wereda: {type: String, required: true, trim: true},
        tabya: {type: String, required: true, trim: true},
        ketena: {type: String, required: true, trim: true},
    },
    livingPlace: {
        zone: {type: String, required: true, trim: true},
        wereda: {type: String, required: true, trim: true},
        tabya: {type: String, required: true, trim: true},
        ketena: {type: String, required: true, trim: true},
    },
    motherName: {type: String, trim: true},
    guidanceData: {
        fullName: {type: String, trim: true, required: true},
        phoneNumber: {type: Number, trim: true, required: true},
        jobStatus: {type: String, trim:true, required: true}
    },
    suretyData: {
        fullName: {type: String, trim: true, required: true},
        phoneNumber: {type: Number, trim: true, required: true},
        jobStatus: {type: String, trim:true, required: true}
    },
    schoolFromData: {
        nameOfSchool: {type: String, trim: true, required: true},
        zone: {type: String, required: true, trim: true},
        wereda: {type: String, required: true, trim: true},
        tabya: {type: String, required: true, trim: true},
    },
    eightGradeData: {
        nationalExamAvg: {type: Number, trim: true, required: true},
        nationalExamPercentail: {type: Number, trim: true, required: true},
        eightGradeAvg: {type: Number, trim: true, required: true},
        eightGradeRank: {type: Number, trim: true, required: true},
    },
    entranceExamData: {
        english: {type: Number, trim: true},
        maths: {type: Number, trim: true},
        physics: {type: Number, trim: true},
        bio: {type: Number, trim: true},
        chemistry: {type: Number, trim: true},
        aptitude: {type: Number, trim: true},
        rank: {type: Number, trim: true},
    },
    idNumber: {type: String, unique: true},
    currentId: {type: Schema.Types.ObjectId, ref: 'studentcurrent'},
    profileImage: {type: String}
}, {
	timestamps: true
});

StudentSchema.virtual('fullName').get(function () {
	return this.firstName + "" + this.middleName + "" + this.lastName;
})

const Student = model('student', StudentSchema);
module.exports = Student;