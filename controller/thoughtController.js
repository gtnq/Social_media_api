const {User,Thought} = require('../models');

//get all thought

async function getAllThought(req,res){
    try {
        const thought = await Thought.find()
        res.json(thought)
    } catch (error) {
        res.json(error)
    }
}

async function getThoughtById(req,res){
    try {
        const thought = await Thought.findById({_id : req.params.id}).select('-__v')
        res.json(thought)
        
        if (!thought){
            res.status(404).json({message:'No thought found with this id'})
        }

    } catch (error) {
        res.json(error)
    }
}


async function createThought(req,res){
    try {
        const thought = await Thought.create(req.body)


        res.json(thought)
    } catch (error) {
        res.json(error)
    }
}

module.exports = {  getAllThought, getThoughtById, createThought}
