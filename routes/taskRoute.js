const express = require('express');
const router = express.Router();

const {
  getAllTask,
  getSingleTask,
  updateTask,
  deleteTask,
  createTask,
} = require('../controllers/taskController');

router.route('/').get(getAllTask).post(createTask);
router.route('/:id').get(getSingleTask).delete(deleteTask).patch(updateTask);

module.exports = router;
