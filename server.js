//imports
const path = require('path');
const express = require('express');
const session = require('express-session');
const roots = require('./controllers');

//create the connection to the DB
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//create the express app
const app = express();
const PORT = process.env.PORT || 3001;

//set up sessions with cookies
const sess = {
    secret: "secret",
    cookie: {

    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

//middleware