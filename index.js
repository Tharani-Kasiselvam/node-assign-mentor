const app = require('./app')
const config = require('./utils/config')

const mongoose = require('mongoose')

console.log("Connecting to MongoDB")

mongoose.connect(config.MONGODB_URI)
.then(()=>{
    console.log("CONNECTED to MongoDB")
    app.listen(8001,()=>{
        console.log("Server running on http://localhost:8001")
    })
}).catch(error => {
    console.error('Error connecting to MongoDB')
})