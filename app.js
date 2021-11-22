require('dotenv').config()

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')

const server = express()
const PORT = process.env.PORT || 4000

server.use(cors())
server.use(express.json())

const { Pool } = require('pg');

var prodClient = new Pool({
  // production connection string:
  connectionString: process.env.DATABASE_URL
});
db = prodClient;

db.connect();


/*
client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});
*/

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/home'))
  .get('/userHomepage', (req, res) => res.render('pages/userHomepage'))
  .get('/wishList', (req, res) => res.render('pages/wishList'))
  .get('/addToJournal', (req, res) => res.render('pages/addToJournal'))
  .get('/addToWishList', (req, res) => res.render('pages/addToWishList'))
  .get('/createProfile', (req, res) => res.render('pages/createProfile'))
  .get('/editTrip', (req, res) => res.render('pages/editTrip'))
  .get('/search', (req, res) => res.render('pages/search'))
 /*
  .get('/wishList', async (req, res) => {
    try {
      const result = await db.query('SELECT location, text_description FROM wish_list;');
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/wishList', results );
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
*/

  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
