/*jshint esversion: 8 */
// Accessing the Service that we just created
var SermonNoteService = require('../services/sermon-note.service');

// Saving the context of this module inside the _the variable
_this = this;


// Async Controller function to get the To do List
exports.getSermonNotes = async function(req, res, next) {

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1;
    var limit = req.query.limit ? req.query.limit : 10;

    try {

        var sermonNotes = await SermonNoteService.getSermonNotes({}, page, limit);

        // Return the Sermon Notes list with the appropriate HTTP Status Code and Message.
        return res.status(200).json({ status: 200, data: sermonNotes, message: "Succesfully Recieved Sermon Notes" });

    } catch (e) {

        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({ status: 400, message: e.message });

    }
};

exports.createSermonNote = async function(req, res, next) {

    // Req.Body contains the form submit values.
    var sermonNote = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status
    };

    try {

        // Calling the Service function with the new object from the Request Body
        var createdSermonNote = await SermonNoteService.createSermonNote(sermonNote);
        return res.status(201).json({ status: 201, data: createdSermonNote, message: "Succesfully Created Sermon Note" });

    } catch (e) {

        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({ status: 400, message: "Sermon Note Creation was Unsuccesfull" });

    }
};

exports.updateSermonNote = async function(req, res, next) {

    // Id is necessary for the update
    if (!req.body._id) {
        return res.status(400).json({ status: 400, message: "Id must be present" });
    }

    var id = req.body._id;

    console.log(req.body);

    var sermonNote = {
        id,
        title: req.body.title ? req.body.title : null,
        description: req.body.description ? req.body.description : null,
        status: req.body.status ? req.body.status : null
    };

    try {
        var updatedSermonNote = await SermonNoteService.updateSermonNote(sermonNote);
        return res.status(200).json({ status: 200, data: updatedSermonNote, message: "Succesfully Updated Sermon Note" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

exports.removeSermonNote = async function(req, res, next) {

    var id = req.params.id;

    try {
        var deleted = await SermonNoteService.deleteSermonNote(id);
        return res.status(204).json({ status: 204, message: "Succesfully Deleted Sermon Note" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }

};