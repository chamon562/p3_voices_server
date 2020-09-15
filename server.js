require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 8000;
const passport = require('passport')
const morgan = require('morgan')
const users = require('./routes/api/users')
const posts = require('./routes/api/posts')
const comments = require('./routes/api/comments')
//middleware
app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())
//passpoert middleware
app.use(passport.initialize())
//importing passport file into server
require('./config/passport')(passport)
app.use(morgan('tiny'))
app.get('/', (req, res)=> {
    res.status(200).json({message: 'Smile, you are being watch by the Backend team'})
})
app.use('/api/users', users)
app.use('/api/posts', posts)
app.use('/api/comments', comments)

app.listen(process.env.PORT || 8000, ()=>{
    console.log(`☕️ You're listening to the smooth sounds of port
     ${process.env.PORT ||8000} 🦾🤖, clean servers go brrr`)
})