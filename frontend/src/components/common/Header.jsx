import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../hooks/useAuth';
import { LogOut, Settings, User, ChevronDown, Clipboard, LayoutDashboard, ListTodo, FolderOpen } from 'lucide-react';
import './Header.css';

export const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully!');
    navigate('/login');
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <Link to="/dashboard" className="app-logo">
            <Clipboard className="app-icon" size={28} />
            <h1 className="app-title">Project Manager</h1>
          </Link>
        </div>

        <nav className="header-nav">
          <Link to="/dashboard" className="nav-link">
            <LayoutDashboard size={18} />
            Dashboard
          </Link>
          <Link to="/projects" className="nav-link">
            <FolderOpen size={18} />
            Projects
          </Link>
          <Link to="/tasks" className="nav-link">
            <ListTodo size={18} />
            Tasks
          </Link>
        </nav>

        <div className="header-right">
          <div className="profile-section">
            <button
              className="profile-button"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <div className="profile-avatar">{getInitials(user?.name || 'U')}</div>
              <div className="profile-info">
                <p className="profile-name">{user?.name}</p>
                <p className="profile-role">{user?.role}</p>
              </div>
              <ChevronDown size={16} className="dropdown-icon" />
            </button>

            {showDropdown && (
              <div className="dropdown-menu">
                <div className="dropdown-header">
                  <p className="dropdown-name">{user?.name}</p>
                  <p className="dropdown-email">{user?.email}</p>
                </div>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item profile-item">
                  <User size={16} />
                  <span>Profile</span>
                </button>
                <button className="dropdown-item settings-item">
                  <Settings size={16} />
                  <span>Settings</span>
                </button>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item logout-item" onClick={handleLogout}>
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
