const { Schema, model } = require('mongoose');

const StudentSchema = new Schema({
	studentId: {type: mongoose.Schema.Types.ObjectId, ref: 'student'},
    grade: {type: Number, enum: [9, 10, 11, 12]},
    section: {type: String, enum: ['A', 'B', 'C', 'D', 'E']},
    groupNumber: {type: Number},
    dormNumber: {type: Number, required: true},
    firstSemisterResult: {
        tigrigna: {
            shortExamOne: {type: Number, min: 0, max: 10},
            exerciseOne: {type: Number, min: 0, max: 10},
            midExam: {type: Number, min: 0, max: 20},
            shortExamTwo: {type: Number, min: 0, max: 10},
            finalExam: {type: Number, min: 0, max:50}
        },
        amharic: {
            shortExamOne: {type: Number, min: 0, max: 10},
            exerciseOne: {type: Number, min: 0, max: 10},
            midExam: {type: Number, min: 0, max: 20},
            shortExamTwo: {type: Number, min: 0, max: 10},
            finalExam: {type: Number, min: 0, max:50}
        },
        english: {
            shortExamOne: {type: Number, min: 0, max: 10},
            exerciseOne: {type: Number, min: 0, max: 10},
            midExam: {type: Number, min: 0, max: 20},
            shortExamTwo: {type: Number, min: 0, max: 10},
            finalExam: {type: Number, min: 0, max:50}
        },
        maths: {
            shortExamOne: {type: Number, min: 0, max: 10},
            exerciseOne: {type: Number, min: 0, max: 10},
            midExam: {type: Number, min: 0, max: 20},
            shortExamTwo: {type: Number, min: 0, max: 10},
            finalExam: {type: Number, min: 0, max:50}
        },
        physics: {
            shortExamOne: {type: Number, min: 0, max: 10},
            exerciseOne: {type: Number, min: 0, max: 10},
            midExam: {type: Number, min: 0, max: 20},
            shortExamTwo: {type: Number, min: 0, max: 10},
            finalExam: {type: Number, min: 0, max:50}
        },
        chemistry: {
            shortExamOne: {type: Number, min: 0, max: 10},
            exerciseOne: {type: Number, min: 0, max: 10},
            midExam: {type: Number, min: 0, max: 20},
            shortExamTwo: {type: Number, min: 0, max: 10},
            finalExam: {type: Number, min: 0, max:50}
        },
        biology: {
            shortExamOne: {type: Number, min: 0, max: 10},
            exerciseOne: {type: Number, min: 0, max: 10},
            midExam: {type: Number, min: 0, max: 20},
            shortExamTwo: {type: Number, min: 0, max: 10},
            finalExam: {type: Number, min: 0, max:50}
        },
        geography: {
            shortExamOne: {type: Number, min: 0, max: 10},
            exerciseOne: {type: Number, min: 0, max: 10},
            midExam: {type: Number, min: 0, max: 20},
            shortExamTwo: {type: Number, min: 0, max: 10},
            finalExam: {type: Number, min: 0, max:50}
        },
        history: {
            shortExamOne: {type: Number, min: 0, max: 10},
            exerciseOne: {type: Number, min: 0, max: 10},
            midExam: {type: Number, min: 0, max: 20},
            shortExamTwo: {type: Number, min: 0, max: 10},
            finalExam: {type: Number, min: 0, max:50}
        },
        civic: {
            shortExamOne: {type: Number, min: 0, max: 10},
            exerciseOne: {type: Number, min: 0, max: 10},
            midExam: {type: Number, min: 0, max: 20},
            shortExamTwo: {type: Number, min: 0, max: 10},
            finalExam: {type: Number, min: 0, max:50}
        },
        ICT: {
            shortExamOne: {type: Number, min: 0, max: 10},
            exerciseOne: {type: Number, min: 0, max: 10},
            midExam: {type: Number, min: 0, max: 20},
            shortExamTwo: {type: Number, min: 0, max: 10},
            finalExam: {type: Number, min: 0, max:50}
        },
        HPE: {
            shortExamOne: {type: Number, min: 0, max: 10},
            exerciseOne: {type: Number, min: 0, max: 10},
            midExam: {type: Number, min: 0, max: 20},
            shortExamTwo: {type: Number, min: 0, max: 10},
            finalExam: {type: Number, min: 0, max:50}
        },
        TD: {
            shortExamOne: {type: Number, min: 0, max: 10},
            exerciseOne: {type: Number, min: 0, max: 10},
            midExam: {type: Number, min: 0, max: 20},
            shortExamTwo: {type: Number, min: 0, max: 10},
            finalExam: {type: Number, min: 0, max:50}
        },
        rank: {type: Number, trim: true, required: true}
    },
    secondSemisterResult: {
        tigrigna: {
            shortExamOne: {type: Number, min: 0, max: 10},
            exerciseOne: {type: Number, min: 0, max: 10},
            midExam: {type: Number, min: 0, max: 20},
            shortExamTwo: {type: Number, min: 0, max: 10},
            finalExam: {type: Number, min: 0, max:50}
        },
        amharic: {
            shortExamOne: {type: Number, min: 0, max: 10},
            exerciseOne: {type: Number, min: 0, max: 10},
            midExam: {type: Number, min: 0, max: 20},
            shortExamTwo: {type: Number, min: 0, max: 10},
            finalExam: {type: Number, min: 0, max:50}
        },
        english: {
            shortExamOne: {type: Number, min: 0, max: 10},
            exerciseOne: {type: Number, min: 0, max: 10},
            midExam: {type: Number, min: 0, max: 20},
            shortExamTwo: {type: Number, min: 0, max: 10},
            finalExam: {type: Number, min: 0, max:50}
        },
        maths: {
            shortExamOne: {type: Number, min: 0, max: 10},
            exerciseOne: {type: Number, min: 0, max: 10},
            midExam: {type: Number, min: 0, max: 20},
            shortExamTwo: {type: Number, min: 0, max: 10},
            finalExam: {type: Number, min: 0, max:50}
        },
        physics: {
            shortExamOne: {type: Number, min: 0, max: 10},
            exerciseOne: {type: Number, min: 0, max: 10},
            midExam: {type: Number, min: 0, max: 20},
            shortExamTwo: {type: Number, min: 0, max: 10},
            finalExam: {type: Number, min: 0, max:50}
        },
        chemistry: {
            shortExamOne: {type: Number, min: 0, max: 10},
            exerciseOne: {type: Number, min: 0, max: 10},
            midExam: {type: Number, min: 0, max: 20},
            shortExamTwo: {type: Number, min: 0, max: 10},
            finalExam: {type: Number, min: 0, max:50}
        },
        biology: {
            shortExamOne: {type: Number, min: 0, max: 10},
            exerciseOne: {type: Number, min: 0, max: 10},
            midExam: {type: Number, min: 0, max: 20},
            shortExamTwo: {type: Number, min: 0, max: 10},
            finalExam: {type: Number, min: 0, max:50}
        },
        geography: {
            shortExamOne: {type: Number, min: 0, max: 10},
            exerciseOne: {type: Number, min: 0, max: 10},
            midExam: {type: Number, min: 0, max: 20},
            shortExamTwo: {type: Number, min: 0, max: 10},
            finalExam: {type: Number, min: 0, max:50}
        },
        history: {
            shortExamOne: {type: Number, min: 0, max: 10},
            exerciseOne: {type: Number, min: 0, max: 10},
            midExam: {type: Number, min: 0, max: 20},
            shortExamTwo: {type: Number, min: 0, max: 10},
            finalExam: {type: Number, min: 0, max:50}
        },
        civic: {
            shortExamOne: {type: Number, min: 0, max: 10},
            exerciseOne: {type: Number, min: 0, max: 10},
            midExam: {type: Number, min: 0, max: 20},
            shortExamTwo: {type: Number, min: 0, max: 10},
            finalExam: {type: Number, min: 0, max:50}
        },
        ICT: {
            shortExamOne: {type: Number, min: 0, max: 10},
            exerciseOne: {type: Number, min: 0, max: 10},
            midExam: {type: Number, min: 0, max: 20},
            shortExamTwo: {type: Number, min: 0, max: 10},
            finalExam: {type: Number, min: 0, max:50}
        },
        HPE: {
            shortExamOne: {type: Number, min: 0, max: 10},
            exerciseOne: {type: Number, min: 0, max: 10},
            midExam: {type: Number, min: 0, max: 20},
            shortExamTwo: {type: Number, min: 0, max: 10},
            finalExam: {type: Number, min: 0, max:50}
        },
        TD: {
            shortExamOne: {type: Number, min: 0, max: 10},
            exerciseOne: {type: Number, min: 0, max: 10},
            midExam: {type: Number, min: 0, max: 20},
            shortExamTwo: {type: Number, min: 0, max: 10},
            finalExam: {type: Number, min: 0, max:50}
        },
        rank: {type: Number, trim: true, required: true}
    },
    attendance: [{
        date: {type: Date, required: true},
        present: {type: Boolean, default: false},
        reason: {type: String}
    }]
}, {
	timestamps: true
});

const Student = model('studentcurrent', StudentSchema);
module.exports = Student;