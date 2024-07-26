const express = require('express')
const router = express.Router()

const mentorsController = require('../controllers/mentorsController')
const studentsController = require('../controllers/studentsController')

router.post('/createMentor',mentorsController.createMentor)
router.post('/createStudent',studentsController.createStudent)

router.put('/updateStudentForMentor',mentorsController.updateStudentForMentor)

module.exports = router