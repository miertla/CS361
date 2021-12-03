const LocalStrategy = require('passport-local').Strategy;
const { pool } = require('./data/db-config');
const bcrpyt = require('bcrypt');

function initialize(passport){
	const authenticateUser = (username, password, done) => {
		pool.query(
			`SELECT * FROM profiles where username = $1`, 
			[username], 
			(err, results) => {
				if (err){
					throw error;
					}

					console.log(results.rows);

				if (results.rows.length > 0) {
				  const user = results.rows[0];
				  bcrpyt.compare(password, user.password, (err, isMatch) => {
					  if(err){
					  	throw err;
					  }
					  if (isMatch){
						  return done(null, user);
					  }else {
						  return done(null, false, { message: "Password is incorrect"});
					  }
				  });

				} else {
					return done(null, false, { message: "Username is not registered" });
					} 
			}		
		);
	};


	passport.use(
		new LocalStrategy(
			{ usernameField: 'username', passwordField: 'password'},
			authenticateUser 
		)
	);

	passport.serializeUser((user, done) => done(null, user.profileid));

	passport.deserializeUser((profileid, done) => {
		pool.query(
			`SELECT * FROM profiles WHERE profileid = $1`, [profileid], (err, results) => {
				if (err) {
					return done(err);
				}
				return done(null, results.rows[0]);
			}
		);	
	});

}

module.exports = initialize;