const express = require('express');
const milestone = express.Router();
const controller = require('../controllers/milestoneController');

milestone.route('/:id').get(controller.getMilestoneById)

milestone.route('/create').post(controller.createMilestone)

milestone.route('/:id/edit').patch(controller.editMilestone)

milestone.route('/:id/delete').delete(controller.deleteMilestone)

module.exports = milestone