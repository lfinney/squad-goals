const challengesData = require('../../../data/challenges_data');
const commentsData = require('../../../data/comments_data');
const conversationsData = require('../../../data/conversations_data');
const usersData = require('../../../data/users_data');


const createUser = (knex, user) => {
  return knex('users').insert(user);
};

const createConversations = (knex, conversation) => {
  return knex('conversations').insert(conversation);
};

exports.seed = (knex, Promise) => {
  return knex('challenges').del()
    .then(() => knex('comments').del())
    .then(() => knex('conversations').del())
    .then(() => knex('users').del())
    .then(() => {
      const userPromises = [];

      usersData.forEach((user) => {
        userPromises.push(createUser(knex, user));
      });
      return Promise.all(userPromises);
    })
    .then(() => {
      const conversationsPromises = [];

      conversationsData.forEach((conversation) => {
        conversationsPromises.push(createConversations(knex, conversation));
      });
      return Promise.all(conversationsPromises);
    });
};
