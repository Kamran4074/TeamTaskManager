import api from './api';

export const authService = {
  signup: async (name, email, password, employeeId, role = 'member') => {
    const response = await api.post('/auth/signup', { name, email, password, employeeId, role });
    return response.data;
  },

  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};
