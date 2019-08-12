/*jshint esversion: 8 */

// Gettign the Newly created Mongoose Model we just created 
var SermonNote = require('../models/sermon-note.model');

// Saving the context of this module inside the _the variable
_this = this;

// Async function to get the Sermon Note List
exports.getSermonNotes = async function(query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    };

    // Try Catch the awaited promise to handle the error 
    try {
        var sermonNotes = await SermonNote.paginate(query, options);
        // Return the Sermon Note list that was retured by the mongoose promise
        return sermonNotes;

    } catch (e) {

        // return a Error message describing the reason 
        throw Error('Error while Paginating Sermon Notes');
    }
};

exports.createSermonNote = async function(sermonNote) {

    // Creating a new Mongoose Object by using the new keyword
    var newSermonNote = new SermonNote({
        title: sermonNote.title,
        description: sermonNote.description,
        date: new Date(),
        status: sermonNote.status
    });

    try {

        // Saving the Sermon Note 
        var savedSermonNote = await newSermonNote.save();

        return savedSermonNote;
    } catch (e) {

        // return a Error message describing the reason     
        throw Error("Error while Creating Sermon Note");
    }
};

exports.updateSermonNote = async function(sermonNote) {
    var id = sermonNote.id;

    try {
        //Find the old SermonNote Object by the Id
        var oldSermonNote = await SermonNote.findById(id);

        // If no oldSermonNote Object exists return false
        if (!oldSermonNote) {
            return false;
        }

        console.log(oldSermonNote);

        //Edit the sermonNote Object
        oldSermonNote.title = sermonNote.title;
        oldSermonNote.description = sermonNote.description;
        oldSermonNote.status = sermonNote.status;

        console.log(oldSermonNote);

        try {
            var savedSermonNote = await oldSermonNote.save();
            return savedSermonNote;
        } catch (e) {
            throw Error("And Error occured while updating the Sermon Note");
        }

    } catch (e) {
        throw Error("Error occured while Finding the Sermon Note");
    }

};

exports.deleteSermonNote = async function(id) {

    // Delete the Sermon Note
    try {
        var deleted = await SermonNote.remove({ _id: id });
        if (deleted.result.n === 0) {
            throw Error("Sermon Note Could not be deleted");
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the Sermon Note");
    }
};