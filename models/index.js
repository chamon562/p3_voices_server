require('dotenv').config()
const mongoose = require('mongoose')
// Mongo connections 
mongoose.connect(process.env.ATLAS_URI|| process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
})
// make Mongoose connection project
const db = mongoose.connection
// set up an event listener to fire once when the conection 'opens'
// console.log what host and port its running on 
db.once('open', () =>{
    console.log(`Connected to MongoDB at ${db.host}:${db.port}`)
})
db.on('error', (error) =>{
    console.log(`Database error\n${error}`)
})
// export the user here
// this is th mongo set up 
module.exports.User = require('./User')
module.exports.Post = require('./Post')
// module.exports.Comments = require('./Comments')