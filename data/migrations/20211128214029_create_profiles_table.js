exports.up = (knex, Promise) => {
	// create profiles table
	return knex.schema.createTable('profiles', function (table) {
		table.increments('profileid').primary();
		table.string('firstname', 128).notNullable();
		table.string('lastname', 128).notNullable();
		table.string('email', 128).unique().notNullable() ;
		table.string('username', 128).unique().notNullable();
		table.string('password', 200).notNullable();
	});
};
    
exports.down = (knex, Promise) => {
	return knex.schema.dropTableIfExists('profiles');
};