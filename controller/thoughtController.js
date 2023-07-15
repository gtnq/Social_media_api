const { User, Thought } = require("../models");

//get all thought

async function getAllThought(req, res) {
    try {
        const thought = await Thought.find();
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

        if (!thought) {
            res.status(404).json({ message: "No thought found with this id" });
        }
        res.json(thought);
    } catch (error) {
        res.json(error);
    }
}

async function createThought(req, res) {
    try {
        const thought = await Thought.create(req.body);

        res.json(thought);
    } catch (error) {
        res.json(error);
    }
}

async function deleteThought(req, res) {
    try {
        const thought = await Thought.findOneAndDelete({ _id: req.param.id });

        if (!thought) {
            res.status(400).json({ message: "no thought found" });
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

module.exports = {
    getAllThought,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
};
