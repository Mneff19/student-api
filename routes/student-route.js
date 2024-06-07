const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student-controller');
const studentValidation = require('../validation/student-validation');

// GET Routes
router.get('/', studentController.getAll );
router.get('/:id', studentController.getSingle );

// POST Routes
router.post('/', studentValidation.studentRules(), studentValidation.checkStudentData, studentController.createNewStudent );

// PUT Routes
router.put('/:id', studentValidation.studentRules(), studentValidation.checkStudentData, studentController.updateStudent );

// DELETE Routes
router.delete('/:id', studentController.deleteStudent );

module.exports = router;