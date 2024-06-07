const { body, validationResult } = require("express-validator")
const validate = {}

/*  **********************************
*  Student Data Validation Rules
* ********************************* */
validate.studentRules = () => {
    return [
        body("firstName")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 1 })
        .withMessage("Please provide a first name at least 5 letters long."), // on error this message is sent.

        body("lastName")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 1 })
        .withMessage("Please provide a last name at least 5 letters long."), // on error this message is sent.

        body("gpa")
        .notEmpty()
        .isFloat()
        .withMessage("Please provide a valid gpa."), // on error this message is sent.

        body("credits")
        .notEmpty()
        .isInt()
        .withMessage("Please provide a valid credit amounts."), // on error this message is sent.

        body("onCampusHousing")
        .notEmpty()
        .isBoolean()
        .withMessage("Please provide a valid on campus housing boolean."), // on error this message is sent.

        body("clubs.*")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 1 })
        .withMessage("Please provide a valid club string."), // on error this message is sent.

        body("privateInsurance")
        .notEmpty()
        .isBoolean()
        .withMessage("Please provide a valid private insurance boolean."), // on error this message is sent.
    ]
}

/* ******************************
* Check data and return errors or continue to add student
* ***************************** */
validate.checkStudentData = async (req, res, next) => {
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