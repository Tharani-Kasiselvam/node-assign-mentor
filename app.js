const morgan = require('morgan')
const express = require('express')
const app = express()

const assignMentorRoutes = require('./routes/assignMentorRoutes')

//middleware to parse the request body
app.use(express.json())

//middleware to log the request
app.use(morgan('dev'))

//define endpoints
app.use('/', assignMentorRoutes)

app.get('/',(req,res)=>{
    res.send("Mentor-Students DB System")
 })

module.exports = app