const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');

const signIn = require('./controller/signIn');
const register = require('./controller/register');
const profile = require('./controller/profile');
const image = require('./controller/image');

const db = knex({
  // Connect to postgres
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'root',
    database : 'face-detection-ai'
  }
});

const app = express();

app.use(cors())
app.use(bodyParser.json());

app.get('/', (req, res)=> {
  res.send(database.users);
})

app.post('/signin', (req, res) => signIn.handleSignIn(req, res, db,bcrypt));

app.post('/register', register.handleRegister(db, bcrypt));

app.get('/profile/:id', profile.handleProfile(db));

app.put('/image', image.handleImage(db));

app.post('/imageurl', (req, res) => image.handleApiCall(req, res));

app.listen(3000, ()=> {
  console.log('app is running on port 3000');
})
