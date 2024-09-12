const { User, Thought } = require('../models/index');

const userController = {
    // Get all users
    async getAllUsers(req, res) {
        try {
            const users = await User.find({}).select('-__v');
            res.json(users);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },

    // Get a single user by ID // not working right now
    async getUserById(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.id })
                                   .populate('thoughts')
                                   .populate('friends');
            console.log('user: ', user)
            if (!user) {
                console.log('user: ', user)
                return res.status(404).json({ message: 'No user found with this ID!' });
                
            }

            res.json(user);
        } catch (err) {
            console.error(err);
            console.log('here is the error')
            res.status(500).json(err);
        }
    },

    // Create a new user
    async createUser(req, res) {
        try {
            const newUser = await User.create(req.body);
            res.json(newUser);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    // Update a user by ID
    async updateUser(req, res) {
        try {
            const updatedUser = await User.findOneAndUpdate(
                { _id: req.params.id },
                req.body,
                { new: true, runValidators: true }
            );

            if (!updatedUser) {
                return res.status(404).json({ message: 'No user found with this ID!' });
            }

            res.json(updatedUser);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    // Delete a user and associated thoughts
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.id });

            if (!user) {
                return res.status(404).json({ message: 'No user found with this ID!' });
            }

            await Thought.deleteMany({ _id: { $in: user.thoughts } });
            res.json({ message: 'User and associated thoughts deleted!' });
        } catch (err) {
            res.status(400).json(err);
        }
    },

    // Add a friend to a user's friend list
    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'No user found with this ID!' });
            }

            res.json(user);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    // Remove a friend from a user's friend list
    async removeFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'No user found with this ID!' });
            }

            res.json(user);
        } catch (err) {
            res.status(400).json(err);
        }
    },
};

module.exports = userController;
