const express = require('express')
require('dotenv').config()

const path = require('path')

const app = express()

const port = process.env.PORT || 5000

app.use(express.json())

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'))
})


app.listen(port, () => {
    console.log('Listening at port ' + port)
})