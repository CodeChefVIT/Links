const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const User = require('./Backend/models/user');
const Link = require('./Backend/models/link');


dotenv.config();

let refreshTokens = []

//Express App
const app = express();

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

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

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
    username: process.env.ADMIN_USERNAME,
    password: process.env.ADMIN_PASSWORD,
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
// User Related
// For Updating No of Clicks
app.put('/updateCount/:id', (req, res) => {
    //const link = req.body.link;
    const id = req.params.id;

    Link.updateOne({ _id: id }, { $inc: { clicks: 1 } })
        .then(result => {
            res.status(200).send(result);
        })
        .catch((err) => {
            console.log(err);
        });
})

// All links
app.get('/allLinks', (req, res) => {
    Link.find()
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            console.log(err);
        })
});


app.post('/admin',authenticateToken , (req, res) => {
    const {name, redirectTo, clicks} = req.body;

    //const link = req.body.link;

    //console.log(req);

    console.log(req.body);

    const link1 = new Link({name, redirectTo, clicks});

    // const link = new Link({
    //     name: 'abc25',
    //     redirectTo: 'xyz3.com',
    //     clicks: '0'
    // });

    link1.save()
        .then(result => {
            res.status(200).send(result);
        })
        .catch((err) => {
            console.log(err);
        });

})

app.put('/admin/:id', authenticateToken,(req, res) => {

    //const link = req.body.link;
    const id = req.params.id;

    Link.updateOne({ _id: id }, {
        name: 'abc4',
        redirectTo: 'xyz4.com',
    })
        .then(result => {
            res.status(200).send(result);
        })
        .catch((err) => {
            console.log(err);
        });
})

app.delete('/admin/:id', authenticateToken ,(req, res) => {
    const id = req.params.id;

    Link.findByIdAndDelete(id)
        .then(result => {
            //console.log('yup');
            res.status(200).send(result);

        })
        .catch((err) => {
            console.log(err);
        });
})

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      console.log(err)
      if (err) return res.sendStatus(403)
      req.user = user
      next()
    })
  }
  
  app.listen(3000)
