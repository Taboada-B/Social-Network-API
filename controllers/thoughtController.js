const { Thought, User } = require('../models');

const thoughtController = {
    // Get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .then((dbThoughtData) => res.json(dbThoughtData))
            .catch((err) => res.status(500).json(err));
    },

    // Get a single thought by ID
    getThoughtById(req, res) {
        Thought.findOne({ _id: req.params.id })
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this ID!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch((err) => res.status(500).json(err));
    },

    // Create a new thought
    createThought(req, res) {
        Thought.create(req.body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then((dbUserData) => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this ID!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch((err) => res.status(500).json(err));
    },

    // Update a thought by ID
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true, runValidators: true }
        )
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this ID!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch((err) => res.status(500).json(err));
    },

    // Delete a thought by ID
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.id })
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this ID!' });
                    return;
                }
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $pull: { thoughts: req.params.id } },
                    { new: true }
                );
            })
            .then((dbUserData) => res.json({ message: 'Thought deleted successfully!' }))
            .catch((err) => res.status(500).json(err));
    },

    // Add a reaction
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { new: true }
        )
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this ID!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch((err) => res.status(500).json(err));
    },

    // Remove a reaction
    removeReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        )
            .then((dbThoughtData) => res.json(dbThoughtData))
            .catch((err) => res.status(500).json(err));
    },
};

module.exports = thoughtController;
