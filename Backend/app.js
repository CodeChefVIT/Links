const express = require('express');
const path = require('path');
//Express App

const app = express();

//listen for requests 
app.listen(3001);

// Main Page
app.get('/',(req, res) => {
    const index = path.join(__dirname, '/', '../Frontend', 'index.html');
    res.sendFile(index);
});

// Login Page
app.get('/login',(req, res) => {
    const index = path.join(__dirname, '/', '../Frontend', 'login.html');
    res.sendFile(index);
});

// Admin Page
app.get('/admin',(req, res) => {
    const index = path.join(__dirname, '/', '../Frontend', 'admin.html');
    res.sendFile(index);
});

