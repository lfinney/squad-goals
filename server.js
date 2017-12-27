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

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Squad Goals';
app.use(express.static(__dirname + '/public'));

app.get('/api/v1/users', (request, response) => {
  database('users').select()
    .then(items => response.status(200).json(items))
    .catch(error => response.status(500).json({ error: `internal server error ${error}` }));
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

// app.get('/api/v1/squads', (request, response) => {
//   database('').select()
//     .then(items => response.status(200).json(items))
//     .catch(error => response.status(500).json({ error: `internal server error ${error}` }));
// });
//
// app.get('/api/v1/users/:id/squads', (request, response) => {
//   const { id } = request.params;
//
//   database('').where('id', id).select()
//     .then((user) => {
//       user.length ? response.status(200).json(user)
//         :
//         response.status(404).json({ error: `Could not find user with id: ${id}` });
//     })
//     .catch(error => response.status(500).json({ error: `Internal server error ${error}` }));
// });

app.get('/api/v1/users/:id/challenges', (request, response) => {
  const userId = request.params.id;

  database('challenges').where('creator_id', userId).select()
    .then((user) => {
      user.length ? response.status(200).json(user)
        :
        response.status(404).json({ error: `Could not find user with id: ${userId}` });
    })
    .catch(error => response.status(500).json({ error: `Internal server error ${error}` }));
});

app.get('/api/v1/challenges/:id', (request, response) => {
  const { id } = request.params;

  database('challenges').where('id', id).select()
    .then((challenge) => {
      challenge.length ? response.status(200).json(challenge)
        :
        response.status(404).json({ error: `Could not find challenge with id: ${id}` });
    })
    .catch(error => response.status(500).json({ error: `Internal server error ${error}` }));
});

app.get('/api/v1/challenges', (request, response) => {
  database('challenges').select()
    .then(items => response.status(200).json(items))
    .catch(error => response.status(500).json({ error: `internal server error ${error}` }));
});

// app.get('/api/v1/squads/:id', (request, response) => {
//   const { id } = request.params;
// });
//
// app.get('/api/v1/squads/:id/conversations/:id/comments', (request, response) => {
//   const { id } = request.params;
// });

app.get('/api/v1/challenges/:id/conversations/:convoId/comments', (request, response) => {
  const { id, convoId } = request.params;

  database('comments').where('conversation_id', convoId).select()
    .then((conversation) => {
      conversation.length ? response.status(200).json(conversation)
        :
        response.status(404).json({ error: `Could not find conversation with id: ${convoId}` });
    })
    .catch(error => response.status(500).json({ error: `Internal server error ${error}` }));
});

app.post('/api/v1/user/', (request, response) => {
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

// app.post('/api/v1/squads', (request, response) => {
//
// });

app.post('/api/v1/users/:id/challenges', (request, response) => {
  let newChallenge = request.body;
  const { id } = request.params;

  for (const requiredParameter of ['title', 'description', 'challenge_time', 'challenge_points']) {
    if (!newChallenge[requiredParameter]) {
      return response.status(422).json({
        error: `you are missing the ${requiredParameter} property`,
      });
    }
  }

  const convoTitle = { title: `${newChallenge.title} Conversation` };

  database('conversations').insert(convoTitle, 'id')
    .then((convoId) => {
      newChallenge = Object.assign({}, newChallenge, {
        creator_id: id,
        conversation_id: convoId[0],
      });
      database('challenges').insert(newChallenge, '*')
        .then(insertedChallenge => response.status(201).json(insertedChallenge))
        .catch(error => response.status(500).json({ error }));
    })
    .catch(error => response.status(500).json({ error: `Error creating new conversation: ${error}` }));
});

// app.post('/api/v1/squads/:id/conversations/:id/comments', (request, response) => {
//   const { id } = request.params;
// });

app.post('/api/v1/challenges/:id/conversations', (request, response) => {
  let newComment = request.body;
  const { id } = request.params;

  for (const requiredParameter of ['body']) {
    if (!newComment[requiredParameter]) {
      return response.status(422).json({
        error: `you are missing the ${requiredParameter} property`,
      });
    }
  }

  const convoTitle = { title: `${newComment.title} Conversation` };

  database('conversations').insert(convoTitle, 'id')
    .then((convoId) => {
      console.log(convoId);
      newComment = Object.assign({}, newComment, {
        conversation_id: convoId[0],
      });
      console.log(newComment);
      database('comments').insert(newComment, '*')
        .then(insertedComment => response.status(201).json(insertedComment))
        .catch(error => response.status(500).json({ error }));
    })
    .catch(error => response.status(500).json({ error: `Error creating new comment: ${error}` }));

  // database('comments').insert(newComment, '*')
  //   .then(insertedComment => response.status(201).json(insertedComment))
  //   .catch(error => response.status(500).json({ error }));
});

app.patch('/api/v1/user/:id', (request, response) => {
  const { id } = request.params;
});

app.patch('/api/v1/squads/:id', (request, response) => {
  const { id } = request.params;
});

app.patch('/api/v1/challenges/:id', (request, response) => {
  const { id } = request.params;
});

app.delete('/api/v1/user/:id', (request, response) => {
  const { id } = request.params;
});

app.delete('/api/v1/squads/:id', (request, response) => {
  const { id } = request.params;
});

app.delete('/api/v1/challenges/:id', (request, response) => {
  const { id } = request.params;
});

app.delete('/api/v1/squads/:id/conversations/:id/comments', (request, response) => {
  const { id } = request.params;
});

app.delete('/api/v1/challenges/:id/conversations/:id/comments', (request, response) => {
  const { id } = request.params;
});


app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});
