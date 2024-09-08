const User = require('./User')
const Thought = require('./Thought')
const Reaction = require('./Reaction')



module.exports = {User, Thought, Reaction }


// **Schema Settings**:

// Create a virtual called `friendCount` that retrieves the length of the user's `friends` array field on query.

// ---

// **Schema Settings**:

// Create a virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field on query.

 // ---