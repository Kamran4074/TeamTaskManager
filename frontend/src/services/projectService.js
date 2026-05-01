import api from './api';

export const projectService = {
  createProject: async (projectData) => {
    const response = await api.post('/projects', projectData);
    return response.data;
  },

  getProject: async (projectId) => {
    const response = await api.get(`/projects/${projectId}`);
    return response.data;
  },

  getMyProjects: async () => {
    const response = await api.get('/projects/my-projects');
    return response.data;
  },

  getAllProjects: async () => {
    const response = await api.get('/projects/all-projects');
    return response.data;
  },

  getProjectMembers: async (projectId) => {
    const response = await api.get(`/projects/${projectId}/members`);
    return response.data;
  },

  updateProject: async (projectId, updateData) => {
    const response = await api.put(`/projects/${projectId}`, updateData);
    return response.data;
  },

  deleteProject: async (projectId) => {
    const response = await api.delete(`/projects/${projectId}`);
    return response.data;
  },

  addMember: async (projectId, userId, role = 'member') => {
    const response = await api.post(`/projects/${projectId}/members`, { userId, role });
    return response.data;
  },

  removeMember: async (projectId, userId) => {
    const response = await api.delete(`/projects/${projectId}/members/${userId}`);
    return response.data;
  },

  updateMemberRole: async (projectId, userId, role) => {
    const response = await api.put(`/projects/${projectId}/members/${userId}/role`, { role });
    return response.data;
  },
};
