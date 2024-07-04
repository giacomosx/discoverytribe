const Milestone = require("../models/Milestone");
const Trip = require("../models/Trip");

const createMilestone = async (req, res, next) => {
    try {
        const milestone = new Milestone({
            ...req.body,
            userId: req.user.userId,
        })
        await milestone.save();
        const trip = await Trip.findById(milestone.rel_trip)
        trip.milestones.push(milestone._id);
        await trip.save()

        res.status(201).json({message: "success", milestone});
    } catch (e) {
        console.log(e)
        next({statusCode: 400, message: e.message})
    }
}

const editMilestone = async (req, res, next) => {
    const {id} = req.params
    try {
        if (!id) return res.status(400).send({message: "No id found"})

        const milestone = await Milestone.findById(id)

        if (String(milestone.userId) !== req.user.userId) return res.status(401).json({message: "Unauthorized to edit"})

        const editedMilestone = await Milestone.findByIdAndUpdate(id, req.body, {new: true})

        res.status(201).json({message: "success", editedMilestone});
    } catch (e) {
        console.log(e)
        next({statusCode: 400, message: e.message})
    }
}

const deleteMilestone = async (req, res, next) => {
    const {id} = req.params
    try {
        if (!id) return res.status(400).send({message: "No id found"})

        const milestone = await Milestone.findById(id)

        if (String(milestone.userId) !== req.user.userId) return res.status(401).json({message: "Unauthorized to delete"})

        const trip = await Trip.findById(milestone.rel_trip)
        trip.milestones.pull(milestone._id);
        await trip.save()

        const deleteMilestone = await Milestone.findByIdAndDelete(id)

        res.status(201).json({message: "success delete", deleteMilestone});
    } catch (e) {
        console.log(e)
        next({statusCode: 400, message: e})
    }
}

const getMilestoneById = async (req, res, next) => {
    const {id} = req.params

    try {
        if (!id) return res.status(400).send({message: "No id found"})

        const milestone = await Milestone.findById(id)

        res.status(200).json(milestone)

    } catch (e) {
        console.error(e)
        next({statusCode: 400, message: e.message})
    }
}


module.exports = {
    createMilestone,
    editMilestone,
    deleteMilestone,
    getMilestoneById
};