const express = require('express');
const router = express.Router();
const studentRoutes = require("./student-route");
const classRoutes = require("./class-route");
const passport = require('passport');

// Establish student API route
// router.get("/", (req, res) => { res.send('Welcome to the Student API!<br><br>Head to /students or /classes to see the data live<br><br>/api-docs has all the Swagger docs')} );
router.use("/students", studentRoutes);
router.use("/classes", classRoutes);

// Establish login/logout route
router.get('/login', passport.authenticate('github'), (req, res) => {});
router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err) }
        res.redirect('/');
    })
});

module.exports = router;