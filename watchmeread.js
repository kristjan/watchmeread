var express = require('express');
var app = express.createServer(
  express.logger(),
  express.bodyParser(),
  express.cookieParser(),
  express.session({secret: 'opensourcedcodeishardtostoresecretsin'}),
  express.static(__dirname + '/public')
);

app.register('.haml', require('hamljs'));
app.set('view engine', 'haml');

app.get('/', function(request, response) {
  response.render("index", {
    locals: {
      flash: request.flash()
    }
  });
});

var INTERVAL = 5;
var MS_PER_S = 1000;
app.get('/watch/:n', function(request, response) {
  var next = parseInt(request.params.n, 10) + INTERVAL
  timeout = setTimeout(function() {
    response.header('Content-Type', 'image/gif');
    response.redirect('/watch/' + next), 302;
    clearTimeout(timeout);
  }, INTERVAL * MS_PER_S);
});

app.post('/email', function(request, response) {
  var email = request.body.email;
  request.flash('info', 'An email is being sent to %s.', email);
  response.redirect('/');
});

app.listen(process.env.PORT || 3000)

