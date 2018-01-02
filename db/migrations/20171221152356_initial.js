/* eslint-disable */
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('user_name');
      table.string('firebase_id');
      table.integer('points');
      table.timestamps(true, true);
    }),
    knex.schema.createTable('conversations', (table) => {
      table.increments('id').primary();
      table.string('title');
      table.timestamps(true, true);
    }),
    knex.schema.createTable('comments', (table) => {
      table.increments('id').primary();
      table.string('body');
      table.integer('conversation_id').unsigned();
      table.foreign('conversation_id').references('conversations.id');
      table.timestamps(true, true);
    }),
    knex.schema.createTable('challenges', (table) => {
      table.increments('id').primary();
      table.string('title');
      table.string('description');
      table.dateTime('challenge_time');
      table.integer('challenge_points');
      table.integer('creator_id').unsigned();
      table.foreign('creator_id').references('users.id');
      table.integer('conversation_id').unsigned();
      table.foreign('conversation_id').references('conversations.id').onDelete('cascade');
      table.timestamps(true, true);
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('challenges'),
    knex.schema.dropTable('comments'),
    knex.schema.dropTable('conversations'),
    knex.schema.dropTable('users'),
  ])
};
