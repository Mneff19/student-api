const express = require('express');
const router = express.Router();
const classController = require('../controllers/class-controller');
const classValidation = require('../validation/class-validation');
const { isAuthenticated } = require('../middleware/authenticate');

// GET Routes
router.get('/', classController.getAll );
router.get('/:id', classController.getSingle );

// POST Routes
router.post('/', isAuthenticated, classValidation.classRules(), classValidation.checkClassData, classController.createNewClass );

// PUT Routes
router.put('/:id', isAuthenticated, classValidation.classRules(), classValidation.checkClassData, classController.updateClass );

// DELETE Routes
router.delete('/:id', isAuthenticated, classController.deleteClass );

module.exports = router;