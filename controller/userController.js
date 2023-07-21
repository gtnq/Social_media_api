const { User, Thought } = require("../models");

//get all user

async function getAllUser(req, res) {
    try {
        const user = await User.find({})
            .populate("friends")
            .populate("thoughts")
            .select("-__v");

        res.json(user);
    } catch (error) {
        res.json(error);
    }
}

async function getUserById(req, res) {
    try {
        const user = await User.findById({ _id: req.params.id })
            .populate("friends")
            .populate("thoughts")
            .select("-__v");

        res.json(user);

        if (!user) {
            res.status(404).json({ message: "No user found with this id" });
        }
    } catch (error) {
        res.json(error);
    }
}

async function createUser(req, res) {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (error) {
        res.json(error);
    }
}

//update user by id

async function updateUserById(req, res) {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );
        if (!user) {
            res.status(404).json({ message: "No user found with this id" });
        }
        res.json(user);
    } catch (error) {
        res.json(error);
    }
}

//delete user by id

async function deleteUserById(req, res) {
    try {
        //check if people who friend with this user, delete this user from their friend list

        const user = await User.findOneAndDelete({ _id: req.params.id });
        if (!user) {
            res.status(404).json({ message: "No user found with this id" });
        } else {
            Thought.deleteMany({ _id: { $in: user.thoughts } });
			User.findOneAndUpdate(
				{ friends: req.params.id },
				{ friends: [] },
				{ new: true, runValidators: true }
			)
        }
        res.json(user);
    } catch (error) {
        res.json(error);
    }
}

async function deleteFriend(req, res) {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.id },
            { $pull: { friends: req.body.friends } },
			{ new: true, runValidators: true }
        );

        if (!user) {
            res.status(404).json({ message: "no user found" });
        } else {
            res.json(user);
        }
    } catch (error) {
        res.json(error);
    }
}

async function addFriend(req, res) {
    try {
        const friend = await User.findOne({ _id: req.body.friends });
        if (!friend) {
            res.status(404).json({ message: "target user not found" });
        } else {
            const user = await User.findOneAndUpdate(
                { _id: req.params.id },
                { $addToSet: { friends: req.body.friends } },
                { new: true, runValidators: true }
            );
            if (!user) {
                res.status(404).json({ message: "no user found" });
            } else {
                res.json(user);
            }
        }
    } catch (error) {
        res.json(error);
    }
}

module.exports = {
    getAllUser,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById,
    addFriend,
    deleteFriend,
};
