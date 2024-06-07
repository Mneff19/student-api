const { body, validationResult } = require("express-validator")
const validate = {}

/*  **********************************
*  Class Data Validation Rules
* ********************************* */
validate.classRules = () => {
    return [
        body("className")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 1 })
        .withMessage("Please provide a class name at least 1 letter long."), // on error this message is sent.

        body("topic")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 1 })
        .withMessage("Please provide a topic at least 1 letter long."), // on error this message is sent.

        body("studentsEnrolled")
        .notEmpty()
        .isInt()
        .withMessage("Please provide a valid number of students enrolled."), // on error this message is sent.

        body("credits")
        .notEmpty()
        .isInt()
        .withMessage("Please provide a valid credit amount."), // on error this message is sent.
    ]
}

/* ******************************
* Check data and return errors or continue to add student
* ***************************** */
validate.checkClassData = async (req, res, next) => {
    let errors = [];
    errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(412).send({
            success: false,
            message: 'Validation failed',
            data: errors
        })
        return;
    }
    
    next();
}

module.exports = validate