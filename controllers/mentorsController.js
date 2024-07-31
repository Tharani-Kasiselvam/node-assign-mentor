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

                res.status(200).json({message:"New Mentor added SUCCESSFULLY", saveMentor})
        }catch(error){
            res.status(500).json({message:"ERROR while uploading Mentor details"})

        }
    },

    updateStudentForMentor : async (req,res) => {
        try{
            const {mentor_id,students_list} = req.body
            console.log("stud_lst:",students_list)
            const mentors_data = await mentors.findOne({"mentor_id":mentor_id})

            const non_mentor_students = []

            if(mentors_data!=null){
            for(let i=0;i<students_list.length;i++){
                let student_id = students_list[i]
                const students_data_filter = await students.findOne({"student_id":student_id})
                if(students_data_filter.mentor_id==""){
                    non_mentor_students.push(student_id)
                }
            }
            mentors_data.stud_list = non_mentor_students

            await mentors_data.save()
            .then(() => {
                res.json({message: "Saved STUDENTS LIST with MENTOR Successfully"})

                non_mentor_students.map(async stud => {
                    const students_data_update_mentor = await students.findOne({"student_id":stud})
                    students_data_update_mentor.mentor_id = mentor_id
                    students_data_update_mentor.save()
                })
            })
            }

            else{
                res.json({message: "Enter valid Mentor Id"})
            }
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
        res.status(500).json({message:"ERROR while adding Mentor details with Student, kindly verify the Student Id"})
    }
    },
    
    showStudentsForMentor : async (req,res) => {
        try{
            // const {mentor_id} = req.body

            const mentor_id = req.params.id

            const mentors_data = await mentors.findOne({"mentor_id":mentor_id})

            const stud_list = mentors_data.stud_list
            const mentor_name = mentors_data.mentor_name
            const students_name = []

            await Promise.all(stud_list.map(async student => {
                const students_data = await students.findOne({"student_id":student})
                students_name.push(students_data.student_name)
            }))
            if(students_name.length>0)
                await res.json({message:"List of Students tagged for ",mentor_id,mentor_name,students_name})

            else
                await res.json({message:"No students tagged for the Mentor",mentor_id, mentor_name})

        }catch(error){
            res.status(500).json({message:"ERROR while loading Students information, kindly verify the Mentor Id"})
        }
    },

    showExistingMentor : async (req,res) => {
        try{
            // const {student_id} = req.body
            const student_id = req.params.id
            console.log("Student ID param: ",student_id)
            const student_data = await students.findOne({"student_id":student_id})
            const student_name = student_data.student_name
            const ex_mentor_id = student_data.ex_mentor_id

            if(ex_mentor_id!=""){
                const mentor_data = await mentors.findOne({"mentor_id":ex_mentor_id})
                const ex_mentor_name = mentor_data.mentor_name
                res.json({message:"The previous Mentor tagged for :",student_id,student_name,ex_mentor_id,ex_mentor_name})
            }
            else
                res.json({message:"No Previous Mentor Tagged for the student:",student_id,student_name})
        }catch(error){
            res.status(500).json({message:"ERROR while loading Mentor information, kindly verify the Student Id"})
        }
    }
}

module.exports = mentorsController