const Task = require('../models/Task');

const getAllTask = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
const createTask = async (req, res) => {
  const { name, completed } = req.body;
  try {
    const newTask = new Task({ name, completed });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
const getSingleTask = async (req, res) => {
  const { id: taskID } = req.params;
  try {
    const task = await Task.findOne({ _id: taskID });
    if (!task) {
      return res
        .status(404)
        .json({ message: `No task found with the id: ${taskID}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
const updateTask = async (req, res) => {
  const { id: taskID } = req.params;
  try {
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res
        .status(404)
        .json({ message: `No task found with the id: ${taskID}` });
    }
    res.status(200).json({ task, success: true });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
const deleteTask = async (req, res) => {
  const { id: taskID } = req.params;
  try {
    const task = await Task.findOneAndDelete({ _id: taskID });
    if (!task) {
      return res
        .status(404)
        .json({ message: `No task found with the id: ${taskID}` });
    }
    res.status(200).json({
      task,
      message: `task with id: ${taskID} has been successfully updated`,
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

module.exports = {
  getAllTask,
  createTask,
  getSingleTask,
  updateTask,
  deleteTask,
};
