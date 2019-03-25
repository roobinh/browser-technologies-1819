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
const path = require('path')
const fs = require('fs')

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
    
    // read soccer data
    console.log("reading soccer.json...")
    const data = require('./soccer.json');
    console.log(data);

    var thuisteam = data.thuisteam;
    var thuisgoals = data.thuisgoals;
    var uitteam = data.uitteam;
    var uitgoals = data.uitgoals;

    var message = thuisteam + " " + thuisgoals + " - " + uitgoals + " " + uitteam;

    // create payload
    const payload = JSON.stringify({ title: 'GOAL!', body: message})

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
app.post('/confirm', function (req, res, next) {
    const data = require('./soccer.json');

    var thuisteam = data.thuisteam;
    var thuisgoals = data.thuisgoals;
    var uitteam = data.uitteam;
    var uitgoals = data.uitgoals;

    res.render('pages/confirm', {
        club: req.body.teams,
        thuisteam: thuisteam,
        uitteam: uitteam,
        thuisgoals: thuisgoals,
        uitgoals: uitgoals
    });
});

app.get('/confirm', function (req, res, next) {
    const data = require('./soccer.json');

    var thuisteam = data.thuisteam;
    var thuisgoals = data.thuisgoals;
    var uitteam = data.uitteam;
    var uitgoals = data.uitgoals;

    res.render('pages/confirm', {
        club: req.body.teams,
        thuisteam: thuisteam,
        uitteam: uitteam,
        thuisgoals: thuisgoals,
        uitgoals: uitgoals
    })
})

// check soccer.json file for changes.
fs.watchFile('./soccer.json', (curr, pref) => {
    console.log("File changed");
})

// start server
app.listen(port, () => console.log(`Example app listening on port ${port}!`))