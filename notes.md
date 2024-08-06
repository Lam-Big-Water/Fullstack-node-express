# nodeJS

## setUp
1. `npm init`
2. adding a new script command in the `package.json`
```json
{
  // ...
  "scripts": {
    "start": "node index.js",
    // ...
  },
  // ...
}
```

## breakDown
1. 
```js
// This is CommonJS
const http = require('http')
explain(
  `Imports Node's built-in web server module.`
)
```
2. 
```js
const app = http.createServer((request, response) => {
  response.writeHead(200, {'Content-Type': 'text/plain'})
  response.end('Hello World')
})

createServer
explain(`
The code uses the createServer method of the http module to create a new web server.
`)

response.writeHead(200, {'Content-Type': 'text/plain'})
explain(`
200 => status code
text/plain => Content-Type header
`)

response.end('Hello World')
explain(`
return site content
`)

app.listen(PORT)
explain(`
Binding the http server assigned to the `app`
`)
```

3. 
```js
'Content-Type': 'application/json'
explain(`
Informs the receiver that the data is in the JSON format.
`)

JSON.stringify()
explain(`
Transformed data into JSON formatted string
`)
```




# Express

## setUp
1. `npm install express`

## breakDown
```js
const express = require('express')
explain(`
Importing `express`
`)

const app = express()
explain(`
Create an `express` application stored in the app variable
`)

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})
explain(`
Define the route to the application. Made HTTP GET request to the '/' root

request parameter => contains all of the information of the HTTP request.

response parameter => is used to define how the request is responded to.

response.send() 
=> makes the server respond to the HTTP request.
=> 'express' automatically sets the value of the Content-Type header to be text/html.
=> The status code of the response defaults to 200.
`)

response.json(notes)
explain(`
will send the notes array that was passed to it as a JSON formatted string.

'express' automatically sets the Content-Type header with the appropriate value of application/json
`)
```

## nodemon
1. `npm install --save-dev nodemon`
2. adding a new script command in the `package.json`
```json
"dev": "nodemon index.js",
```
- nodemon will watch, automatically restart your node application if any files change.

## REST
- REST is an architectural style meant for building scalable web applications.

### Parameters
```js
const id = request.params.id
explain(
  `The id parameter in the route of a request can be accessed through the 'request' object`
)
```