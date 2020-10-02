
exports.up = function (knex) {
  return knex.schema.createTable('freelancers', function (table) {
    table.increments('id').primary();
    table.string('username').notNullable().index();
    table.string('email').notNullable().index().unique();
    table.integer('contact_number').notNullable();
    table.string('skillsets');
    table.string('hobby');
    table.timestamp('created_at');
    table.timestamp('deleted_at');
    table.timestamp('updated_at');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('freelancers');
};
