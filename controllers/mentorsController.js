const mentors = require('../models/mentors')

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
    }
}

module.exports = mentorsController