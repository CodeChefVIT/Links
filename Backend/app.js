const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const User = require('./models/user');

//Express App
const app = express();

const dbUrI = 'mongodb+srv://whoisaditya:4bIm4asQzmCbSJ9i@cluster0.0eoza.mongodb.net/am?retryWrites=true&w=majority';

mongoose.connect(dbUrI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3001)) //listen for requests 
    .catch((err) => console.log(err));

const user = new User({
    username: 'codechef-admin',
    password: '1234',
    link1: 'abc',
    link2: 'abc',
    link3: 'abc',
    link4: 'abc', 
    link5: 'abc'
});

// Main Page
app.get('/', (req, res) => {
    const index = path.join(__dirname, '/', '../Frontend', 'index.html');
    res.sendFile(index);
});

// Login Page
app.get('/login', (req, res) => {
    const index = path.join(__dirname, '/', '../Frontend', 'login.html');
    res.sendFile(index);
});

// Admin Page
app.get('/admin', (req, res) => {
    const index = path.join(__dirname, '/', '../Frontend', 'admin.html');
    res.sendFile(index);
});

