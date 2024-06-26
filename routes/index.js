const express = require('express');
const router = express.Router();
const studentRoutes = require("./student-route");
const classRoutes = require("./class-route");

// Establish student route
router.get("/", (req, res) => { res.send('Welcome to the Student API!<br><br>Head to /students or /classes to see the data live<br><br>/api-docs has all the Swagger docs')} );
router.use("/students", studentRoutes);
router.use("/classes", classRoutes);

module.exports = router;