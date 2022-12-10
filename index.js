// index.js
// where your node app starts

const env = require('dotenv').config();

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api", function (req, res) {
  let date = new Date();
  res.json({
    unix: date.getTime(),
    utc: date
  });
});

app.get("/api/:date?", (req, res, next) => {
  let data = req.params.date;
  let date = 0;

  if ( !isNaN( Number( data ) ) ) {
    data = parseInt(data);
  }

  date = new Date( data );

  if ( date == "Invalid Date" ) {
    req.dateResponse = { error: "Invalid Date" };  
  }
  else {
    req.dateResponse = {
      unix: date.getTime(),
      utc: date.toUTCString()
    }
  }

  next();
}, (req, res) => {
  res.json( req.dateResponse );
});


// listen for requests :)
var listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on address ' + listener.address().address + ' and port ' + listener.address().port);
});
