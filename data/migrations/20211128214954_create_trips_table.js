exports.up = (knex, Promise) => {
	// create previous trips table
	return knex.schema.createTable('trips', function (table){
		table.increments('tripsid');
		table.integer('authorid').unsigned().notNullable();
		table.string('location', 128).notNullable();
		table.date('startdate').notNullable();
		table.date('enddate').notNullable();
		table.string('travelbuddies', 128).notNullable();
		table.binary('images');

		table.foreign('authorid').references('profileid').inTable('profiles');
	});	
};
    
exports.down = (knex, Promise) => {
	return knex.schema.dropTableIfExists('trips')
};
