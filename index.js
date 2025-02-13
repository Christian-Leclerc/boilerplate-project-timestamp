// index.js
// where your node app starts

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
  res.json({greeting: 'hello test test test API'});
});

app.get("/api", (req, res) =>{
  res.json ({
    unix: new Date().getTime(),
    utc: new Date().toUTCString()
  });
});

app.get("/api/:timeValue", (req, res) => {
  const timeValue=req.params.timeValue;
  if ( typeof Number(timeValue) === "number" && timeValue.length === 13) {
    return res.json({
      unix: Number(timeValue),
      utc: new Date(Number(timeValue)).toUTCString()
    });
  };
  if (new Date(timeValue).toUTCString() != "Invalid Date") {
    return res.json({
      unix: new Date(timeValue).getTime(),
      utc: new Date(timeValue).toUTCString()
    });
  };
  
  res.json({ error: "Invalid Date" });
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
