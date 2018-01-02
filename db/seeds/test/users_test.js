const challengesData = require('../../../data/challenges_data_test');
const commentsData = require('../../../data/comments_data_test');
const conversationsData = require('../../../data/conversations_data_test');
const usersData = require('../../../data/users_data_test');
const squadData = require('../../../data/squad_data_test');
const userSquadData = require('../../../data/users_squads_data_test');
const usersChallengesData = require('../../../data/users_challenges_data_test');

const createUser = (knex, user) => {
  return knex('users').insert(user);
};

const createConversations = (knex, conversation) => {
  return knex('conversations').insert(conversation);
};

const createComments = (knex, comment) => {
  return knex('comments').insert(comment);
};

const createChallenges = (knex, challenge) => {
  return knex('challenges').insert(challenge);
};

const createSquads = (knex, squad) => {
  return knex('squads').insert(squad);
};

const createUserSquad = (knex, userSquad) => {
  return knex('users_squads').insert(userSquad);
};

const createUserChallenges = (knex, userChallenge) => {
  return knex('users_challenges').insert(userChallenge);
};

exports.seed = (knex, Promise) => {
  return knex('users_challenges').del()
    .then(() => knex('users_squads').del())
    .then(() => knex('squads').del())
    .then(() => knex('challenges').del())
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
    })
    .then(() => {
      const commentPromises = [];

      commentsData.forEach((comment) => {
        commentPromises.push(createComments(knex, comment));
      });
      return Promise.all(commentPromises);
    })
    .then(() => {
      const challengesPromises = [];

      challengesData.forEach((challenge) => {
        challengesPromises.push(createChallenges(knex, challenge));
      });
      return Promise.all(challengesPromises);
    })
    .then(() => {
      const squadPromises = [];

      squadData.forEach((squad) => {
        squadPromises.push(createSquads(knex, squad));
      });
      return Promise.all(squadPromises);
    })
    .then(() => {
      const userSquadPromises = [];

      userSquadData.forEach((userSquad) => {
        userSquadPromises.push(createUserSquad(knex, userSquad));
      });
      return Promise.all(userSquadPromises);
    })
    .then(() => {
      const userChallengesPromises = [];

      usersChallengesData.forEach((userChallenge) => {
        userChallengesPromises.push(createUserChallenges(knex, userChallenge));
      });
      return Promise.all(userChallengesPromises);
    });
};
