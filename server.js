const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use(function(req, res, next) {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  fs.appendFile('server.log', log + '\n', function(err) {
    if (err) {
      console.log('Unable to append to server.log.');
    }
  })
  console.log(log);
  next();
});

// app.use(function(req, res, next) {
//   res.render('maintenance');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', function() {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', function(text) {
  return text.toUpperCase();
});

app.get('/', function(req, res) {
  res.render('home', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website'
  });
});

app.get('/about', function(req, res) {
  res.render('about', {
    pageTitle: 'About Page'
  });
});

app.get('/projects', function(req, res) {
  res.render('projects', {
    pageTitle: 'Projects'
  });
});

app.listen(port, function() {
  console.log(`Server is up on port ${port}`);
});
