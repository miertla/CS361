require('dotenv').config();
const express = require('express');
const { pool } = require('./data/db-config');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const bcrpyt = require('bcrypt');
const session = require('express-session');
const flash = require('express-flash');
const { appendFile } = require('fs');
const passport = require('passport');
const server = express();

const PORT = process.env.PORT || 4000

const initalizePassport = require('./passport-config');

initalizePassport(passport);

server.use(cors())
server.use(express.json())
server.use(
  session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
  })
);

server.use(passport.initialize());
server.use(passport.session());
server.use(flash());
server.use(express.static(path.join(__dirname, 'public')));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'ejs');
server.get('/', (req, res) => res.render('pages/home'));
server.get('/users/login', checkAuthenticated, (req, res) => res.render('pages/login'));
server.get('/users/createProfile', checkAuthenticated, (req, res) => res.render('pages/createProfile'));
server.get('/users/userHomepage', checkNotAuthenticated, (req, res) => {
  res.render('pages/userHomepage', { username: req.user.username })});
server.get('/users/wishList', checkNotAuthenticated, (req, res) => res.render('pages/wishList'));
server.get('/users/addToJournal',  checkNotAuthenticated, (req, res) => res.render('pages/addToJournal'));
server.get('/users/addToWishList',  checkNotAuthenticated, (req, res) => res.render('pages/addToWishList'));
server.get('/users/editTrip', checkNotAuthenticated, (req, res) => res.render('pages/editTrip'));
server.get('/users/search',  checkNotAuthenticated, (req, res) => res.render('pages/search'));
server.get("/users/logout", (req, res) => {
  req.logout();
  res.render('pages/home', { message: "You have successfully logged out" });});
server.post('/users/createProfile', async (req, res) => {
  let { firstname, lastname, email, username, password, password2 } = req.body; 
  console.log({
    firstname, lastname, email, username, password, password2
    });

  let errors = [];

  // make sure all sections of the form are completed 
  if (!firstname || !lastname || !email || !username || !password || !password2){
    errors.push({ message: "Please enter all fields" });
  }

  // make sure passwords match
  if (password != password2){
    errors.push({ message: "Passwords do not match" });
  }

   // make sure password is 8 or more characters
   if (password.length < 8 ){
     errors.push({ message: "Password length is less than 8 characters"});
   } 
  
  if (errors.length > 0) {
    res.render('pages/createProfile', { errors });
  }
  else {
    // form validation has passed 
    let hashedPassword = await bcrpyt.hash(password, 10);
    console.log(hashedPassword);

    pool.query(
      `SELECT * FROM profiles 
      WHERE username = $1 AND email = $2`, 
      [username, email], 
      (err, results) => {
        if (err) {
         throw err;
        }
         console.log(results.rows);

        if (results.rows.length > 0) {
          errors.push({ message: "Username or email already in use"});
          res.render('pages/createProfile', { errors });
        } else {
            pool.query(
              `INSERT INTO profiles (firstname, lastname, email, username, password)
              VALUES ($1, $2, $3, $4, $5)
              RETURNING profileid, password`,
              [firstname, lastname, email, username, hashedPassword],
              (err, results) => {
                if (err){
                  throw err;
                }
                console.log(results.rows);
                req.flash('success_msg', "You are now registered. Please log in.");
                res.redirect('/users/login');
              }
          );
        }
      }
    );
  }
});


server.post('/users/login', passport.authenticate('local', {
  successRedirect: '/users/userHomepage',
  failureRedirect: '/users/login',
  failureFlash: true
  })
);

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/userHomepage");
  }
  next();
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/users/login");
}


server.listen(PORT, () => {
    console.log(`Listening on ${ PORT }`)
  })
