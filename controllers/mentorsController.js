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
                res.json({message: "Saved STUDENTS LIST with MENTOR Successfully",non_mentor_students})

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
    },

    updateMentorForStudent : async (req,res) => {
        try{
        const {student_id,mentor_id} = req.body

        const student_data = await students.findOne({"student_id":student_id})
        
        if(student_data.mentor_id==""){
            student_data.mentor_id = mentor_id
        }
        else{
            student_data.ex_mentor_id = student_data.mentor_id
            student_data.mentor_id = mentor_id
        }
        student_data.save()
        res.json({message: "Updated MENTOR for the STUDENT Successfully"})

    }catch(error){
        res.status(500).json({message:"ERROR while adding Mentor details with Student"})
    }
    },
    
    showStudentsForMentor : async (req,res) => {
        try{
            const {mentor_id} = req.body

            const mentors_data = await mentors.findOne({"mentor_id":mentor_id})

            const stud_list = mentors_data.stud_list
            const mentor_name = mentors_data.mentor_name
            const students_name = []

            await Promise.all(stud_list.map(async student => {
                console.log(student)
                const students_data = await students.findOne({"student_id":student})
                console.log("Stud collctn:",students_data.student_name)
                students_name.push(students_data.student_name)
                console.log(students_name)
            }))
            console.log("outside map:",students_name)
            if(students_name.length>0)
                await res.json({message:"Here is the list of Students tagged for the Mentor",mentor_id,mentor_name,students_name})

            else
                await res.json({message:"No students tagged for the Mentor",mentor_id, mentor_name})

        }catch(error){
            res.status(500).json({message:"ERROR while loading Students information"})
        }
    }
}

module.exports = mentorsController