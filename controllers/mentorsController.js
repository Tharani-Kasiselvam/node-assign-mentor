const mentors = require('../models/mentors')
const students = require('../models/students')

const mentorsController = {
    createMentor : async (req,res) => {
        try{
            const {mentor_id, mentor_name} = req.body

            const newMentor = new mentors({
                mentor_id,
                mentor_name,
            })

                const saveMentor = await newMentor.save()

                res.status(200).json({message:"New Mentor details uploaded SUCCESSFULLY", saveMentor})
        }catch(error){
            res.status(500).json({message:"ERROR while uploading Mentor details"})

        }
    },

    updateStudentForMentor : async (req,res) => {
        try{
            const {mentor_id,students_list} = req.body
            const mentors_data = await mentors.findOne({"mentor_id":mentor_id})

            const non_mentor_students = []

            for(let i=0;i<students_list.length;i++){
                let student_id = students_list[i]
                console.log("Student:",student_id)
                const students_data_filter = await students.findOne({"student_id":student_id})
                if(students_data_filter.mentor_id==""){
                    console.log("inside if")
                    non_mentor_students.push(student_id)
                }
            }
            console.log("latest:",non_mentor_students)

            mentors_data.stud_list = non_mentor_students

            await mentors_data.save()
            .then(() => {
                res.json({message: "Saved STUDENTS LIST with MENTOR Successfully"})

                non_mentor_students.map(async stud => {
                    console.log("Saving mentor for new students:",stud)
                    const students_data_update_mentor = await students.findOne({"student_id":stud})
                    students_data_update_mentor.mentor_id = mentor_id
                    students_data_update_mentor.save()
                })
            })

 

        }catch(error){
            res.status(500).json({message:"ERROR while adding Student details with Mentor"})
        }
    }
}

module.exports = mentorsController