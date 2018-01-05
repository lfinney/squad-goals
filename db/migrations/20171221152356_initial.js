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
    knex.schema.createTable('goals', (table) => {
      table.increments('id').primary();
      table.string('title');
      table.string('description');
      table.dateTime('goal_time');
      table.integer('goal_points');
      table.integer('creator_id').unsigned();
      table.foreign('creator_id').references('users.id').onDelete('CASCADE');
      table.integer('conversation_id').unsigned();
      table.foreign('conversation_id').references('conversations.id').onDelete('CASCADE');
      table.timestamps(true, true);
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('goals'),
    knex.schema.dropTable('comments'),
    knex.schema.dropTable('conversations'),
    knex.schema.dropTable('users'),
  ])
};
