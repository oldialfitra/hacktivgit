require('dotenv').config()
const express = require('express'),
    app = express(),
    port = process.env.PORT || 5000,
    cors = require('cors'),
    routerRepository = require('./routes/repository'),
    routerUsers = require('./routes/user')

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())

app.use('/users', routerUsers)
app.use('/users/repos', routerRepository)

app.listen(port, function () {
    console.log('Listening on port:', port)
})