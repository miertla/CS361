const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const PORT = process.env.PORT || 5000



const { Pool } = require('pg')
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:<jyqNe9-josfaw-vyhkup>@localhost:5000/<postgresql-trapezoidal-77382>',
  ssl: process.env.DATABASE_URL ? true : false
});

const { Client } = require('pg')
const client = new Client({
  connectionString: process.env.DATABASE_URL,
 
});

client.connect();




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
//  .get('/wishList', (req, res) => res.send(getData()))
  .get('/addToJournal', (req, res) => res.render('pages/addToJournal'))
  .get('/addToWishList', (req, res) => res.render('pages/addToWishList'))
  .get('/createProfile', (req, res) => res.render('pages/createProfile'))
  .get('/editTrip', (req, res) => res.render('pages/editTrip'))
  .get('/search', (req, res) => res.render('pages/search'))
  .get('/wishList', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT location, text_description FROM wish_list');
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/wishList', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))





/*
getData = () => {
// function to display all locations in wish_list table
  pool.query('SELECT location, text_description FROM wish_list;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  pool.end();
  res.send('pages/wishList', { wish_list: res.rows });
});
}
*/
