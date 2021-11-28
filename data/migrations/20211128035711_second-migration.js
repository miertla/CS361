exports.up = (knex) => {
	return knex.schema
	    	// create profiles table
	    	.createTable('profiles', function (table) {
			table.increments('profileId');
			table.string('firstName', 128).notNullable();
			table.string('lastName', 128).notNullable();
			table.string('email', 128).notNullable();
			table.string('username', 128).notNullable();
			table.string('password', 128).notNullable();
		})

		// create previous trips table
		.createTable('trips', function (table){
			table.increments('tripsId');
			table.integer('author').unsigned().notNullable();
			table.string('location', 128).notNullable();
			table.date('startDate').notNullable();
			table.date('endDate').notNullable();
			table.string('travelBuddies', 128).notNullable();
			table.binary('images');

			table.foreign('author').references('profileId').inTable('profiles');
		})

		// create wish list table
		.createTable('wishList', function (table){
			table.increments('wishListId');
			table.integer('author').unsigned().notNullable();
			table.string('location', 128).notNullable();
			table.string('locationInfo');
			table.binary('imageURL');

			table.foreign('author').references('profileId').inTable('profiles');
		});
	};
    
exports.down = (knex) => {
	return knex.schema
		.dropTableIfExists('profiles')
		.dropTableIfExists('trips')
		.dropTableIfExists('wishList');

};

