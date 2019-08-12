/*jshint esversion: 8 */

var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');


var SermonNoteSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: Date,
    status: String
});

SermonNoteSchema.plugin(mongoosePaginate);

const SermonNote = mongoose.model('SermonNote', SermonNoteSchema);

module.exports = SermonNote;