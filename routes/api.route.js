var express = require('express');

var router = express.Router();
var sermonNotes = require('./api/sermon-notes.route');


router.use('/sermon-notes', sermonNotes);


module.exports = router;