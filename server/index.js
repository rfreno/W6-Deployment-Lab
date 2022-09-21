const express = require('express')
require('dotenv').config()

const path = require('path')

const app = express()

const port = process.env.PORT || 5000

app.use(express.json())

// app.use('/', express.static(path.join(__dirname, '../client/index.html')))

// app.use(express.static(path.join(__dirname, '../client')))

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'))
})

app.get('/css', (req,res) => {
    res.sendFile(path.join(__dirname, '../client/index.css'))
})

app.use('/js', express.static(path.join(__dirname, './index.js')))


app.listen(port, () => {
    console.log('Listening at port ' + port)
})

