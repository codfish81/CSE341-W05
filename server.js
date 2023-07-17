const path = require('path');
const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const passport = require('passport');
const session = require('express-session');
const app = express();
const port = process.env.PORT || 8080

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

require('./passport')(passport)

if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'));
};

 app.engine('.hbs', exphbs.engine({defaultLayout: 'main', extname: '.hbs'}));
 app.set('view engine', '.hbs');

 app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
 }))

 app.use(passport.initialize());
 app.use(passport.session());

 app.use(express.static(path.join(__dirname, '/public')))

app
.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
.use(bodyParser.json())
.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
})
.use('/', require('./routes'))
.use('/auth', require('./routes/auth'));

process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

mongodb.initDb((err) => {
    if (err) {
      console.log(err);
    } else {
      app.listen(port);
      console.log(`Connected to DB and listening on ${port}`);
    }
  });