const Section = require('../../model/grade/sectionModel')
const Employee = require('../../model/configuration/employeeModel')

module.exports = {
    addSection: async(req, res, next)=>{
        try{
            const doesExist = await Section.findOne({name: req.body.name})
    
            if(doesExist){
                return res.status(400).json({
                    message: 'Class Already Exist'
                })
            }
    
            const sectionSchema = new Section(req.body)
    
            const section = await Section.create(sectionSchema)
    
            if(section){
                res.status(201).json({
                    message: "Section Created Succesfully"
                })
            }
        }catch(error){
            next(error)
        }
    },
    getSections: async(req, res, next)=>{
        const sections = await Section.find().populate({
            path: 'classTeacherId',
            select: {
                _id: 0,
                firstName: 1,
                middleName: 1,
                lastName: 1,
                teacherOf: 1
            }
        })

        if(sections){
            res.status(200).json({
                message: 'Found Succesfully',
                data: sections
            })
        }else{
            res.status(400).json({
                message: 'Something went Wrong'
            })
        }
    },
    setClassTeacher: async(req, res, next)=>{
        try{
            const teacher = await Employee.findById(req.body.teacherId)

            if(teacher.classTeacherOf){
                return res.status(400).json({
                    message: "Teacher has Already been a Class Teacher"
                })
            }

            const theClass = await Section.findById(req.body.sectionId)

            if(theClass.classTeacherId){
                return res.status(400).json({
                    message: "Class has Already been Captured"
                })
            }

            theClass.classTeacherId = req.body.teacherId
            teacher.classTeacherOf = req.body.sectionId

            theClass.save()
            teacher.save()

            res.status(201).json({
                message: "Operation set Succesfully"
            })

        }catch(error){
            next(error)
        }
    },

    getSecName: async(req, res, next)=>{
        try{
            const sections = await Section.find().select({name: 1, _id: 0})

            res.status(200).json({data: sections})
        }catch(error){
            next(error)
        }
    }
}
