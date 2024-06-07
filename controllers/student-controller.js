const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const createError = require('http-errors');

const getAll = async (req, res, next) => {
    //#swagger.tags=['Students']
    const result = await mongodb.getDb().db().collection('student').find();
    result.toArray().then((students) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(students);
    })
}

const getSingle = async (req, res, next) => {
    //#swagger.tags=['Students']
    if(!ObjectId.isValid(req.params.id)) {
        next(createError(400, 'Must use a valid student id to find a contact.'));
        return;
    }
    const userId =  new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('student').find({ _id: userId});
    result.toArray().then((students) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(students[0]);
    })
}

const createNewStudent = async (req, res, next) => {
    //#swagger.tags=['Students']
    const newStudent = {
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
        "gpa": req.body.gpa,
        "credits": req.body.credits,
        "onCampusHousing": req.body.onCampusHousing,
        "clubs": req.body.clubs,
        "privateInsurance": req.body.privateInsurance
    };
    const response = await mongodb.getDb().db().collection('student').insertOne(newStudent);

    if(response.hasOwnProperty("insertedId")) {
        res.status(201).json(response.insertedId);
    } else {
        next(createError(500, response.error || "An error occurred creating a new student."));
    }
}

const updateStudent = async (req, res, next) => {
    //#swagger.tags=['Students']
    const updatedStudent = {
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
        "gpa": req.body.gpa,
        "credits": req.body.credits,
        "onCampusHousing": req.body.onCampusHousing,
        "clubs": req.body.clubs,
        "privateInsurance": req.body.privateInsurance
    };
    const userId =  new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('student').replaceOne( { _id: userId }, updatedStudent );

    if(response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        next(createError(500, response.error || "An error occurred updating the student."));
    }
}

const deleteStudent = async (req, res, next) => {
    //#swagger.tags=['Students']
    if(!ObjectId.isValid(req.params.id)) {
        next(createError(400, 'Must use a valid student id to delete a contact.'));
        return;
    }
    const userId =  new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('student').deleteOne({ _id: userId });

    if(response.deletedCount > 0) {
        res.status(204).send();
    } else {
        next(createError(500, response.error || "An error occurred deleting the student."));
    }
}

module.exports = { getAll, getSingle, createNewStudent, updateStudent, deleteStudent };