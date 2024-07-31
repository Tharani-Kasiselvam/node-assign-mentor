const express = require('express')
const router = express.Router()

const mentorsController = require('../controllers/mentorsController')
const studentsController = require('../controllers/studentsController')

router.get('/showStudentsForMentor/:id',mentorsController.showStudentsForMentor)
router.get('/showExistingMentor/:id',mentorsController.showExistingMentor)

router.post('/createMentor',mentorsController.createMentor)
router.post('/createStudent',studentsController.createStudent)

router.put('/updateStudentForMentor',mentorsController.updateStudentForMentor)
router.put('/updateMentorForStudent',mentorsController.updateMentorForStudent)

module.exports = router