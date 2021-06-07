const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
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

app.use((req, res, next) => {
    console.log('new request made');
    console.log('host: ', req.hostname);
    console.log('path: ', req.path);
    console.log('method :', req.method);
    next();
});

//Static files
app.use(express.urlencoded({ extended: true }));
app.use(express.static('Frontend'));

const user = new User({
    username: 'codechef-admin',
    password: '1234',
});

const link = new Link({
    name: 'abc2',
    redirectTo: 'xyz2.com',
    clicks: '0'
});

// Main Page
app.get('/', (req, res) => {
    const index = path.join(__dirname, '/Frontend', 'index.html');
    res.sendFile(index);
});

// All links
app.get('/allLinks', (req, res) => {
    Link.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
});


// Login Page
app.get('/login', (req, res) => {
    // user.save()
    //     .then((result) => {
    //         res.send(result)
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });
    const index = path.join(__dirname, '/Frontend', 'login.html');
    res.sendFile(index);
});

// Admin Page
app.get('/admin', (req, res) => {
    const index = path.join(__dirname, './Frontend', 'admin.html');
    // link.save()
    //     .then((result) => {
    //         res.send(result)
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });
    res.sendFile(index);
});

app.post('/admin', (res, req) => {
    const link = new Link({
        name: 'abc3',
        redirectTo: 'xyz3.com',
        clicks: '0'
    });

    link.save()
        .then(result => {
            res.json({ redirect: '/admin' })
        })
        .catch((err) => {
            console.log(err);
        });

})

app.put('/admin/:id', (req, res) => {
    const id = req.params.id;

    Link.findByIdAndUpdate(id)
        .then(result => {
            res.json({ redirect: '/admin' })
        })
        .catch((err) => {
            console.log(err);
        });
})

app.delete('/admin/:id', (req, res) => {
    const id = req.params.id;

    Link.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/admin' })
        })
        .catch((err) => {
            console.log(err);
        });
})


