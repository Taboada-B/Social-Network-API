const router = require('express').Router();
const users = require('./users'); 
const thoughts = require('./thoughts'); 
const reactions = require('./reactions'); 

// /api/
router.use('/users', users);
router.use('/thoughts', thoughts);
router.use('/reactions', reactions);


module.exports = router;
