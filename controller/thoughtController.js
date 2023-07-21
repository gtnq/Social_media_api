const { User, Thought } = require("../models");

//get all thought

async function getAllThought(req, res) {
	try {
		const thought = await Thought.find({})
			//.populate("reaction")
			.select("-__v");

		res.json(thought);
	} catch (error) {
		res.json(error);
	}
}
async function getThoughtById(req, res) {
	try {
		const thought = await Thought.findById({ _id: req.params.id }).select(
			"-__v"
		);
		res.json(thought);
		if (!thought) {
			res.status(404).json({ message: "No thought found with this id" });
		}
	} catch (error) {
		res.json(error);
	}
}

async function createThought(req, res) {
	try {
		const thought = await Thought.create(req.body)
            .then(({ _id }) => {
                const user = User.findOneAndUpdate(
                    { _id: req.body.username },
                    { $addToSet: { thoughts: _id } },
                    { new: true }
                    );
                if (!user) {
                    res.status(404).json({ message: 'No User found with this id! first error' });
                    return;
                }
                return user;
                    
    })
        if (!thought) {
            res.status(404).json({ message: 'Thought creation failed' });
            return;
        }
        res.json(thought)
	} catch (error) {
		res.status(404).json(error);
	}
}

async function deleteThought(req, res) {
	try {
		const thought = await Thought.findOneAndDelete({ _id: req.params.id });
		const user = User.findOneAndUpdate(
			{ _id: thought.username},
			{ $pull: { thoughts: req.params.id } },
			{ new: true }
		);
        console.log(thought.username)

		if (!user) {
			res.status(404).json({ message: "No user found with this id" });
			return;
		}
		if (!thought) {
			res.status(400).json({ message: "no thought found" });
			return;
		}
		res.json(thought);
	} catch (error) {
		res.json(error);
	}
}

async function updateThought(req, res) {
	try {
		const thought = await Thought.findOneAndUpdate(
			{ _id: req.params.id },
			req.body,
			{ new: true, runValidators: true }
		);

		if (!thought) {
			res.status(400).json({ message: "no thought found" });
		}
		res.json(thought);
	} catch (error) {
		res.json(error);
	}
}

async function addReaction(req, res) {
	try {
		const reaction = await Thought.findOneAndUpdate(
			{ _id: req.params.id },
			{ $push: { reactions: req.body } },
			{ new: true, runValidators: true }
		);
		if (!reaction) {
			res.status(400).json({ message: "no reaction found" });
			console.log("no reaction found");
		}
		res.json(reaction);
	} catch (error) {
		res.json(error);
	}
}

async function deleteReaction(req, res) {
	try {
		const reaction = await Thought.findOneAndUpdate(
			{ _id: req.params.id },
			{ $pull: { reactions: { reactionId: req.body.reactionId } } },
			{ new: true, runValidators: true }
		);
		if (!reaction) {
			res.status(400).json({ message: "no reaction found" });
		}
		res.json(reaction);
	} catch (error) {
		res.json(error);
	}
}

module.exports = {
	getAllThought,
	getThoughtById,
	createThought,
	updateThought,
	deleteThought,
	addReaction,
	deleteReaction,
};
