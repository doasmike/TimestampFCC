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

  // Attempt to parse the date using various formats
  let date;
  if (/[0-9]{5}/.test(param1)) {
    // Unix timestamp
    date = new Date(parseInt(param1));
  } else if (/[0-9]{4}-[0-9]{2}-[0-9]{2}/.test(param1)) {
    // YYYY-MM-DD format
    date = new Date(param1);
  } else if (/[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}Z/.test(param1)) {
    // ISO 8601 format
    date = new Date(param1);
  } else {
    // Handle invalid date input
    res.json({ error: "Invalid Date" });
    return;
  }

  // Check if the parsed date is valid
  if (isNaN(date.getTime())) {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({ unix: date.getTime(), utc: date.toUTCString() });
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
