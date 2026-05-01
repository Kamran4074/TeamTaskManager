import express from 'express';
import {
  createTask,
  getTask,
  getProjectTasks,
  getMyTasks,
  getAllTasks,
  updateTask,
  deleteTask,
  getOverdueTasks,
  getTaskStats,
} from '../controllers/taskController.js';
import { protect } from '../middleware/authMiddleware.js';
import { checkProjectAccess, checkProjectAdmin } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Protect all routes
router.use(protect);

// Task CRUD
router.post('/', createTask);
router.get('/all-tasks', getAllTasks);
router.get('/my-tasks', getMyTasks);
router.get('/:taskId', getTask);
router.put('/:taskId', updateTask);
router.delete('/:taskId', deleteTask);

// Project tasks
router.get('/project/:projectId', checkProjectAccess, getProjectTasks);
router.get('/project/:projectId/overdue', checkProjectAccess, getOverdueTasks);
router.get('/project/:projectId/stats', checkProjectAccess, getTaskStats);

export default router;
