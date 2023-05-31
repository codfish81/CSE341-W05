const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const app = express();
const port = process.env.PORT || 8080

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'));
};

 app.engine('.hbs', exphbs.engine({defaultLayout: 'main', extname: '.hbs'}));
 app.set('view engine', '.hbs');

 app.use(express.static(path.join(__dirname, '/public')))

app
.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
.use(bodyParser.json())
.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
})
.use('/', require('./routes'));

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