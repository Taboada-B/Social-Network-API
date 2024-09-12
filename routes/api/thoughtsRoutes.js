const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/')
  .get(getAllThoughts)  // works
  .post(createThought); // works
  // example body
  //"thoughtText": "Hopefully this works",
// "username": "john",
// "userId": "66e25d2c9bae8781c6ca3ee9"

// /api/thoughts/:id
router.route('/:id')
  .get(getThoughtById) // works
  .put(updateThought) // works 
  .delete(deleteThought); // works

//example body for put
 // {
// "thoughtText": "Hopefully this updates",
// "username": "john",
// 	"userId": "66e25d2c9bae8781c6ca3ee9"
// }

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
  .post(addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
  .delete(removeReaction);

module.exports = router;
