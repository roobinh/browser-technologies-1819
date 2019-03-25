/* APIWha
var message = "Text Message Here"
https.get('https://panel.apiwha.com/send_message.php?apikey=0L1CI6ULZ9LZSQAOCTNH&number=31652788674&text=' + message,
    res => {
        console.log(res.statusCode);   
}) */

const express = require('express')
const https = require('https')
const webpush = require('web-push')
const bodyParser = require('body-parser')
const path = require('path');

const app = express()
const port = 5000

// set the view engine to ejs
app.set('view engine', 'ejs');

// set default directory
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

const publicVapidKey = 'BN8yGtgilYEATAYZEaVyV621kwyv4DMcuGr2coAm36uzqeHHtO3PvcW2G2dXfj4RWAsH3dOfpyNkWy06oTF7AUM'
const privateVapidKey = 'w91xBifwsywDZK091EAaclCwWGoualkhfQ3HWe-C67E'

webpush.setVapidDetails('mailto:test@test.com', publicVapidKey, privateVapidKey);

// subscribe Route
app.post('/subscribe', (req, res) => {
    // get push subscription Object
    const subscription = req.body;

    // send 201 - resource created
    res.status(201).json({});

    // create payload
    const payload = JSON.stringify({ title: 'Push Test'})

    // pass object into sendNotification
    webpush.sendNotification(subscription, payload).catch(err => console.log(err))
})


// index page 
app.get('/', function(req, res) {
    res.render('pages/home');
});

// home page 
app.get('/home', function(req, res) {
    res.render('pages/home');
});

// results page
app.get('/confirm/:club', function (req, res, next) {
    res.render('pages/confirm', {
        club: req.params.club
    });
});

// results page
app.post('/confirm', function (req, res, next) {
    res.render('pages/confirm', {
        club: req.body.teams
    });
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))