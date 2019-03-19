const express = require('express')
const https = require('https')
const app = express()
const port = 5000

// var message = "Text Message Here"
// https.get('https://panel.apiwha.com/send_message.php?apikey=0L1CI6ULZ9LZSQAOCTNH&number=31652788674&text=' + message,
//     res => {
//         console.log(res.statusCode);   
// })


// set the view engine to ejs
app.set('view engine', 'ejs');

// set default directory
app.use(express.static('public'));

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

app.listen(port, () => console.log(`Example app listening on port ${port}!`))