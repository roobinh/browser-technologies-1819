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

app.post('/subscribe', (req, res) => {
    // get push subscription Object
    const subscription = req.body;

    // send 201 - resource created
    res.status(201).json({});
    
    // read soccer data
    console.log("reading soccer.json...")
    fs.readFile('./public/json/soccer.json', (err, buffer) => {
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

// push notification
app.post('/score', function (req, res, next) {
    fs.readFile('./public/json/soccer.json', (err, buffer) => {
        if (err) throw err;
        const data = JSON.parse(buffer.toString());

        var thuisteam = data.thuisteam;
        var thuisgoals = data.thuisgoals;
        var uitteam = data.uitteam;
        var uitgoals = data.uitgoals;

        res.render('pages/score', {
            club: req.body.teams,
            thuisteam: thuisteam,
            uitteam: uitteam,
            thuisgoals: thuisgoals,
            uitgoals: uitgoals
        });
    });    
});

// score page
app.get('/score', function (req, res, next) {
    fs.readFile('./public/json/soccer.json', (err, buffer) => {
        if (err) throw err;

        const data = JSON.parse(buffer.toString());

        var thuisteam = data.thuisteam;
        var thuisgoals = data.thuisgoals;
        var uitteam = data.uitteam;
        var uitgoals = data.uitgoals;

        res.render('pages/score', {
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
    fs.readFile('./public/json/email.json', (err, buffer) => {
        if (err) throw err;

        const json = JSON.parse(buffer.toString());
        const nieuweEmail = req.params.email;

        if(nieuweEmail !== 'client.js') {
            if(!valueExists(json, nieuweEmail)) {
                const jsonLength = Object.keys(json).length;                
                json[jsonLength] = nieuweEmail;

                fs.writeFile('./public/json/email.json', JSON.stringify(json), (err) => {
                    if (err) throw err;
                    console.log('The file has been saved!');
                });
            }      
        }  
    });

    //redirect to score page
    res.redirect('/score');
})

app.get('/whatsapp/:number', function(req, res, next) {
    // read new email to file (if it doesnt exist)
    fs.readFile('./public/json/numbers.json', (err, buffer) => {
        if (err) throw err;

        const json = JSON.parse(buffer.toString());
        const newNumber = req.params.number;
        console.log(json)
        console.log(newNumber)

        if(newNumber !== 'client.js') {
            if(!valueExists(json, newNumber)) {
                const jsonLength = Object.keys(json).length;                
                json[jsonLength] = newNumber;

                fs.writeFile('./public/json/email.json', JSON.stringify(json), (err) => {
                    if (err) throw err;
                    console.log('The file has been saved!');
                });
            }      
        }  
    });

    //redirect to score page
    res.redirect('/score');
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