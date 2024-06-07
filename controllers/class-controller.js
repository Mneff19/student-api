const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const createError = require('http-errors');

const getAll = async (req, res, next) => {
    //#swagger.tags=['Classes']
    const result = await mongodb.getDb().db().collection('class').find();
    result.toArray().then((classes) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(classes);
    })
}

const getSingle = async (req, res, next) => {
    //#swagger.tags=['Classes']
    if(!ObjectId.isValid(req.params.id)) {
        next(createError(400, 'Must use a valid class id to find a contact.'));
        return;
    }
    const userId =  new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('class').find({ _id: userId});
    result.toArray().then((classes) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(classes[0]);
    })
}

const createNewClass = async (req, res, next) => {
    //#swagger.tags=['Classes']
    const newClass = {
        "className": req.body.className,
        "topic": req.body.topic,
        "studentsEnrolled": req.body.studentsEnrolled,
        "credits": req.body.credits
    };
    const response = await mongodb.getDb().db().collection('class').insertOne(newClass);

    if(response.hasOwnProperty("insertedId")) {
        res.status(201).json(response.insertedId);
    } else {
        next(createError(500, response.error || "An error occurred creating a new class."));
    }
}

const updateClass = async (req, res, next) => {
    //#swagger.tags=['Classes']
    const updatedClass = {
        "className": req.body.className,
        "topic": req.body.topic,
        "studentsEnrolled": req.body.studentsEnrolled,
        "credits": req.body.credits
    };
    const userId =  new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('class').replaceOne( { _id: userId }, updatedClass );

    if(response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        next(createError(500, response.error || "An error occurred updating the class."));
    }
}

const deleteClass = async (req, res, next) => {
    //#swagger.tags=['Classes']
    if(!ObjectId.isValid(req.params.id)) {
        next(createError(400, 'Must use a valid class id to delete a contact.'));
        return;
    }
    const userId =  new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('class').deleteOne({ _id: userId });

    if(response.deletedCount > 0) {
        res.status(204).send();
    } else {
        next(createError(500, response.error || "An error occurred deleting the class."));
    }
}

module.exports = { getAll, getSingle, createNewClass, updateClass, deleteClass };