// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/:dateVal", function (request, response) {
  var dateVal= request.params.dateVal;
  var natural;
  var unix;
  if(isNaN(dateVal)){   
    natural = dateVal;
    var date = new Date(dateVal);
    unix= date.getTime()/1000;
    //checking if dateVal was a date in the first place...
      if (isNaN(unix)){
        natural = null;
      }
  } else {
    unix = dateVal;
      //formatting the date:
    var date = new Date(dateVal*1000);
    var year = date.getFullYear();
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var month = months[date.getMonth()];
    var day= date.getDate();
    natural= month +" " + day + ", " + year;
  }
  
  
  response.json({unix: unix, natural: natural});
  
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
