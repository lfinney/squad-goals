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
  database('').select()
    .then(items => response.status(200).json(items))
    .catch(error => response.status(500).json({ error: `internal server error ${error}` }));
});

app.get('/api/v1/users/:id', (request, response) => {
  const { id } = request.params;

  database('').where('id', id).select()
    .then((user) => {
      user.length ? response.status(200).json(user)
        :
        response.status(404).json({ error: `Could not find user with id: ${id}` });
    })
    .catch(error => response.status(500).json({ error: `Internal server error ${error}` }));
});

app.get('/api/v1/squads', (request, response) => {
  database('').select()
    .then(items => response.status(200).json(items))
    .catch(error => response.status(500).json({ error: `internal server error ${error}` }));
});

app.get('/api/v1/users/:id/squads', (request, response) => {
  const { id } = request.params;

  database('').where('id', id).select()
    .then((user) => {
      user.length ? response.status(200).json(user)
        :
        response.status(404).json({ error: `Could not find user with id: ${id}` });
    })
    .catch(error => response.status(500).json({ error: `Internal server error ${error}` }));
});

app.get('/api/v1/users/:id/challenges', (request, response) => {
  const { userId } = request.params;

  database('').where('userId', userId).select()
    .then((user) => {
      user.length ? response.status(200).json(user)
        :
        response.status(404).json({ error: `Could not find user with id: ${userId}` });
    })
    .catch(error => response.status(500).json({ error: `Internal server error ${error}` }));
});

app.get('/api/v1/challenges/:id', (request, response) => {
  const { id } = request.params;
});

app.get('/api/v1/challenges', (request, response) => {

});

app.get('/api/v1/squads/:id', (request, response) => {
  const { id } = request.params;
});

app.get('/api/v1/squads/:id/conversations/:id/comments', (request, response) => {
  const { id } = request.params;
});

app.get('/api/v1/challenges/:id/conversations/:id/comments', (request, response) => {
  const { id } = request.params;
});

app.post('/api/v1/user/', (request, response) => {

});

app.post('/api/v1/squads', (request, response) => {

});

app.post('/api/v1/challenges', (request, response) => {

});

app.post('/api/v1/squads/:id/conversations/:id/comments', (request, response) => {
  const { id } = request.params;
});

app.post('/api/v1/challenges/:id/conversations/:id/comments', (request, response) => {
  const { id } = request.params;
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
