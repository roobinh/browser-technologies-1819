const express = require('express')
const webpush = require('web-push')
const bodyParser = require('body-parser')
const fs = require('fs')

const app = express()
const port = 5000

// set the view engine to ejs
app.set('view engine', 'ejs');

// set default directory
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

// set vapid keys for service worker
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
    fs.readFile('./public/js/soccer.json', (err, buffer) => {
        if (err) throw err;
        
        const data = JSON.parse(buffer.toString());

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
});

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
    fs.readFile('./public/js/soccer.json', (err, buffer) => {
        if (err) throw err;
        const data = JSON.parse(buffer.toString());
        console.log("notificatie vraagteken?")

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
});

// results page
app.get('/confirm', function (req, res, next) {
    fs.readFile('./public/js/soccer.json', (err, buffer) => {
        if (err) throw err;
        const data = JSON.parse(buffer.toString());
        
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
    });
})

app.get('/email/:email', function(req, res, next) {
    // read new email to file (if it doesnt exist)
    fs.readFile('./public/js/email.json', (err, buffer) => {
        if (err) throw err;

        const json = JSON.parse(buffer.toString());
        const nieuweEmail = req.params.email;

        if(nieuweEmail !== 'client.js') {
            if(!valueExists(json, nieuweEmail)) {
                const jsonLength = Object.keys(json).length;                
                json[jsonLength] = nieuweEmail;

                fs.writeFile('./public/js/email.json', JSON.stringify(json), (err) => {
                    if (err) throw err;
                    console.log('The file has been saved!');
                });
            }      
        }  
    });

    //redirect to confirm page
    res.redirect('/confirm');
})

// check if value exists in json
function valueExists(jsObj, value){
    for (var key in jsObj){
        if (jsObj[key] == value) return true;
    }
    return false;
}

// start server
app.listen(port, () => console.log(`App running, listening on port ${port}!`))