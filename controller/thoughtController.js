const { User, Thought } = require("../models");

//get all thought

async function getAllThought(req, res) {
	try {
		const user = await Thought.find({}).select("-__v");

		res.json(user);
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
		const thought = await Thought.create(req.body).then(({ _id }) => {
			console.log(_id);
			const user = User.findOneAndUpdate(
				{ _id: req.body.username },
				{ $addToSet: { thoughts: _id } },
				{ new: true }
			);
			if (!user) {
				res.status(404).json({
					message: "No user found with this id",
				});
				return;
			} else {
				res.json(user);
			}
		});
		console.log("everythingadded");
		if (!thought) {
			res.status(404).json({ message: "No thought found with this id" });
			return;
		} else {
			res.json(thought);
		}
	} catch (error) {
		res.status(404).json(error);
	}
}

async function deleteThought(req, res) {
	try {
		const thought = await Thought.findOneAndDelete({ _id: req.body.id });
		const user = User.findOneAndUpdate(
			{ _id: req.body.userId },
			{ $pull: { thoughts: req.body.id } },
			{ new: true }
		);

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
			{ _id: req.body.id },
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
			{ _id: req.body.id },
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
			{ _id: req.body.id },
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
