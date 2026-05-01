import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const clearError = () => setError(null);

  return (
    <AppContext.Provider
      value={{
        projects,
        setProjects,
        tasks,
        setTasks,
        currentProject,
        setCurrentProject,
        loading,
        setLoading,
        error,
        setError,
        clearError,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
