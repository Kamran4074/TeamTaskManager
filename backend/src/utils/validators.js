export const validateEmail = (email) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password && password.length >= 6;
};

export const validateProjectData = (data) => {
  const errors = [];

  if (!data.name || data.name.trim() === '') {
    errors.push('Project name is required');
  }

  if (data.endDate && new Date(data.endDate) < new Date(data.startDate || Date.now())) {
    errors.push('End date must be after start date');
  }

  return errors;
};

export const validateTaskData = (data) => {
  const errors = [];

  if (!data.title || data.title.trim() === '') {
    errors.push('Task title is required');
  }

  if (!data.project) {
    errors.push('Project ID is required');
  }

  if (data.dueDate && new Date(data.dueDate) < new Date()) {
    errors.push('Due date must be in the future');
  }

  return errors;
};
