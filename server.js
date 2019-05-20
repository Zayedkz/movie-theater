const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');

const movies = require('./routes/api/movies');
const register = require('./routes/api/register');
const login = require('./routes/api/login');

const app = express();

app.use(express.json());

// DB config
const db = config.get('mongoURI');


// connect to mongo
mongoose
    .connect(db, { 
        useNewUrlParser: true, 
        useCreateIndex: true //this is to stop warning from mongoose
     })
    .then(() => console.log('mongodb connected...'))
    .catch(err => console.log(err));

// use routes
app.use('/api/movies', movies);
app.use('/api/register', register);
app.use('/api/login', login);

// Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
    // set static folder 
    app.use(express.static('client/build'));
    app.get('*', (req, res) => { //'*' = anything, any path
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    } );
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server started on port ${port}`));