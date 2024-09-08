const router = require('express').Router();
const courseRoutes = require('./courseRoutes'); // add endpoint
const studentRoutes = require('./studentRoutes'); // add endpoint

// router.use('/courses', courseRoutes);
// router.use('/students', studentRoutes);

module.exports = router;
