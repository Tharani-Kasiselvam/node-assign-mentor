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
            // const { id } = request.params;
            const {mentor_id,students_list} = req.body
            const mentor_info = await mentors.findOne({"mentor_id":mentor_id})
            mentor_info.stud_list = students_list

            const updateStudentsList = await mentor_info.save()

            res.json({message: mentor_info.stud_list})
        }catch(error){
            res.status(500).json({message:"ERROR while adding Student details with Mentor"})
        }
    }
}

module.exports = mentorsController