const express = require('express');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

const app = express();
const bodyParser = require('body-parser');


const requireHTTPS = (request, response, next) => {
  if (request.header('x-forwarded-proto') !== 'https') {
    return response.redirect(`https://${request.header('host')}${request.url}`);
  }
  next();
};
if (process.env.NODE_ENV === 'production') { app.use(requireHTTPS); }

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 4000);
app.locals.title = 'Squad Goals';
app.use(express.static('./build'));

app.get('/api/v1/users', (request, response) => {
  database('users').select()
    .then(items => response.status(200).json(items))
    .catch(error => response.status(500).json({ error: `internal server error ${error}` }));
});

app.post('/api/v1/users/', (request, response) => {
  const newUser = request.body;
  for (const requiredParameter of ['user_name', 'firebase_id', 'points']) {
    if (!newUser[requiredParameter]) {
      return response.status(422).json({
        error: `you are missing the ${requiredParameter} property`,
      });
    }
  }

  database('users').insert(newUser, '*')
    .then(insertedUser => response.status(201).json(insertedUser))
    .catch(error => response.status(500).json({ error }));
});

app.get('/api/v1/users/:id', (request, response) => {
  const { id } = request.params;

  database('users').where('id', id).select()
    .then((user) => {
      user.length ? response.status(200).json(user)
        :
        response.status(404).json({ error: `Could not find user with id: ${id}` });
    })
    .catch(error => response.status(500).json({ error: `Internal server error ${error}` }));
});

app.patch('/api/v1/users/:id', (request, response) => {
  const { id } = request.params;
  const updateUsername = request.body;

  if (!updateUsername.user_name) {
    return response.status(422).json({
      error: 'You must send only an object literal with the key user_name',
    });
  }

  database('users').where('id', id)
    .update(updateUsername, '*')
    .then((update) => {
      update ?
        response.sendStatus(204)
        :
        response.sendStatus(404);
    })
    .catch(error => response.status(500).json({ error }));
});

app.delete('/api/v1/users/:id', (request, response) => {
  const { id } = request.params;

  database('users').where('id', id).del()
    .then((result) => {
      result ?
        response.sendStatus(204)
        :
        response.status(404).json({ error: `No user with id ${id}` });
    })
    .catch(error => response.status(422).json(error));
});

app.get('/api/v1/squads', (request, response) => {
  database('squads').select()
    .then(items => response.status(200).json(items))
    .catch(error => response.status(500).json({ error: `internal server error ${error}` }));
});

app.post('/api/v1/squads', (request, response) => {
  let newSquad = request.body;

  if (!newSquad.squad_name) {
    return response.status(422).json({
      error: 'you are missing the squad_name property',
    });
  }

  const convoTitle = { title: `${newSquad.title} Conversation` };

  database('conversations').insert(convoTitle, 'id')
    .then((convoId) => {
      newSquad = Object.assign({}, newSquad, {
        conversation_id: convoId[0],
      });
      database('squads').insert(newSquad, '*')
        .then(insertedSquad => response.status(201).json(insertedSquad))
        .catch(error => response.status(500).json({ error }));
    })
    .catch(error => response.status(500).json({ error: `Error creating new conversation: ${error}` }));
});

app.get('/api/v1/squads/:id', (request, response) => {
  const { id } = request.params;

  database('squads').where('id', id).select()
    .then((squad) => {
      squad.length ?
        response.status(200).json(squad)
        :
        response.status(404).json({ error: `Could not find squad with id: ${id}` });
    })
    .catch(error => response.status(500).json({ error: `Internal server error ${error}` }));
});

app.patch('/api/v1/squads/:id', (request, response) => {
  const { id } = request.params;
  const updateSquadname = request.body;

  if (!updateSquadname.squad_name) {
    return response.status(422).json({
      error: 'You must send only an object literal with the key squad_name',
    });
  }

  database('squads').where('id', id)
    .update(updateSquadname, '*')
    .then((update) => {
      update ?
        response.sendStatus(204)
        :
        response.sendStatus(404);
    })
    .catch(error => response.status(500).json({ error }));
});

app.delete('/api/v1/squads/:id', (request, response) => {
  const { id } = request.params;

  database('squads').where('id', id).del()
    .then((result) => {
      result ?
        response.sendStatus(204)
        :
        response.status(422).json({ error: `No user with id ${id}` });
    })
    .catch(error => response.status(422).json(error));
});

app.get('/api/v1/squads/:id/comments', (request, response) => {
  const { id } = request.params;

  database('squads').where('id', id).select()
    .then((squad) => {
      if (squad.length) {
        return database('comments').where('conversation_id', squad[0].conversation_id).select()
          .then((comments) => {
            comments.length ?
              response.status(200).json(comments)
              :
              response.status(404).json({ error: `Could not find comments for squad with id: ${id}` });
          })
          .catch(error => response.status(500).json({ error: `Internal server error ${error}` }));
      }
      return response.status(404).json({ error: `Could not find squad with id: ${id}` });
    })
    .catch(error => response.status(500).json({ error: `Internal server error ${error}` }));
});

app.post('/api/v1/squads/:id/comments', (request, response) => {
  let newComment = request.body;
  const { id } = request.params;

  if (!newComment.body) {
    return response.status(422).json({
      error: `you are missing the ${requiredParameter} property`,
    });
  }

  database('squads').where('id', id).select('conversation_id')
    .then((convoId) => {
      newComment = Object.assign({}, newComment, {
        conversation_id: convoId[0].conversation_id,
      });
      database('comments').insert(newComment, '*')
        .then(insertedComment => response.status(201).json(insertedComment))
        .catch(error => response.status(500).json({ error }));
    })
    .catch(error => response.status(500).json({ error: `Error creating new comment: ${error}` }));
});

app.get('/api/v1/goals', (request, response) => {
  database('goals').select()
    .then(items => response.status(200).json(items))
    .catch(error => response.status(500).json({ error: `internal server error ${error}` }));
});

app.get('/api/v1/goals/:id', (request, response) => {
  const { id } = request.params;

  database('goals').where('id', id).select()
    .then((goal) => {
      goal.length ? response.status(200).json(goal)
        :
        response.status(404).json({ error: `Could not find goal with id: ${id}` });
    })
    .catch(error => response.status(500).json({ error: `Internal server error ${error}` }));
});

app.patch('/api/v1/goals/:id', (request, response) => {
  const { id } = request.params;
  const updateGoal = request.body;

  if (!(updateGoal.title || updateGoal.description ||
    updateGoal.goal_time || updateGoal.goal_points)) {
    return response.status(422).json({
      error: 'You must send only an object literal with a key of title, body, goal_time, or goal_points',
    });
  }

  database('goals').where('id', id)
    .update(updateGoal, '*')
    .then((update) => {
      return update ?
        response.sendStatus(204)
        :
        response.sendStatus(404);
    })
    .catch(error => response.status(500).json({ error }));
});

app.delete('/api/v1/goals/:id', (request, response) => {
  const { id } = request.params;

  database('goals').where('id', id).del()
    .then((result) => {
      result ?
        response.sendStatus(204)
        :
        response.status(422).json({ error: `No goal with id ${id}` });
    })
    .catch(error => response.status(422).json(error));
});

app.get('/api/v1/goals/:id/comments', (request, response) => {
  const { id } = request.params;

  database('goals').where('id', id).select()
    .then((goal) => {
      if (goal.length) {
        return database('comments').where('conversation_id', goal[0].conversation_id).select()
          .then((comments) => {
            comments.length ?
              response.status(200).json(comments)
              :
              response.status(404).json({ error: `Could not find comments for goal with id: ${id}` });
          })
          .catch(error => response.status(500).json({ error: `Internal server error ${error}` }));
      }
      return response.status(404).json({ error: `Could not find goal with id: ${id}` });
    })
    .catch(error => response.status(500).json({ error: `Internal server error ${error}` }));
});

app.post('/api/v1/goals/:id/comments', (request, response) => {
  let newComment = request.body;
  const { id } = request.params;

  if (!newComment.body) {
    return response.status(422).json({
      error: `you are missing the ${requiredParameter} property`,
    });
  }

  database('goals').where('id', id).select('conversation_id')
    .then((convoId) => {
      newComment = Object.assign({}, newComment, {
        conversation_id: convoId[0].conversation_id,
      });
      database('comments').insert(newComment, '*')
        .then(insertedComment => response.status(201).json(insertedComment))
        .catch(error => response.status(500).json({ error }));
    })
    .catch(error => response.status(500).json({ error: `Error creating new comment: ${error}` }));
});

app.post('/api/v1/users/:id/goals', (request, response) => {
  let newGoal = request.body;
  const { id } = request.params;

  for (const requiredParameter of ['title', 'description', 'goal_time', 'goal_points']) {
    if (!newGoal[requiredParameter]) {
      return response.status(422).json({
        error: `you are missing the ${requiredParameter} property`,
      });
    }
  }

  const convoTitle = { title: `${newGoal.title} Conversation` };

  database('conversations').insert(convoTitle, 'id')
    .then((convoId) => {
      newGoal = Object.assign({}, newGoal, {
        creator_id: id,
        conversation_id: convoId[0],
      });
      database('goals').insert(newGoal, '*')
        .then(insertedGoal => response.status(201).json(insertedGoal))
        .catch(error => response.status(500).json({ error }));
    })
    .catch(error => response.status(500).json({ error: `Error creating new conversation: ${error}` }));
});

app.get('/api/v1/users/:id/goals-created', (request, response) => {
  const userId = request.params.id;

  database('goals').where('creator_id', userId).select()
    .then((user) => {
      user.length ? response.status(200).json(user)
        :
        response.status(404).json({ error: `Could not find user with id: ${userId}` });
    })
    .catch(error => response.status(500).json({ error: `Internal server error ${error}` }));
});

app.patch('/api/v1/comments/:id', (request, response) => {
  const { id } = request.params;
  const updateComment = request.body;

  if (!updateComment.body) {
    return response.status(422).json({
      error: 'You must send only an object literal with the key body',
    });
  }

  database('comments').where('id', id)
    .update(updateComment, '*')
    .then((update) => {
      return update ?
        response.sendStatus(204)
        :
        response.sendStatus(404);
    })
    .catch(error => response.status(500).json({ error }));
});

app.delete('/api/v1/comments/:id', (request, response) => {
  const { id } = request.params;

  database('comments').where('id', id).del()
    .then((result) => {
      result ?
        response.sendStatus(204)
        :
        response.status(422).json({ error: `No comment with id ${id}` });
    })
    .catch(error => response.status(422).json(error));
});

// GET all sqauds for one user
app.get('/api/v1/users/:userId/squads', (request, response) => {
  const { userId } = request.params;

  database('squads')
    .join('users_squads', 'users_squads.squad_id', '=', 'squads.id')
    .where('users_squads.user_id', userId)
    .select('*')
    .then((users) => {
      users.length ? response.status(200).json(users)
        :
        response.status(404).json({ error: `Could not find squad with id: ${squadId}` });
    })
    .catch(error => response.status(500).json({ error: `Internal server error ${error}` }));
});

// GET all goals for one users
app.get('/api/v1/users/:id/goals', (request, response) => {
  const { id } = request.params;

  database('goals')
    .join('users_goals', 'users_goals.goal_id', '=', 'goals.id')
    .where('users_goals.user_id', id)
    .select('*')
    .then((goals) => {
      goals.length ? response.status(200).json(goals)
        :
        response.status(404).json({ error: `Could not find a goals for user with id${id}` });
    })
    .catch(error => response.status(500).json({ error: `Internal server error ${error}` }));
});

// GET all users in one squad
app.get('/api/v1/squads/:squadId/users', (request, response) => {
  const { squadId } = request.params;

  database('users')
    .join('users_squads', 'users_squads.user_id', '=', 'users.id')
    .where('users_squads.squad_id', squadId)
    .select('*')
    .then((users) => {
      users.length ? response.status(200).json(users)
        :
        response.status(404).json({ error: `Could not find squad with id: ${squadId}` });
    })
    .catch(error => response.status(500).json({ error: `Internal server error ${error}` }));
});

// GET all users part of a goal
app.get('/api/v1/goals/:goalId/users', (request, response) => {
  const { goalId } = request.params;

  database('users')
    .join('users_goals', 'users_goals.user_id', '=', 'users.id')
    .where('users_goals.goal_id', goalId)
    .select('*')
    .then((users) => {
      users.length ? response.status(200).json(users)
        :
        response.status(404).json({ error: `Could not find goal with id: ${goalId}` });
    })
    .catch(error => response.status(500).json({ error: `Internal server error ${error}` }));
});

// POST user to a goal
app.post('/api/v1/users/:userId/goals/:goalId', (request, response) => {
  const { userId, goalId } = request.params;

  database('users_goals').insert({ user_id: userId, goal_id: goalId })
    .then(() => response.sendStatus(204))
    .catch(error => response.status(422).json(error));
});

// DELETE user from a goal
app.delete('/api/v1/users/:userId/goals/:goalId', (request, response) => {
  const { userId, goalId } = request.params;

  database('users_goals').where({ user_id: userId, goal_id: goalId })
    .del()
    .then((result) => {
      !result ? response.status(404).json({ error: 'No user or goal' })
        :
        response.sendStatus(204);
    })
    .catch(error => response.status(422).json(error));
});

// POST new user to a squad
app.post('/api/v1/users/:userId/squads/:squadId', (request, response) => {
  const { userId, squadId } = request.params;

  database('users_squads').insert({ user_id: userId, squad_id: squadId })
    .then(() => response.sendStatus(204))
    .catch(error => response.status(422).json(error));
});

// DELETE user from a squad
app.delete('/api/v1/users/:userId/squads/:squadId', (request, response) => {
  const { userId, squadId } = request.params;

  database('users_squads').where({ user_id: userId, squad_id: squadId })
    .del()
    .then((result) => {
      !result ? response.status(404).json({ error: 'No user or squad' })
        :
        response.sendStatus(204);
    })
    .catch(error => response.status(422).json(error));
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

module.exports = app;
