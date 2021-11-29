exports.up = (knex, Promise) => {
	// create profiles table
	return knex.schema.createTable('profiles', function (table) {
		table.increments('profileId');
		table.string('firstName', 128).notNullable();
		table.string('lastName', 128).notNullable();
		table.string('email', 128).notNullable();
		table.string('username', 128).notNullable();
		table.string('password', 128).notNullable();
	});
};
    
exports.down = (knex, Promise) => {
	return knex.schema.dropTableIfExists('profiles');
};