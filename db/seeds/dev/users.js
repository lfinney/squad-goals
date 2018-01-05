const goalsData = require('../../../data/dev/goals_data');
const commentsData = require('../../../data/dev/comments_data');
const conversationsData = require('../../../data/dev/conversations_data');
const usersData = require('../../../data/dev/users_data');
const squadData = require('../../../data/dev/squad_data');
const userSquadData = require('../../../data/dev/users_squads_data');
const usersGoalsData = require('../../../data/dev/users_goals_data');

const createUser = (knex, user) => {
  return knex('users').insert(user);
};

const createConversations = (knex, conversation) => {
  return knex('conversations').insert(conversation);
};

const createComments = (knex, comment) => {
  return knex('comments').insert(comment);
};

const createGoals = (knex, goal) => {
  return knex('goals').insert(goal);
};

const createSquads = (knex, squad) => {
  return knex('squads').insert(squad);
};

const createUserSquad = (knex, userSquad) => {
  return knex('users_squads').insert(userSquad);
};

const createUserGoals = (knex, userGoal) => {
  return knex('users_goals').insert(userGoal);
};

exports.seed = (knex, Promise) => {
  return knex('users_goals').del()
    .then(() => knex('users_squads').del())
    .then(() => knex('squads').del())
    .then(() => knex('goals').del())
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
      const goalsPromises = [];

      goalsData.forEach((goal) => {
        goalsPromises.push(createGoals(knex, goal));
      });
      return Promise.all(goalsPromises);
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
      const userGoalsPromises = [];

      usersGoalsData.forEach((userGoal) => {
        userGoalsPromises.push(createUserGoals(knex, userGoal));
      });
      return Promise.all(userGoalsPromises);
    });
};
