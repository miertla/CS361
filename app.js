require('dotenv').config()

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')

const testRouter = require('./route')
const createProf = require('./route')

const server = express()
const PORT = process.env.PORT || 4000

server.use(cors())
server.use(express.json())
server.use('/test', testRouter)
server.use('/createProfile', createProf)



server.use(express.static(path.join(__dirname, 'public')))
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.set('views', path.join(__dirname, 'views'))
server.set('view engine', 'ejs')
server.get('/', (req, res) => res.render('pages/home'))
server.get('/userHomepage', (req, res) => res.render('pages/userHomepage'))
server.get('/wishList', (req, res) => res.render('pages/wishList'))
server.get('/addToJournal', (req, res) => res.render('pages/addToJournal'))
server.get('/addToWishList', (req, res) => res.render('pages/addToWishList'))
server.get('/createProfile', (req, res) => res.render('pages/createProfile'))
server.get('/editTrip', (req, res) => res.render('pages/editTrip'))
server.get('/search', (req, res) => res.render('pages/search'))


server.get('/', (req, res) => {
  res.send('<h1>This is a test application</h1>')
})

server.listen(PORT, () => {
    console.log(`Listening on ${ PORT }`)
  })
