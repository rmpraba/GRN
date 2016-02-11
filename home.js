/**
 * Created by praba on 2/10/2016.
 */

var express    = require("express");
var mysql      = require('mysql');
var bodyParser = require('body-parser');
var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//Method call to read credential information to establish the database connection
var readcredential = require("./app/scripts/dboperations.js");
readcredential.FnReadCredentials();

//Lodaing static files like elements from app folder
app.use(express.static('app'));

//Receiving get request from index.html to render the home page of the application
app.get('/' ,function (req, res) {
  res.sendFile( "app/index.html" );
});

//Receiving post request from login card
app.post('/login-card', urlencodedParser, function (req, res) {
  //Loading JS file to call the login check function
  var logincall = require("./app/scripts/dboperations.js");
  //calling loginchcek function with connection,username and password to validate the user,here defined callback method to get the asynchronous response
  logincall.FnLoginDBCheck("login-card",req.body.username,req.body.password,function(returnval){
    if(returnval!="invalid")
    //Sending positive response(role name) back to the login card if it is valid user
      res.status(200).json({'returnval': returnval});
    else
    //Sending error response
      res.status(200).json({'returnval': "invalid"});
  });
});


//Node server running port number
app.listen(4000);

