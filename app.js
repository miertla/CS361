const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/home'))
  .get('/userHomepage', (req, res) => res.render('pages/userHomepage'))
//  .get('/wishList', (req, res) => res.render('pages/wishList'))
  .get('/addToJournal', (req, res) => res.render('pages/addToJournal'))
  .get('/addToWishList', (req, res) => res.render('pages/addToWishList'))
  .get('/createProfile', (req, res) => res.render('pages/createProfile'))
  .get('/editTrip', (req, res) => res.render('pages/editTrip'))
  .get('/search', (req, res) => res.render('pages/search'))
    
.get('/wishList', async (req, res) => {
    try {
      const client = await Client.connect();
      const result = await client.query('SELECT * FROM wish_list');
      const results = { 'results': (result) ? result.rows : null};
        res.render('pages/wishList', { wishListLocations : results });
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })




  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
