import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../../hooks/useAuth';
import { Header } from '../../components/common/Header';
import { projectService } from '../../services/projectService';
import { taskService } from '../../services/taskService';
import { CheckCircle, Circle, Clock, ListTodo } from 'lucide-react';
import './Dashboard.css';

export const Dashboard = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({ total: 0, completed: 0, inProgress: 0, todo: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const projectsRes = await projectService.getMyProjects();
      setProjects(projectsRes.projects || []);

      let tasksRes;
      if (user?.role === 'admin') {
        // Admin sees all tasks
        tasksRes = await taskService.getAllTasks();
      } else {
        // Members see only their tasks
        tasksRes = await taskService.getMyTasks();
      }
      setTasks(tasksRes.tasks || []);

      // Calculate stats
      const taskList = tasksRes.tasks || [];
      const statsData = {
        total: taskList.length,
        completed: taskList.filter((t) => t.status === 'completed').length,
        inProgress: taskList.filter((t) => t.status === 'in-progress').length,
        todo: taskList.filter((t) => t.status === 'todo').length,
      };
      setStats(statsData);
    } catch (error) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={16} />;
      case 'in-progress':
        return <Clock size={16} />;
      case 'todo':
        return <Circle size={16} />;
      default:
        return <ListTodo size={16} />;
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="dashboard-loading">Loading dashboard...</div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="dashboard">
        <div className="dashboard-header">
          <h1>Welcome, {user?.name}!</h1>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-header">
              <h3>Total Tasks</h3>
              <ListTodo size={20} className="stat-icon" />
            </div>
            <p className="stat-number">{stats.total}</p>
          </div>
          <div className="stat-card">
            <div className="stat-header">
              <h3>To Do</h3>
              <Circle size={20} className="stat-icon" />
            </div>
            <p className="stat-number">{stats.todo}</p>
          </div>
          <div className="stat-card">
            <div className="stat-header">
              <h3>In Progress</h3>
              <Clock size={20} className="stat-icon" />
            </div>
            <p className="stat-number">{stats.inProgress}</p>
          </div>
          <div className="stat-card">
            <div className="stat-header">
              <h3>Completed</h3>
              <CheckCircle size={20} className="stat-icon" />
            </div>
            <p className="stat-number">{stats.completed}</p>
          </div>
        </div>

        <div className="dashboard-content">
          <div className="section">
            <h2>My Projects ({projects.length})</h2>
            {projects.length === 0 ? (
              <p className="empty-state">No projects yet. Create one to get started!</p>
            ) : (
              <div className="projects-list">
                {projects.map((project) => (
                  <div key={project._id} className="project-item">
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                    <div className="project-meta">
                      <span className="status">{project.status}</span>
                      <span className="members">{project.members?.length || 0} members</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="section">
            <h2>{user?.role === 'admin' ? 'All Tasks' : 'My Tasks'} ({tasks.length})</h2>
            {tasks.length === 0 ? (
              <p className="empty-state">{user?.role === 'admin' ? 'No tasks in the system.' : 'No tasks assigned to you.'}</p>
            ) : (
              <div className="tasks-list">
                {tasks.slice(0, 5).map((task) => (
                  <div key={task._id} className="task-item">
                    <div className="task-header">
                      <div className="task-title-section">
                        {getStatusIcon(task.status)}
                        <h4>{task.title}</h4>
                      </div>
                      <span className={`priority priority-${task.priority}`}>{task.priority}</span>
                    </div>
                    <p className="task-project">{task.project?.name}</p>
                    <div className="task-footer">
                      <span className={`status status-${task.status}`}>{task.status}</span>
                      {task.dueDate && (
                        <span className="due-date">
                          Due: {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
