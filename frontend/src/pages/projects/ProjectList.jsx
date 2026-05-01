import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../../hooks/useAuth';
import { Header } from '../../components/common/Header';
import { projectService } from '../../services/projectService';
import { Plus, Edit2, Trash2, Users } from 'lucide-react';
import './Projects.css';

export const ProjectList = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '', endDate: '' });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      if (user?.role === 'admin') {
        // Admin sees only their projects
        const res = await projectService.getMyProjects();
        setProjects(res.projects || []);
      } else {
        // Members see all projects
        const res = await projectService.getAllProjects();
        setProjects(res.projects || []);
      }
    } catch (error) {
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      await projectService.createProject(formData);
      toast.success('Project created successfully!');
      setFormData({ name: '', description: '', endDate: '' });
      setShowCreateForm(false);
      fetchProjects();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create project');
    }
  };

  const handleDeleteProject = async (projectId) => {
    toast.warning(
      ({ closeToast }) => (
        <div>
          <p>Are you sure you want to delete this project?</p>
          <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
            <button
              onClick={async () => {
                closeToast();
                try {
                  await projectService.deleteProject(projectId);
                  toast.success('Project deleted successfully!');
                  fetchProjects();
                } catch (error) {
                  toast.error('Failed to delete project');
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

  if (loading) {
    return (
      <>
        <Header />
        <div className="projects-loading">Loading projects...</div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="projects-container">
        <div className="projects-header">
          <h1>Projects</h1>
          {user?.role === 'admin' && (
            <button className="btn-primary" onClick={() => setShowCreateForm(!showCreateForm)}>
              <Plus size={18} />
              Create Project
            </button>
          )}
        </div>

        {showCreateForm && user?.role === 'admin' && (
          <div className="create-form">
            <h2>Create New Project</h2>
            <form onSubmit={handleCreateProject}>
              <div className="form-group">
                <label>Project Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter project name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter project description"
                  rows="3"
                />
              </div>
              <div className="form-group">
                <label>End Date</label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                />
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

        <div className="projects-grid">
          {projects.length === 0 ? (
            <p className="empty-state">No projects yet.</p>
          ) : (
            projects.map((project) => (
              <div key={project._id} className="project-card">
                <div className="project-card-header">
                  <h3>{project.name}</h3>
                  <span className={`status-badge status-${project.status}`}>{project.status}</span>
                </div>
                <p className="project-description">{project.description}</p>
                <div className="project-info">
                  <div className="info-item">
                    <Users size={16} />
                    <span>{project.members?.length || 0} members</span>
                  </div>
                  {project.endDate && (
                    <div className="info-item">
                      <span>Due: {new Date(project.endDate).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
                <div className="project-actions">
                  {user?.role === 'admin' && (
                    <>
                      <button className="btn-icon" title="Edit">
                        <Edit2 size={16} />
                      </button>
                      <button
                        className="btn-icon btn-danger"
                        onClick={() => handleDeleteProject(project._id)}
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};
