import * as taskService from '../services/taskService.js';

export const createTask = async (req, res) => {
  try {
    const { title, description, project, assignedToId, priority, dueDate } = req.body;

    const task = await taskService.createTask(
      {
        title,
        description,
        project,
        assignedToId,
        priority,
        dueDate,
      },
      req.user._id
    );

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      task,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await taskService.getTaskById(taskId);

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const getProjectTasks = async (req, res) => {
  try {
    const { projectId } = req.params;

    const tasks = await taskService.getProjectTasks(projectId);

    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllProjectTasks = async (req, res) => {
  try {
    const { projectId } = req.params;

    const tasks = await taskService.getProjectTasks(projectId);

    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyTasks = async (req, res) => {
  try {
    const tasks = await taskService.getUserTasks(req.user._id);

    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks();

    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, description, status, priority, assignedTo, dueDate } = req.body;

    const task = await taskService.updateTask(taskId, {
      title,
      description,
      status,
      priority,
      assignedTo,
      dueDate,
    });

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      task,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    await taskService.deleteTask(taskId);

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const getOverdueTasks = async (req, res) => {
  try {
    const { projectId } = req.params;

    const tasks = await taskService.getOverdueTasks(projectId);

    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getTaskStats = async (req, res) => {
  try {
    const { projectId } = req.params;

    const stats = await taskService.getTaskStats(projectId);

    res.status(200).json({
      success: true,
      stats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
