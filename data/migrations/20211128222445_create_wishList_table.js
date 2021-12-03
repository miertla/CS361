exports.up = (knex, Promise) => {
	// create wish list table
	return knex.schema.createTable('wishlist', function (table){
		table.increments('wishlistid');
		table.integer('authorid').unsigned().notNullable();
		table.string('location', 128).notNullable();
		table.text('locationinfo');
		table.binary('imageurl');

		table.foreign('authorid').references('profileid').inTable('profiles');
	});
};
    
exports.down = (knex, Promise) => {
	return knex.schema.dropTableIfExists('wishlist');
};
