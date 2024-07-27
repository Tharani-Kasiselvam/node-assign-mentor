const mongoose = require('mongoose')

const mentorsSchema = new mongoose.Schema(
    {
    mentor_id : String,
    mentor_name : String,
    stud_list : {
        type : Array,
        default : []
        }    
    },
    {
    collection:'Mentors',
    versionKey: false
    }
)

module.exports = mongoose.model('Mentors',mentorsSchema,'mentors')