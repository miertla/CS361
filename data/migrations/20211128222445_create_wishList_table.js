exports.up = (knex, Promise) => {
	// create wish list table
	return knex.schema.createTable('wishList', function (table){
		table.increments('wishListId');
		table.integer('authorId').unsigned().notNullable();
		table.string('location', 128).notNullable();
		table.text('locationInfo');
		table.binary('imageURL');

		table.foreign('authorId').references('profileId').inTable('profiles');
	});
};
    
exports.down = (knex, Promise) => {
	return knex.schema.dropTableIfExists('wishList');
};
