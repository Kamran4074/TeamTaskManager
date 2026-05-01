import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../../hooks/useAuth';
import { Header } from '../../components/common/Header';
import { taskService } from '../../services/taskService';
import { projectService } from '../../services/projectService';
import { Plus, Trash2, CheckCircle, Clock, Circle } from 'lucide-react';
import './Tasks.css';

export const TaskList = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    project: '',
    assignedToId: '',
    priority: 'medium',
    dueDate: '',
  });

  useEffect(() => {
    fetchTasks();
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await projectService.getMyProjects();
      setProjects(res.projects || []);
    } catch (error) {
      toast.error('Failed to load projects');
    }
  };

  const fetchTasks = async () => {
    try {
      setLoading(true);
      if (user?.role === 'admin') {
        // Admin sees all tasks
        const res = await taskService.getAllTasks();
        setTasks(res.tasks || []);
      } else {
        // Members see only tasks assigned to them
        const res = await taskService.getMyTasks();
        setTasks(res.tasks || []);
      }
    } catch (error) {
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await taskService.createTask(formData);
      toast.success('Task created successfully!');
      setFormData({
        title: '',
        description: '',
        project: '',
        assignedToId: '',
        priority: 'medium',
        dueDate: '',
      });
      setShowCreateForm(false);
      fetchTasks();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create task');
    }
  };

  const handleUpdateTaskStatus = async (taskId, newStatus) => {
    try {
      await taskService.updateTask(taskId, { status: newStatus });
      toast.success('Task status updated!');
      fetchTasks();
    } catch (error) {
      toast.error('Failed to update task status');
    }
  };

  const handleDeleteTask = async (taskId) => {
    toast.warning(
      ({ closeToast }) => (
        <div>
          <p>Are you sure you want to delete this task?</p>
          <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
            <button
              onClick={async () => {
                closeToast();
                try {
                  await taskService.deleteTask(taskId);
                  toast.success('Task deleted successfully!');
                  fetchTasks();
                } catch (error) {
                  toast.error('Failed to delete task');
                }
              }}
              style={{
                padding: '5px 15px',
                background: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Delete
            </button>
            <button
              onClick={closeToast}
              style={{
                padding: '5px 15px',
                background: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { autoClose: false, closeButton: false }
    );
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={18} />;
      case 'in-progress':
        return <Clock size={18} />;
      case 'todo':
        return <Circle size={18} />;
      default:
        return <Circle size={18} />;
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="tasks-loading">Loading tasks...</div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="tasks-container">
        <div className="tasks-header">
          <h1>My Tasks</h1>
          {user?.role === 'admin' && (
            <button className="btn-primary" onClick={() => setShowCreateForm(!showCreateForm)}>
              <Plus size={18} />
              Create Task
            </button>
          )}
        </div>

        {user?.role === 'member' && (
          <div className="member-notice">
            <p>You can update task status below. Contact an admin to create new tasks.</p>
          </div>
        )}

        {showCreateForm && user?.role === 'admin' && (
          <div className="create-form">
            <h2>Create New Task</h2>
            <form onSubmit={handleCreateTask}>
              <div className="form-group">
                <label>Project</label>
                <select
                  value={formData.project}
                  onChange={(e) => {
                    setFormData({ ...formData, project: e.target.value });
                  }}
                  required
                >
                  <option value="">Select a project</option>
                  {projects.map((project) => (
                    <option key={project._id} value={project._id}>
                      {project.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Assign To (Employee ID)</label>
                <input
                  type="number"
                  value={formData.assignedToId}
                  onChange={(e) => setFormData({ ...formData, assignedToId: e.target.value ? parseInt(e.target.value) : '' })}
                  placeholder="Enter employee ID (e.g., 5, 100, 600)"
                />
              </div>
              <div className="form-group">
                <label>Task Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter task title"
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter task description"
                  rows="3"
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Due Date</label>
                  <input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  />
                </div>
              </div>
              <div className="form-actions">
                <button type="submit" className="btn-primary">Create</button>
                <button type="button" className="btn-secondary" onClick={() => setShowCreateForm(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="tasks-list">
          {tasks.length === 0 ? (
            <p className="empty-state">No tasks available.</p>
          ) : (
            tasks.map((task) => {
              const isAssignedToMe = task.assignedToId === user?.employeeId;
              const canUpdateStatus = isAssignedToMe || user?.role === 'admin';

              return (
                <div key={task._id} className="task-card">
                  <div className="task-card-header">
                    <div className="task-title-section">
                      {getStatusIcon(task.status)}
                      <div>
                        <h3>{task.title}</h3>
                        <p className="task-project">{task.project?.name}</p>
                      </div>
                    </div>
                    <span className={`priority-badge priority-${task.priority}`}>
                      {task.priority}
                    </span>
                  </div>

                  <p className="task-description">{task.description}</p>

                  <div className="task-meta">
                    {task.assignedToId && (
                      <div className="meta-item">
                        <span className={`assigned-to ${isAssignedToMe ? 'assigned-to-me' : ''}`}>
                          Assigned to: Employee #{task.assignedToId}
                          {isAssignedToMe && ' (You)'}
                        </span>
                      </div>
                    )}
                    {task.dueDate && (
                      <div className="meta-item">
                        <span className="due-date">
                          Due: {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>

                  {canUpdateStatus && (
                    <div className="task-actions">
                      <select
                        value={task.status}
                        onChange={(e) => handleUpdateTaskStatus(task._id, e.target.value)}
                        className="status-select"
                      >
                        <option value="todo">To Do</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                      {user?.role === 'admin' && (
                        <button
                          className="btn-icon btn-danger"
                          onClick={() => handleDeleteTask(task._id)}
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  )}

                  {user?.role === 'admin' && (
                    <div className="task-status-info">
                      <span className={`status-badge status-${task.status}`}>
                        Status: {task.status}
                      </span>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};
