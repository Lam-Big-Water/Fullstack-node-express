const express = require('express');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
})

const data = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.end('<h1>Welcome!</h1>')
})

app.get('/api/person', (request, response) => {
    if (!data) {
        return response.status(400).json({
            error: 'content missing'
        })
    }
    response.writeHead(200, {'Content-Type': 'text/html'})
    response.end(`<article>${JSON.stringify(data)}</article>`)

    // response.json(data)

})

app.get('/api/person/:id', (request, response) => {
  const id = request.params.id;
  console.log(id);
  const item = data.find(el => el.id === id);
  console.log(item)

  if (!item && id > data.length) {
    return response.status(404).json({
      error: 'Invalid ID'
    });
  }

  response.status(200).json(item);
})

app.get('/info', (request, response) => {
  if (!data) {
    return response.status(400).json({
      error: 'content missing'
    })
  }
  response.writeHead(200, {'Content-Type': 'text/html'})
  response.end(`<p>${request.requestTime}</p> <p>PhoneBook has info for ${data.length} people</p>`);

})

app.delete('/api/person/:id', (request, response) => {
  const id = request.params.id;

  if (id > data.length) {
    return response.status(404).json({
      error: 'Invalid ID'
    })
  }

  response.status(204).json({
        status: 'success',
        data: null
    });
})

app.post('/api/person', (request, response) => {
  const {name, number} = request.body;
  if (!name || !number) {
    return response.status(400).json({error: 'Please provide a name and number.'}).end()
  }
  const newId = Number(data[data.length - 1].id) + 1;
  const newData = Object.assign({id: String(newId)}, request.body);
  data.push(newData)
  
  response.status(200).json(data);
})


const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on the port ${PORT}`)
})