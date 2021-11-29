exports.up = (knex, Promise) => {
	// create previous trips table
	return knex.schema.createTable('trips', function (table){
		table.increments('tripsId');
		table.integer('authorId').unsigned().notNullable();
		table.string('location', 128).notNullable();
		table.date('startDate').notNullable();
		table.date('endDate').notNullable();
		table.string('travelBuddies', 128).notNullable();
		table.binary('images');

		table.foreign('authorId').references('profileId').inTable('profiles');
	});	
};
    
exports.down = (knex, Promise) => {
	return knex.schema.dropTableIfExists('trips')
};
