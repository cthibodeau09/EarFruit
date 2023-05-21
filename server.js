// imports
const path = require('path');
const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');



// create the connection to the DB
const sequelize = require('./config/connection');
const trackRoutes = require('./controllers/api/trackRoutes'); // Import trackRoutes

// create the express app
const app = express();
const PORT = process.env.PORT || 3001;

// set up sessions with cookies
const sess = {
  secret: 'secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};


// Middleware
const hbs = exphbs.create({ helpers });
app.engine('handlebars', hbs.engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sess));
app.use(express.static('public/images'));


// Routes
app.use('/api/track', trackRoutes); // Mount trackRoutes under '/api/track' path
app.use(require('./controllers/'))

// Start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
