const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const blogRoute = require('./route/blog')
const authRoute = require('./route/auth')


const app = express()

//connect DB

mongoose.connect(process.env.database,{
    useNewUrlParser:true,
    useUnifiedTopology:false
}).then(()=>console.log('Connect DB succes'))
.catch((err)=>console.log('cannot conect DB'))


//middleware
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))
app.use('/api',blogRoute)
app.use('/api',authRoute)



const port = process.env.PORT || 8080

app.listen(port,()=>
console.log(`Start server in Port ${port}`)
)