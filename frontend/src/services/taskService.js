import api from './api';

export const taskService = {
  createTask: async (taskData) => {
    const response = await api.post('/tasks', taskData);
    return response.data;
  },

  getTask: async (taskId) => {
    const response = await api.get(`/tasks/${taskId}`);
    return response.data;
  },

  getMyTasks: async () => {
    const response = await api.get('/tasks/my-tasks');
    return response.data;
  },

  getAllTasks: async () => {
    const response = await api.get('/tasks/all-tasks');
    return response.data;
  },

  getProjectTasks: async (projectId) => {
    const response = await api.get(`/tasks/project/${projectId}`);
    return response.data;
  },

  updateTask: async (taskId, updateData) => {
    const response = await api.put(`/tasks/${taskId}`, updateData);
    return response.data;
  },

  deleteTask: async (taskId) => {
    const response = await api.delete(`/tasks/${taskId}`);
    return response.data;
  },

  getOverdueTasks: async (projectId) => {
    const response = await api.get(`/tasks/project/${projectId}/overdue`);
    return response.data;
  },

  getTaskStats: async (projectId) => {
    const response = await api.get(`/tasks/project/${projectId}/stats`);
    return response.data;
  },
};
