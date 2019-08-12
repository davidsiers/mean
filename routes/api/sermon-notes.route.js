var express = require('express');

var router = express.Router();

// Getting the Sermon Note Controller that we just created
var sermonNoteController = require('../../controllers/sermon-note.controller');


// Map each API to the Controller Functions
router.get('/', sermonNoteController.getSermonNotes);

router.post('/', sermonNoteController.createSermonNote);

router.put('/', sermonNoteController.updateSermonNote);

router.delete('/:id', sermonNoteController.removeSermonNote);


// Export the Router
module.exports = router;