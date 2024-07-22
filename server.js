/*
* Import all necessary modules and components
*/
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const bodyParser = require('body-parser');
const createError = require('http-errors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const mongodb = require('./db/connect');
const routes = require('./routes');
const passport = require('passport');
const cors = require('cors');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;

/*
* Init express and get port
*/
const port = process.env.PORT || 8080
const app = express();

/*
* Run setup for express including middleware and routing
*/
// Get JSON from body middleware
app.use(bodyParser.json());

/*
* Setup for passport
*/
app.use(passport.initialize())
   .use(session({
        secret: "secret",
        resave: false,
        saveUninitialized: true
    }))
    .use(passport.initialize())
    .use(passport.session())
   .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "POST, GET, PUT, PATCH, OPTIONS, DELETE"
    );
    next();
   })
   .use(cors({ methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'] }))
   .use(cors({ origin: '*' }))
   .use("/", routes);

passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL
    },
    function(accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

app.get('/', (req, res) => { res.send(req.session.user != undefined ? `Logged in as ${req.session.user.displayName}` : 'Logged out')});

app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs', session: false}),
    (res, req) => {
        req.req.session.user = req.req.user;
        res.res.redirect('/');
});

// API Doc Routes
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocument));

/*
* Error handling
*/
// General 404
app.use((req, res, next) => {
    next(createError(404, "Not found"))
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    });
});

process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

/*
* Connect to MongoDB, on success open the server on port
*/
mongodb.initDb((err, mongodb) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log(`Connected to DB and listening on ${port}`);
    }
});