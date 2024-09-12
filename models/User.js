const { Schema, model } = require('mongoose');
// const thoughtsSchema = require('./Thought');
// const reactionSchema = require('./Reaction');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            max_length: 20,
        },


        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must match a valid email address'],
        },

        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought',  // refering to thought.js:  const Thought = model('thought', thoughtSchema);
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user', // refering to const User = model('user', userSchema);
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;
