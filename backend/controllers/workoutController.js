const Workouts = require('../models/workoutModel'); 
const mongoose = require('mongoose');

//get all workouts
const getWorkouts = async (req, res) => {
    const workouts = await Workouts.find({}).sort({createdAt: -1});
    res.status(200).json(workouts);
};

//get a single workout
const getWorkout = async (req, res) => {
    
    const {id} = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'});
    }

    const workout = await Workouts.findById(id);
    if(!workout){
        return res.status(404).json({error: 'No such workout'});
    }
    res.status(200).json(workout);
}

// create a new workout
const createWorkout = async(req, res) => {
    const{title,load,reps} = req.body;

    let emptyFields = [];

    if(!title){
        emptyFields.push('title');
    }
    if(!load){
        emptyFields.push('load');
    }
    if(!reps){
        emptyFields.push('reps');
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields});
    }
        try{
            const workout = new Workouts({title,load,reps});
            const savedWorkout = await workout.save();
            res.status(200).json(workout);
        }catch(error){
           res.status(400).json({error: error.message});
        }
}

//delete a workout
const deleteWorkout = async(req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'});
    }
    const workout = await Workouts.findOneAndDelete({_id: id});
    if(!workout){
        return res.status(404).json({error: 'No such workout'});
    }
    res.status(200).json(workout);
}

//update a workout
const updateWorkout = async(req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'});
    }
    const workout = await Workouts.findOneAndUpdate({_id: id}, {
        ...req.body
    });
    if(!workout){
        return res.status(404).json({error: 'No such workout'});
    }
    res.status(200).json(workout);
}

//update two workouts

module.exports ={
    createWorkout,
    getWorkout,
    getWorkouts,
    deleteWorkout,
    updateWorkout,
};