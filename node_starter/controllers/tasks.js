const Tasks = require('../models/tasks')

const getAllTasks = (req,res) => {
    res.send('All Items from the file')
}

const createTask = async (req,res) => {
  try {
       const task = await Tasks.create(req.body)
        res.status(200).json({ task })
     } catch (error) {
       res.status(500).json({ msg: error})
  }
}

const getTask = (req,res) => {
    res.json({id: req.params.id})
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