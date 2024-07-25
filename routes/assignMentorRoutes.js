const express = require('express')
const router = express.Router()

const mentorsController = require('../controllers/mentorsController')
const studentsController = require('../controllers/studentsController')

router.post('/createMentor',mentorsController.createMentor)
router.post('/createStudent',studentsController.createStudent)

module.exports = router