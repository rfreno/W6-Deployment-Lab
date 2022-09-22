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
rollbar.info("Main page has loaded!");

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
        console.log('This doesn\'t do anything')
        rollbar.warning('This doesn\'t do anything')
    } catch (err) {
        console.log(err)
        rollbar.error(err)
    }
})


const students = ['PowerWashing', 'Indoor Window Cleaning', 'High Shine']

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'))
})

app.get('/api/students', (req, res) => {
    res.status(200).send(students)
})

app.post('/api/students', (req, res) => {
   let {name} = req.body

   const index = students.findIndex(student => {
       return student === name
   })

   try {
       if (index === -1 && name !== '') {
           students.push(name)
           rollbar.log('student was added successfully')
           res.status(200).send(students)
       } else if (name === ''){
            rollbar.critical('submission was empty')
           res.status(400).send('You must enter a name.')
       } else {
            rollbar.error('student name already exists')
           res.status(400).send('That student already exists.')
       }
   } catch (err) {
       console.log(err)
   }
})

app.delete('/api/students/:index', (req, res) => {
    const targetIndex = +req.params.index
    
    students.splice(targetIndex, 1)
    rollbar.info('Student was deleted')
    res.status(200).send(students)
})




app.use('/js', express.static(path.join(__dirname, './index.js')))

app.listen(port, () => {
    console.log('Listening at port ' + port)
})

