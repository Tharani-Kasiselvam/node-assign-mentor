const students = require('../models/students')

const studentsController = {
    createStudent : async (req,res) => {
        try{
            const {student_id,student_name} = req.body

            const newStudent = new students({
                student_id,
                student_name
            })

            const saveStudent = await newStudent.save()
            res.status(200).json({message:"New Student added SUCCESSFULLY", saveStudent})
        }
        catch(error){
            res.status(500).json({message:"ERROR while uploading Student details"})
        }
    }
}
module.exports = studentsController