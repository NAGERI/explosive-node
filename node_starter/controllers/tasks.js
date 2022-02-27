const asyncWrapper = require('../middleware/async')
const tasksModel = require('../models/tasks')
const {createCustomError } = require('../errors/custom-error')


const getAllTasks = asyncWrapper( async (req,res) => {  
    const tasks = await tasksModel.find({})
    res.status(200).json({ tasks })
  }
)

const createTask = asyncWrapper ( async (req,res) => {
    const task = await tasksModel.create(req.body)
    res.status(200).json({ task })
 }
)

const getTask = asyncWrapper ( async (req,res,next) => {
   const {id:taskId} = req.params
   const task = await tasksModel.findOne({_id: taskId})
   if (!task) {
    return next(createCustomError(  `No Task with ID ${taskId}`,404))
   }
   res.status(200).json({ task })
 }
)

const updateTask = asyncWrapper (  async (req,res,next) => {

  const {id:taskID} = req.params
    const task  = await tasksModel.findOneAndUpdate({_id:taskID},req.body,{
      new: true
      ,runValidators:true
    })
    if(!task){
      return next(createCustomError(  `No Task with ID ${taskId}`,404))
    }
    res.status(200).json({ task })
  }
)

const deleteTask = asyncWrapper ( async (req,res,next) => {
    
    const {id:taskId} = req.params
    const task = await tasksModel.findOneAndDelete({_id: taskId})
    if (!task) {
      return next(createCustomError(`No Task with ID ${taskId}`,404))
    }
    res.status(200).json({ task })
  }
)
module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask
}