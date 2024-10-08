// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:param1?", function (req, res) {
  let param1 = req.params.param1;

  // Handle empty date parameter
  if (!param1) {
    const now = new Date();
    res.json({ unix: now.getTime(), utc: now.toUTCString() });
    return;
  }


  let date;
  if (/[0-9]{5}/.test(param1)) {
    // Unix timestamp
    date = parseInt(param1);
    res.json({ unix: date, utc: new Date(date).toUTCString() });
  } else {
    // Handle invalid date input

    date = new Date(param1);
    // Check if the parsed date is valid
    if (date.toString() === "Invalid Date") {
      res.json({ error: "Invalid Date" });
    } else {
      res.json({ unix: date.valueOf(), utc: date.toUTCString() });
    }

  }
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
