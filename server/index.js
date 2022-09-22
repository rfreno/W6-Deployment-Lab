const express = require('express')
require('dotenv').config()

const path = require('path')

const app = express()

const port = process.env.PORT || 5000

app.use(express.json())

// include and initialize the rollbar library with your access token
var Rollbar = require("rollbar");
var rollbar = new Rollbar({
  accessToken: '996ba0068cd94fdaa63b51274a1f2c17',
  captureUncaught: true,
  captureUnhandledRejections: true
});

// record a generic message and send it to Rollbar
rollbar.log("Main page has loaded!");

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'))
})

app.get('/css', (req,res) => {
    res.sendFile(path.join(__dirname, '../client/index.css'))
})
app.get('/image', (req,res) => {
    res.sendFile(path.join(__dirname, '../client/header_img.jpg'))
})

app.get('/fake', (req, res) => {
    try {
        rollbar.log('This doesn\'t do anything')
    } catch (err) {
        console.log(err)
        rollbar.error(err)
    }
})

app.use('/js', express.static(path.join(__dirname, './index.js')))

app.listen(port, () => {
    console.log('Listening at port ' + port)
})

