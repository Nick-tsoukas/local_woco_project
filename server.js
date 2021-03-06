// NPM pkg
var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');
var db = require("./models");

// create express server
var app = express();

// PORT will work on local host 8080
var PORT = process.env.PORT || 8080;
// standard bodyParser


app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());
// Check if server is running when press node.js
app.use(bodyParser.text({ type: "text/html"}));
app.use(bodyParser.json({type: "application/vnd.custom-type"}));
// Static directory
app.use(express.static("app/public"));

require("./app/routing/apiRoutes")(app);
// require(__dirname, "./app/routing/htmlRoutes")(app);
require("./app/routing/htmlRoutes")(app);


db.sequelize.sync({ force: true }).then(function() {
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
  });
  