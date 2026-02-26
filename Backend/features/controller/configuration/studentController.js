const createError = require('http-errors');
const Student = require('../../model/configuration/studentModel');
const { AccessToken } = require('../../../helpers/jwtHelper');
// const validateInput = require('../../../helpers/validationHelper')

module.exports = {
	addStudent: async (req, res, next) => {
		try{
            let data = new Date()
            let mili = data.getMilliseconds()
            req.body.idNumber = req.body.firstName[0].toLowerCase() + req.body.middleName[0].toLowerCase() + req.body.lastName[0].toLowerCase()+ mili + "@kshs"
            const studentSchema = new Student(req.body)

            const student = await Student.create(studentSchema)
            if(student){
                return res.status(201).json({
                    message: "Student Registered Succesfully",
                    student
                })
            }
        }catch(error){
            next(error)
        }
	},

    getStudent: async (req, res, next)=>{
        const students = await Student.find()

        if(students){
            res.status(200).json({
                message: "Students Found Succesfully",
                data: students
            })
        }else{
            return createError.NotFound('Students are not found')
        }
    },

    getOne: async(req, res, next)=>{
        const student = await Student.findById(req.params.id)

        if(student){
            res.status(200).json({
                message: "Student is Found",
                data: student
            })
        }else{
            res.status(400).json({
                message: "Soryy, Student is not found"
            })
        }
    },

    unsettedStu: async(req, res)=>{
        const students = await Student.find({currentId: { $exists: false}})

        if(students){
            return res.status(201).json({
                message: "Students Found",
                data: students
            })
        }else{
            return res.status(400).json({
                message: "Sorry, No Students without Class Setted"
            })
        }
    },

    uploadImage: async(req, res)=>{
        if(!req.file){
            return res.status(400).json({
                message: "File Not found. Try Again."
            })
        }
        await Student.findByIdAndUpdate(req.params.id, {
            profileImage: req.file.filename
        })
        .then(()=>{
            res.status(201).json({
                message: "Profile Image set Succesfully."
            })
        })
    },

    updateStudent: async(req, res, next)=>{
        const isValid = ''

        if(isValid){
            
        }
    },

	signIn: async (req, res) => {
		const user = await Student.findOne({idNumber: req.body.idNumber})

        if(!user){
            return res.status(400).json({
                message: "ID-Number is Incorrect"
            })
        }

        const token = await AccessToken(user)

        return res.status(200).json({
            message: "LogIn Succesfull",
            accesstoken: token
        })
	}
}
