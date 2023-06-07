const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const mysql = require('mysql');
// Create Express app
const app = express();

//mysql
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '8',
  database: 'webData'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database: ', err);
    return;
  }
  console.log('Connected to MySQL database!');
});

// Create HTTP server with Express app
const server = http.createServer(app);

// Create socket connection on the server
const io = socketIo(server,{
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

// Set up middleware
// app.use(cors());

// Route for homepage
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Listen for HTTP server on port 3001
server.listen(3001, () => {
  console.log('listening on *:3001');
});

const users = new Map();
// let userName
// let receiver
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('join', (data) => {
    console.log(`${data.username} joined,aimed to receiver ${data.receiver}`);
    users.set(data.username, socket);
  });

  socket.on('message', (data) => {
    console.log(`received message from ${data.username}: ${data.text}`);
    const socket = users.get(data.receiver);
    if (socket) {
      socket.emit('message', data);
      // console.log(data)
    }
    else{
      console.log(data.receiver);
      connection.query('insert into messages(user,reciever,msg,isRead) values(?,?,?,false)',[data.username,data.receiver,data.text], (error, results, fields) => {
        if (error) {
          console.error('Error executing MySQL query: ', error);
          res.status(500).send('Error executing MySQL query');
          return;
        }    
      });
    }
  });

  socket.on('disconnect', (userName) => {
    console.log('user disconnected');
    users.delete(userName);
  });
});