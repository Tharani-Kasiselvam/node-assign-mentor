const mongoose = require('mongoose')

const studentsSchema = new mongoose.Schema(
    {
        student_id : String,
        student_name : String,
        mentor_id : {
            type : String,
            default : ""
        },
        ex_mentor_id : {
            type : String,
            default : ""
        }
    },
    {
        collection : 'Students',
        versionKey : false
    }
)

module.exports = mongoose.model('Students',studentsSchema,'students')