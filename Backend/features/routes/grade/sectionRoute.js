const express = require('express')
const { addSection, getSections, setClassTeacher, getSecName } = require('../../controller/grade/sectionController')
const router = express.Router()

router
    .post('/addSection', addSection)
    .get('/getSections', getSections)
    .patch('/setClassTeacher', setClassTeacher)
    .get('/getSecName', getSecName)


module.exports = router