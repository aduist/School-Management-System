const express = require('express');
const { addStudent, getStudent, getOne, uploadImage, signIn, unsettedStu } = require('../../controller/configuration/studentController');
const { profile } = require('../../../helpers/uploadFile');
const router = express.Router();

router.post('/addStudent', addStudent)
router.get('/getStudents', getStudent)
router.get('/getUnsetted', unsettedStu)
router.get('/getOne/:id', getOne)
router.post('/uploadStuImage/:id', profile.single('file'), uploadImage)
router.post('/studentLogIn', signIn)

module.exports = router;