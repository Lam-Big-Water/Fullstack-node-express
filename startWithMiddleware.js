const express = require('express');
const app = express();

// initial data
let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

// middleware
const requestLogger = (request, response, next) => {
  console.log('Method: ', request.method);
  console.log('Path: ', request.path);
  console.log('Body: ', request.body);
  console.log('---');
  next()
}

// use middleware
app.use(express.json);
app.use(requestLogger);

// error handle
const unknownEndpoint = (request, response) => {
  response.status(404).send({error: 'unknown endpoint'});
};


// API
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>');
});

// GET ALL
app.get('/api/notes', (request, response) => {
  response.json(notes);
});

// GET SINGLE
app.get('api/notes/:id', (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find((note) => note.id === id);
  if (note) {
    response.json(note);
  } else {
    console.log('X');
    response.status(404).end();
  }
})

// POST
const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0;
  return maxId + 1;
};

app.post('/api/notes', (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: 'content missing'
    });
  };

  const note = {
    content: body.content,
    important: body.important || false,
    id: generateId(),
  }

  notes = notes.concat(note);

  response.json(notes);
})

// DELETE
app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);

  response.status(204).end();
})

app.use(unknownEndpoint);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on part ${PORT}`);
});



