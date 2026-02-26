const { AccessToken } = require('../../../helpers/jwtHelper')
const Employee = require('../../model/configuration/employeeModel')


module.exports = {
    addEmployee: async(req, res, next)=>{
        try{
            const pnumExist = await Employee.findOne({phoneNumber: req.body.phoneNumber})
            const emailExist = await Employee.findOne({email: req.body.email})

            if(pnumExist){
                return res.status(400).json({
                    message: "Phone Number Already Exists"
                })
            }

            if(emailExist){
                return res.status(400).json({
                    message: "Email Already Exists"
                })
            }

            let data = new Date()
            let mili = data.getMilliseconds()
            req.body.username = req.body.firstName[0].toLowerCase() + req.body.middleName[0].toLowerCase() + req.body.lastName[0].toLowerCase()+ mili + "@kshs"
            req.body.password = req.body.username + "123456"
            const employeeSchema = new Employee(req.body)

            const employee = await Employee.create(employeeSchema)

            if(employee){
                res.status(201).json({
                    message: "Employee Registred Succesfully",
                    employee
                })
            }
        }catch(error){
            next(error)
        }
    },
    getEmployee: async(req, res, next)=>{
        try{
            const employee = await Employee.find()

            if(employee){
                res.status(200).json({
                    message: "Employee are found",
                    data: employee
                })
            }
        }catch(error){
            next(error)
        }
    },

    getOne: async(req, res, next)=>{
        try{
            const employee = await Employee.findById(req.params.id).populate('classTeacherOf')

            return res.status(200).json({
                message: "User is Found",
                data: employee
            })
            
        }catch(error){
            next(error)
        }
    },

    getTeachers: async(req, res, next)=>{
        try{
            const teacher = await Employee.find({role: 'Teacher'}).select({password: 0, username: 0})

            if(teacher){
                res.status(200).json({
                    message: "We finally found them",
                    data: teacher
                })
            }
        }catch(error){
            next(error)
        }
    },

    getTeacher: async(req, res, next)=>{
        try{
            const teacher = await Employee.findById(req.params.id).select({
                firstName: 1,
                middleName: 1,
                lastName: 1,
                teacherOf: 1,
                teachsNow: 1
            })

            res.status(200).json({
                message: "Teacher Found",
                data: teacher
            })
        }catch(error){
            next(error)
        }
        
    },

    setSubject: async(req, res, next)=>{
        try{
            const teacher = await Employee.findById(req.params.id)

            req.body.forEach(element => {
                teacher.teacherOf.push(element.text)
            });

            teacher.save()

            res.status(201).json({
                message: "Operation Set Succesfully"
            })
        }catch(error){
            next(error)
        }
    },

    setTeaching: async(req, res, next)=>{
        try{
            const teacher = await Employee.findById(req.params.id)

            req.body.forEach(element => {
                teacher.teachsNow.push({
                    subject: element.subject,
                    class: element.class
                })
            });

            teacher.save()

            res.status(201).json({
                message: "Operation Set Succesfully"
            })

        }catch(error){
            next(error)
        }
    },

    logIn : async(req, res)=>{
        const user = await Employee.findOne({username: req.body.username})

        if(!user){
            return res.status(400).json({
                message: "Username is Not FOUND!!!"
            })
        }

        const checkPassword = await user.isValidPassword(req.body.password)

        if(!checkPassword){
            return res.status(401).json({
                message: "Incorrect Password"
            })
        }

        const accessToken = await AccessToken(user);

        return res.status(200).json({
            message: 'LogIn Successfully',
            accesstoken: accessToken,
        })
    },

    editInfo : async(req, res)=>{
        const existUser = await Employee.findOne({username: req.body.username})

        if(existUser){
            return res.status(400).json({
                message: "Username is Already Taken. Try another One"
            })
        }

        const user = await Employee.findById(req.params.id)

        user.username = req.body.username
        user.password = req.body.password
        user.secured = true

        user.save()
        .then(()=>{
            return res.status(201).json({
                message: "Account Secured"
            })
        })
    },

    changePassword: async(req, res)=>{
        const user = await Employee.findById(req.params.id)

        const checkPassword = await user.isValidPassword(req.body.currentPassword)

        if(!checkPassword){
            return res.status(401).json({
                message: "The Current Password is Incorrect"
            })
        }

        user.password = req.body.newPassword
        user.save()
        .then(()=>{
            return res.status(201).json({
                message: "Password Changed Succesfully"
            })
        })
    }
}