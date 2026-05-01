import Task from '../models/Task.js';
import User from '../models/User.js';
import { validateTaskData } from '../utils/validators.js';

export const createTask = async (taskData, userId) => {
  // Validate data
  const errors = validateTaskData(taskData);
  if (errors.length > 0) {
    throw new Error(errors.join(', '));
  }

  // Create task
  const task = await Task.create({
    ...taskData,
    createdBy: userId,
  });

  return task;
};

export const getTaskById = async (taskId) => {
  const task = await Task.findById(taskId)
    .populate('project', 'name')
    .populate('createdBy', 'name email');

  if (!task) {
    throw new Error('Task not found');
  }

  return task;
};

export const getProjectTasks = async (projectId) => {
  const tasks = await Task.find({ project: projectId })
    .populate('createdBy', 'name email')
    .sort({ createdAt: -1 });

  return tasks;
};

export const getUserTasks = async (userId) => {
  const user = await User.findById(userId);
  
  if (!user) {
    throw new Error('User not found');
  }

  const tasks = await Task.find({
    assignedToId: user.employeeId
  })
    .populate('project', 'name')
    .populate('createdBy', 'name email')
    .sort({ dueDate: 1 });

  return tasks;
};

export const updateTask = async (taskId, updateData) => {
  const task = await Task.findByIdAndUpdate(taskId, updateData, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    throw new Error('Task not found');
  }

  return task;
};

export const deleteTask = async (taskId) => {
  const task = await Task.findByIdAndDelete(taskId);

  if (!task) {
    throw new Error('Task not found');
  }

  return task;
};

export const getOverdueTasks = async (projectId) => {
  const tasks = await Task.find({
    project: projectId,
    status: { $ne: 'completed' },
    dueDate: { $lt: new Date() },
  })
    .sort({ dueDate: 1 });

  return tasks;
};

export const getTaskStats = async (projectId) => {
  const stats = await Task.aggregate([
    { $match: { project: projectId } },
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
      },
    },
  ]);

  return stats;
};

export const getAllTasks = async () => {
  const tasks = await Task.find()
    .populate('project', 'name')
    .populate('createdBy', 'name email')
    .sort({ createdAt: -1 });

  return tasks;
};
