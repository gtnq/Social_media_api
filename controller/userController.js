const {User} = require('../models');

//get all user

async function getAllUser(req,res){
    try {
        const user = await User.find({})
        .populate({path:'thoughts', select: '-__v'})
        res.json(user)
    } catch (error) {
        res.json(error)
    }
}

async function getUserById(req,res){
    try {
        const user = await User.findById(req.params.id)
        res.json(user)
        
        if (!user){
            res.status(404).json({message:'No user found with this id'})
        }

    } catch (error) {
        res.json(error)
    }
}

async function createUser(req,res){
    try {
        const user = await User.create(req.body)
        res.json(user)
    } catch (error) {
        res.json(error)
    }
}

module.exports = {getAllUser,getUserById,createUser}