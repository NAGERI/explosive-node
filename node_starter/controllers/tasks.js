const tasksModel = require('../models/tasks')
const getAllTasks = async (req,res) => {
  try {
    const tasks = await tasksModel.find({})
    res.status(200).json({ tasks })
  } catch (error) {
    res.status(500).json({ msg: error})
  }
}

const createTask = async (req,res) => {
  try {
       const task = await tasksModel.create(req.body)
        res.status(200).json({ task })
     } catch (error) {
       res.status(500).json({ msg: error})
  }
}

const getTask = async (req,res) => {
  try {
    const {id:taskId} = req.params
    const task = await tasksModel.findOne({_id: taskId})
    if (!task) {
      return res.status(404).json({msg:  `No Task with ID ${taskId}`})
    }
    res.status(200).json({ task })
  } catch (error) {
    res.status(500).json({ msg: error})
  }
}

const updateTask = (req,res) => {
    res.send('Update a Task')
}

const deleteTask = (req,res) => {
    res.send('Delete a Task')
}
module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask
}