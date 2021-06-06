const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./Backend/models/user');
const Link = require('./Backend/models/link');

dotenv.config();

//Express App
const app = express();
app.listen(3001);

const uri = process.env.DB_URI;
//console.log('Uri Defined', uri);

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
    .then(() => {
        console.log('Connection estabislished with MongoDB');
    })
    .catch(error => console.error(error.message));

const user = new User({
    username: 'codechef-admin',
    password: '1234',
});

const link = new Link({
    name: 'GitHub',
    redirectTo: 'https://github.com/whoisaditya',
    clicks: '10'
});

// Main Page
app.get('/', (req, res) => {
    res.sendFile('./Frontend/index.html');
});

// Login Page
app.get('/login', (req, res) => {
    res.sendFile('./Frontend/login.html');
});

// Admin Page
app.get('/admin', (req, res) => {
    res.sendFile('./Frontend/admin.html');
});

