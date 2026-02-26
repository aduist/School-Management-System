const express = require('express')
const { addEmployee, getEmployee, setSubject, setTeaching, getTeacher, getTeachers, logIn, getOne, editInfo, changePassword } = require('../../controller/configuration/employeeController')
const router = express.Router()

router
    .post('/addEmployee', addEmployee)
    .get('/getEmployee', getEmployee)
    .get('/getOneEmployee/:id', getOne)
    .get('/teachers', getTeachers)
    .patch('/setSubject/:id', setSubject)
    .patch('/setTeaching/:id', setTeaching)
    .get('/getTeacher/:id', getTeacher)
    .post('/logIn', logIn)
    .patch('/editInfo/:id', editInfo)
    .patch('/changePassword/:id', changePassword)

module.exports = router