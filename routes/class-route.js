const express = require('express');
const router = express.Router();
const classController = require('../controllers/class-controller');
const classValidation = require('../validation/class-validation');

// GET Routes
router.get('/', classController.getAll );
router.get('/:id', classController.getSingle );

// POST Routes
router.post('/', classValidation.classRules(), classValidation.checkClassData, classController.createNewClass );

// PUT Routes
router.put('/:id', classValidation.classRules(), classValidation.checkClassData, classController.updateClass );

// DELETE Routes
router.delete('/:id', classController.deleteClass );

module.exports = router;