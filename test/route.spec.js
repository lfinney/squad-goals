const chai = require('chai');
// eslint-disable-next-line no-unused-vars
const should = chai.should();
const chaiHttp = require('chai-http');
// eslint-disable-next-line no-unused-vars
const server = require('../server');

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
// // eslint-disable-next-line
const database = require('knex')(configuration);

chai.use(chaiHttp);

describe('Client Routes', () => {
  it('should return the homepage', () => {
    return chai.request(server)
      .get('/')
      .then((response) => {
        response.should.be.html;
      })
      .catch((err) => {
        throw err;
      });
  });
  it('should return a 404 for a route that does not exist', () => {
    return chai.request(server)
      .get('/sad')
      .then((response) => {
        response.should.have.status(404);
      })
      .catch((err) => {
        throw err;
      });
  });
});

describe('API Routes', () => {
  before((done) => {
    database.migrate.latest()
      .then(() => done())
      .catch((error) => {
        throw error;
      });
  });

  beforeEach((done) => {
    database.seed.run()
      .then(() => done())
      .catch((error) => {
        throw error;
      });
  });

  describe('GET /api/v1/users', () => {
    it('should retrieve all signed-up users', (done) => {
      chai.request(server)
        .get('/api/v1/users')
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(4);
          response.body.includes({ 'id': 4 });
          response.body.includes({ 'user_name': 'Gizmo' });
          response.body.includes({ 'points': '1000' });
          response.body.includes({ 'firebase_id': 'gqye6482kjsj' });
          done();
        });
    });

    it('should return a 404 if path does not exist', (done) => {
      chai.request(server)
        .get('/api/v1/users/100')
        .end((error, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });

  describe('POST /api/v1/users', () => {
    const newUser = {
      id: 5,
      user_name: 'Bruce',
      firebase_id: 'asdf7234nf4',
      points: 1,
    };

    const incompleteUser = {
      id: 6,
      user_name: 'Bruce',
      points: 1,
    };

    it('should add a new user', (done) => {
      chai.request(server)
        .post('/api/v1/users')
        .send(newUser)
        .end((error, response) => {
          response.should.have.status(201);
          response.body[0].should.have.property('id');
          response.body[0].id.should.equal(5);
          chai.request(server)
            .get('/api/v1/users')
            .end((postError, postResponse) => {
              postResponse.body.should.be.a('array');
              postResponse.body.length.should.equal(5);
              postResponse.body.includes(newUser);
              done();
            });
        });
    });

    it('should not be able to add a new user if a property is missing', (done) => {
      chai.request(server)
        .post('/api/v1/users/')
        .send(incompleteUser)
        .end((error, response) => {
          response.should.have.status(422);
          done();
        });
    });
  });

  describe('GET /api/v1/users/:fireId', () => {
    it('should retrieve a specific user', (done) => {
      chai.request(server)
        .get('/api/v1/users/gqye6482kjsj')
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('object');
          response.body.should.have.property('user');
          response.body.user.should.equal(1);
          done();
        });
    });

    it('should return a 404 if path does not exist', (done) => {
      chai.request(server)
        .get('/api/v1/users/5')
        .end((error, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });

  describe('GET /api/v1/dashboard/:uid', () => {
    it('should retrieve a specific user\'s detailed info', (done) => {
      chai.request(server)
        .get('/api/v1/dashboard/1')
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('object');
          response.body.should.have.property('id');
          response.body.id.should.equal(1);
          response.body.should.have.property('user_name');
          response.body.user_name.should.equal('luke');
          response.body.should.have.property('firebase_id');
          response.body.firebase_id.should.equal('gqye6482kjsj');
          response.body.should.have.property('points');
          response.body.points.should.equal(1000);
          response.body.squads.should.be.a('array');
          response.body.squads.includes({
            id: 1,
            squad_name: 'Gizmo',
            conversation_id: 1,
          });
          response.body.goals.should.be.a('array');
          response.body.goals.includes({
            id: 1,
            title: 'chess tourney',
            description: 'to rule them all',
            goal_points: 2300,
            conversation_id: 1,
          });
          done();
        });
    });

    it('should return a 404 if path does not exist', (done) => {
      chai.request(server)
        .get('/api/v1/dashboard/5')
        .end((error, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });

  describe('DELETE /api/v1/users/:id', () => {
    it('should delete a specific users', (done) => {
      chai.request(server)
        .delete('/api/v1/users/1')
        .end((error, response) => {
          response.should.have.status(204);
          response.body.should.be.a('object');
          chai.request(server)
            .get('/api/v1/users/1')
            .end((deleteError, deleteResponse) => {
              deleteResponse.should.have.status(404);
              done();
            });
        });
    });
  });

  describe('GET /api/v1/squads', () => {
    it('should retrieve all signed-up squads', (done) => {
      chai.request(server)
        .get('/api/v1/squads')
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(2);
          response.body.includes({ 'id': 1 });
          response.body.includes({ 'squad_name': 'Gizmo' });
          response.body.includes({ 'conversation_id': 5 });
          done();
        });
    });

    it('should return a 404 if path does not exist', (done) => {
      chai.request(server)
        .get('/api/v1/squads/100')
        .end((error, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });

  describe('POST /api/v1/squads', () => {
    const newSquad = {
      id: 3,
      squad_name: 'Runners Club',
      user_id: '3',
    };

    it('should add a new squad', (done) => {
      chai.request(server)
        .post('/api/v1/squads')
        .send(newSquad)
        .end((error, response) => {
          response.should.have.status(201);
          response.body.includes({ user_id: 3 });
          response.body.includes({ squad_id: 3 });
          chai.request(server)
            .get('/api/v1/squads')
            .end((postError, postResponse) => {
              postResponse.body.should.be.a('array');
              postResponse.body.length.should.equal(3);
              postResponse.body.includes(newSquad);
              done();
            });
        });
    });

    it('should not be able to add a new squad if a property is missing', (done) => {
      chai.request(server)
        .post('/api/v1/squads/')
        .send({})
        .end((error, response) => {
          response.should.have.status(422);
          done();
        });
    });
  });

  describe('GET /api/v1/squads/:squadid', () => {
    it('should retrieve detailed information about a specific squad', (done) => {
      chai.request(server)
        .get('/api/v1/squads/1')
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('object');
          response.body.should.have.property('squad_name');
          response.body.squad_name.should.equal('Gizmo');
          response.body.should.have.property('id');
          response.body.id.should.equal(1);
          response.body.should.have.property('conversation_id');
          response.body.conversation_id.should.equal(5);
          response.body.users.length.should.equal(2);
          response.body.users.includes({ 'id': 1 });
          response.body.users.includes({ 'user_name': 'jm' });
          done();
        });
    });

    it('should return a 404 if path does not exist', (done) => {
      chai.request(server)
        .get('/api/v1/squads/50')
        .end((error, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });

  describe('DELETE /api/v1/squads/:id', () => {
    it('should delete a specific squad', (done) => {
      chai.request(server)
        .delete('/api/v1/squads/1')
        .end((error, response) => {
          response.should.have.status(204);
          response.body.should.be.a('object');
          chai.request(server)
            .get('/api/v1/squads/1')
            .end((deleteError, deleteResponse) => {
              deleteResponse.should.have.status(404);
              done();
            });
        });
    });
  });

  describe('GET /api/v1/goals', () => {
    it('should retrieve all signed-up goals', (done) => {
      chai.request(server)
        .get('/api/v1/goals')
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(4);
          response.body.includes({ 'id': 1 });
          response.body.includes({ 'title': 'pool tourney' });
          response.body.includes({ 'description': 'to pool them all' });
          response.body.includes({ 'goal_points': 2300 });
          response.body.includes({ 'creator_id': 1 });
          response.body.includes({ 'conversation_id': 1 });
          done();
        });
    });

    it('should return a 404 if path does not exist', (done) => {
      chai.request(server)
        .get('/api/v1/goals/100')
        .end((error, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });

  describe('POST /api/v1/goals', () => {
    const newGoal = {
      // id: 5,
      title: 'Run 5 miles',
      description: 'Go for a 5 mile run',
      goal_time: '2018-01-14T17:00:00.000Z',
      goal_points: 1000,
      user_id: 1,
    };

    it('should add a new squad', (done) => {
      chai.request(server)
        .post('/api/v1/goals')
        .send(newGoal)
        .end((error, response) => {
          response.should.have.status(201);
          response.body.includes({ user_id: 1 });
          response.body.includes({ goal_id: 8 });
          chai.request(server)
            .get('/api/v1/goals')
            .end((postError, postResponse) => {
              postResponse.body.should.be.a('array');
              postResponse.body.length.should.equal(5);
              postResponse.body.includes(newGoal);
              done();
            });
        });
    });

    it('should not be able to add a new squad if a property is missing', (done) => {
      chai.request(server)
        .post('/api/v1/goals/')
        .send({})
        .end((error, response) => {
          response.should.have.status(422);
          done();
        });
    });
  });

  describe('GET /api/v1/goals/:goalid', () => {
    it('should retrieve detailed information about a specific squad', (done) => {
      chai.request(server)
        .get('/api/v1/goals/1')
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('object');
          response.body.should.have.property('id');
          response.body.id.should.equal(1);
          response.body.should.have.property('title');
          response.body.title.should.equal('chess tourney');
          response.body.should.have.property('goal_time');
          response.body.goal_time.should.equal('2018-01-12T22:00:00.000Z');
          response.body.should.have.property('creator_id');
          response.body.creator_id.should.equal(1);
          response.body.should.have.property('conversation_id');
          response.body.conversation_id.should.equal(1);
          response.body.users.length.should.equal(2);
          response.body.users.includes({ 'id': 1 });
          response.body.users.includes({ 'user_name': 'jm' });
          response.body.users.includes({ 'points': 10000 });
          response.body.conversation.length.should.equal(2);
          response.body.conversation.includes({ 'id': 1 });
          response.body.conversation.includes({ 'body': 'this is the comments body' });
          done();
        });
    });

    it('should return a 404 if path does not exist', (done) => {
      chai.request(server)
        .get('/api/v1/goals/50')
        .end((error, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });

  describe('DELETE /api/v1/goals/:id', () => {
    it('should delete a specific goal', (done) => {
      chai.request(server)
        .delete('/api/v1/goals/1')
        .end((error, response) => {
          response.should.have.status(204);
          response.body.should.be.a('object');
          chai.request(server)
            .get('/api/v1/goals/1')
            .end((deleteError, deleteResponse) => {
              deleteResponse.should.have.status(404);
              done();
            });
        });
    });
  });

  describe('POST /api/v1/comments', () => {
    const newComment = {
      body: 'Say something funny!',
      conversation_id: '3',
    };

    it('should add a new comment', (done) => {
      chai.request(server)
        .post('/api/v1/comments')
        .send(newComment)
        .end((error, response) => {
          response.should.have.status(201);
          response.body.includes({ id: 8 });
          response.body.includes({ conversation_id: 3 });
          response.body.includes({ body: 'Say something funny!' });
          done();
        });
    });

    it('should not be able to add a new comment if a property is missing', (done) => {
      chai.request(server)
        .post('/api/v1/comments/')
        .send({})
        .end((error, response) => {
          response.should.have.status(422);
          done();
        });
    });
  });

  describe('DELETE /api/v1/comments/:id', () => {
    it('should delete a specific comment', (done) => {
      chai.request(server)
        .delete('/api/v1/comments/1')
        .end((error, response) => {
          response.should.have.status(204);
          response.body.should.be.a('object');
          chai.request(server)
            .get('/api/v1/comments/1')
            .end((deleteError, deleteResponse) => {
              deleteResponse.should.have.status(404);
              done();
            });
        });
    });
  });

  describe('GET /api/v1/users/:userId/goals/:goalId', () => {
    it('should find a user in the users_goals joins table', (done) => {
      chai.request(server)
        .get('/api/v1/users/1/goals/1')
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(1);
          response.body.includes({ 'user_id': 1 });
          response.body.includes({ 'goal_id': 1 });
          done();
        });
    });

    it('should return an empty array if the user relationship doesn\'t exist', (done) => {
      chai.request(server)
        .get('/api/v1/users/100/goals/200')
        .end((error, response) => {
          response.body.should.be.a('array');
          response.body.length.should.equal(0);
          done();
        });
    });
  });

  describe('POST /api/v1/users/:userId/goals/:goalId', () => {
    it('should add a new user-goal pair to the joins table', (done) => {
      chai.request(server)
        .post('/api/v1/users/1/goals/4')
        .end((error, response) => {
          response.should.have.status(204);
          chai.request(server)
            .get('/api/v1/users/1/goals/4')
            .end((getError, getResponse) => {
              getResponse.should.have.status(200);
              getResponse.should.be.json;
              getResponse.body.should.be.a('array');
              getResponse.body.length.should.equal(1);
              getResponse.body.includes({ 'user_id': 1 });
              getResponse.body.includes({ 'goal_id': 4 });
              done();
            });
        });
    });
  });

  describe('GET /api/v1/users/:userId/squads/:squadId', () => {
    it('should find a user in the users_squads joins table', (done) => {
      chai.request(server)
        .get('/api/v1/users/1/squads/1')
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(1);
          response.body.includes({ 'user_id': 1 });
          response.body.includes({ 'squad_id': '1' });
          done();
        });
    });

    it('should return an empty array if the user relationship doesn\'t exist', (done) => {
      chai.request(server)
        .get('/api/v1/users/100/squads/200')
        .end((error, response) => {
          response.body.should.be.a('array');
          response.body.length.should.equal(0);
          done();
        });
    });
  });

  describe.only('POST /api/v1/users/:userId/squads/:squadId', () => {
    it('should add a new user-squad pair to the joins table', (done) => {
      chai.request(server)
        .post('/api/v1/users/1/squads/2')
        .end((error, response) => {
          response.should.have.status(204);
          chai.request(server)
            .get('/api/v1/users/1/squads/2')
            .end((getError, getResponse) => {
              getResponse.should.have.status(200);
              getResponse.should.be.json;
              getResponse.body.should.be.a('array');
              getResponse.body.length.should.equal(1);
              getResponse.body.includes({ 'user_id': 1 });
              getResponse.body.includes({ 'squad_id': 2 });
              done();
            });
        });
    });
  });
});
